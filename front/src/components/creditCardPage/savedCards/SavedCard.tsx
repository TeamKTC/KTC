import { useState, useMemo } from 'react';
import { Trash2, PlusCircle, CreditCard } from 'lucide-react';
import './SavedCards.css';
import { 
  useDeleteCreditCardMutation, 
  useGetCreditCardsByUserIdQuery, 
  useCreateCreditCardMutation 
} from '../../../store/services/creditCardApi';
import { jwtDecode } from 'jwt-decode';
import type { CreateCreditCardDto } from '../../../types/types';
import VisaLogo from './logos/VisaLogo';
import MastercardLogo from './logos/MastercardLogo';

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  sub?: string;
}

const SavedCards = () => {
  // Отримання userId з токена
  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return (
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
        decoded.sub ||
        null
      );
    } catch (error) {
      console.error("Помилка декодування токена:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();
  
  // RTK Query hooks
  const { data: cardsResponse } = useGetCreditCardsByUserIdQuery(userId ?? '', { skip: !userId });
  const [deleteCreditCard] = useDeleteCreditCardMutation();
  const [createCreditCard, { isLoading: isSubmitting }] = useCreateCreditCardMutation();

  const notSortedСards = cardsResponse?.payload ?? [];

  const cards = useMemo(() => {
    return [...notSortedСards].sort((a, b) => {
      if (a.isMain === b.isMain) return 0;
      return a.isMain ? -1 : 1;
    });
  }, [notSortedСards]);

  // Стейт модального вікна та форми
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymetSystem, setPaymetSystem] = useState<string>("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [cVV, setCVV] = useState("");
  const [termin, setTermin] = useState("");
  const [name, setName] = useState("");
  const [isMain, setIsMain] = useState(false);

  // Хендлери відкриття/закриття модалки
  const handleOpenModal = () => {
    if (!userId) {
      alert("Будь ласка, авторизуйтесь для додавання картки!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymetSystem("Visa");
    setCardNumber("");
    setNameAndSurname("");
    setCVV("");
    setTermin("");
    setName("");
    setIsMain(false);
  };

  // Хелпери форматування полів
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);

    if (value.startsWith("4")) setPaymetSystem("Visa");
    if (value.startsWith("5")) setPaymetSystem("Mastercard");
  };

  // Форматування терміну дії (MM/YY) з обмеженням місяця до 12
const handleTerminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 4);

  if (value.length >= 2) {
    let month = parseInt(value.slice(0, 2), 10);
    if (month > 12) month = 12;
    if (month === 0) month = 1;

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const year = value.slice(2);

    value = value.length > 2 ? `${formattedMonth}/${year}` : formattedMonth;
  }

  setTermin(value);
};

  const formatCardNumber = (num: string) => {
    if (!num) return '****';
    const cleanNum = num.replace(/\s+/g, '');
    const last4 = cleanNum.slice(-4);
    return `**** ${last4}`;
  };

  const handleDeleteButton = (id: string) => {
    deleteCreditCard(id);
  };

  // Сабміт форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("Сесія закінчилася. Авторизуйтесь знову!");
      return;
    }

    const dto: CreateCreditCardDto = {
      paymentSystem: paymetSystem,
      cardNumber,
      nameAndSurname,
      cVV,
      termin,
      name,
      isMain,
      userId,
    };

    try {
      await createCreditCard(dto).unwrap();
      handleCloseModal();
    } catch (error) {
      console.error("Помилка при додаванні картки:", error);
      alert("Не вдалося додати карту.");
    }
  };

  return (
    <div className="container">
      {/* Заголовок */}
      <div className="header">
        <h2 className="title">Збережені картки</h2>
        <p className="subtitle">
          Тут зберігаються ваші платіжні картки для швидкої та зручної оплати
        </p>
      </div>

      {/* Список карток з БД */}
      <div className="cards-list">
        {cards.map((card) => (
          <div key={card.id} className="card-item">
            <div className="card-left">
              {/* Логотип платіжної системи */}
              <div className="logo-wrapper">
                {(card.paymentSystem)?.toLowerCase().includes('visa') ? (
                    <VisaLogo/>
                ) : (
                    <MastercardLogo/>
                )}
                </div>

              {/* Основні дані картки */}
              <div className="card-details">
                <div>
                  <div className="card-number">
                    {card.paymentSystem || 'Card'} {formatCardNumber(card.cardNumber)}
                  </div>
                  <div className="card-holder">{card.nameAndSurname}</div>
                </div>

                <div>
                  <div className="label">Термін дії</div>
                  <div className="expiry-date">{card.termin}</div>
                </div>
              </div>
            </div>

            {/* Права частина */}
            <div className="card-right">
              {card.isMain && <span className="main-badge">Основна</span>}

              <button
                onClick={() => handleDeleteButton(card.id)}
                className="delete-btn"
                aria-label="Видалити картку"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка додавання картки */}
      <button onClick={handleOpenModal} className="add-btn">
        <PlusCircle size={20} />
        <span>Додати нову карту</span>
      </button>

      {/* Bootstrap Модальне вікно */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded-4 p-3 border-0 shadow-lg" style={{ backgroundColor: "#EEF2F6" }}>
              
              {/* Хедер */}
              <div className="modal-header border-0 pb-0 position-relative">
                <div>
                  <h4 className="modal-title fw-bold text-dark mb-1">
                    Додати нову карту
                  </h4>
                  <p className="text-muted small mb-0">
                    Введіть дані платіжної карти для швидкої оплати
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  onClick={handleCloseModal}
                ></button>
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  
                  {/* Перемикач Visa / Mastercard */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Платіжна система
                    </label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={`btn flex-fill fw-bold ${
                          paymetSystem === "Visa"
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => setPaymetSystem("Visa")}
                      >
                        VISA
                      </button>
                      <button
                        type="button"
                        className={`btn flex-fill fw-bold ${
                          paymetSystem === "Mastercard"
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => setPaymetSystem("Mastercard")}
                      >
                        Mastercard
                      </button>
                    </div>
                  </div>

                  {/* Номер карти */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark mb-1">
                      Номер карти
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <CreditCard size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Ім'я та прізвище */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark mb-1">
                      Ім’я та прізвище
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Введіть ім’я та прізвище"
                      value={nameAndSurname}
                      onChange={(e) => setNameAndSurname(e.target.value)}
                      required
                    />
                  </div>

                  {/* CVV та Термін дії */}
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold text-dark mb-1">
                        CVV
                      </label>
                      <div className="input-group">
                        <input
                          type="password"
                          maxLength={3}
                          className="form-control border-end-0"
                          placeholder="123"
                          value={cVV}
                          onChange={(e) => setCVV(e.target.value.replace(/\D/g, ""))}
                          required
                        />
                        <span className="input-group-text bg-white border-start-0 text-muted">
                          <CreditCard size={18} />
                        </span>
                      </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label fw-semibold text-dark mb-1">
                            Термін дії (MM/YY)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={termin}
                            onChange={handleTerminChange}
                            required
                        />
                    </div>
                  </div>

                  {/* Назва карти */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark mb-1">
                      Назва карти (не обов’язково)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Наприклад: основна карта"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Чекбокс */}
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isMainCard"
                      checked={isMain}
                      onChange={(e) => setIsMain(e.target.checked)}
                    />
                    <label className="form-check-label fw-medium text-dark" htmlFor="isMainCard">
                      Зробити основною картою
                    </label>
                  </div>
                </div>

                {/* Кнопки дій */}
                <div className="modal-footer border-0 row g-2">
                  <div className="col-6 m-0 ps-0">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 py-2 rounded-3"
                      onClick={handleCloseModal}
                    >
                      Скасувати
                    </button>
                  </div>
                  <div className="col-6 m-0 pe-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
                    >
                      {isSubmitting ? "Збереження..." : "Зберегти карту"}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCards;