import "./PersonalInfo.css";
import { useEffect, useState } from "react";
import {
    useGetMeQuery,
    useUpdateProfileMutation,
    useConfirmEmailChangeMutation,
} from "../../../store/services/userApi";
import EmailConfirmModal from "../../../pages/Auth/EmailConfirmModal/EmailConfirmModal";
import { useTranslation } from "react-i18next";

const PersonalInfo = () => {
    const {t} = useTranslation();
    const { data, isLoading, error } = useGetMeQuery();

    const [updateProfile, { isLoading: isSaving }] =
        useUpdateProfileMutation();

    const [confirmEmailChange] =
        useConfirmEmailChangeMutation();

    const user = data?.payload;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [showEmailModal, setShowEmailModal] = useState(false);
    const [pendingEmail, setPendingEmail] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setBirthDate(user.birthDate);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="personal-info">
                <h2>{t("forAll.personalData")}</h2>
                <p>{t("forAll.loading")}</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="personal-info">
                <h2>{t("forAll.personalData")}</h2>
                <p>{t("forAll.failedToLoad")}</p>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            const oldEmail = user.email.trim().toLowerCase();
            const newEmail = email.trim().toLowerCase();

            const result = await updateProfile({
                firstName,
                lastName,
                email,
                phoneNumber,
                birthDate,
            }).unwrap();

            if (oldEmail !== newEmail) {
                setPendingEmail(email);
                setShowEmailModal(true);
                return;
            }

            alert(result.message);
        } catch (error: any) {
            alert(
                error?.data?.message ||
                "Не вдалося зберегти зміни"
            );
        }
    };

    const handleConfirmEmail = async (code: string) => {
        try {
            const result = await confirmEmailChange({
                code,
            }).unwrap();

            alert(result.message);

            setShowEmailModal(false);
        } catch (error: any) {
            alert(
                error?.data?.message ||
                "Неправильний код підтвердження"
            );
        }
    };

    const handleCancel = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setBirthDate(user.birthDate);
    };

    return (
        <div className="personal-info">
            <h2>{t("forAll.personalData")}</h2>

            <div className="inputs">
                <input
                    type="text"
                    placeholder="Ім'я"
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Прізвище"
                    value={lastName}
                    onChange={(e) =>
                        setLastName(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={(e) =>
                        setPhoneNumber(e.target.value)
                    }
                />

                <input
                    className="full"
                    type="date"
                    value={birthDate}
                    onChange={(e) =>
                        setBirthDate(e.target.value)
                    }
                />
            </div>

            <div className="buttons">
                <button
                    className="save"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving
                        ? "Збереження..."
                        : `${t("forAll.saveChanges")}`}
                </button>

                <button
                    className="cancel"
                    onClick={handleCancel}
                    disabled={isSaving}
                >
                    {t("forAll.cancel")}
                </button>
            </div>

            {showEmailModal && (
                <EmailConfirmModal
                    email={pendingEmail}
                    onVerify={handleConfirmEmail}
                    onClose={() =>
                        setShowEmailModal(false)
                    }
                />
            )}
        </div>
    );
};

export default PersonalInfo;