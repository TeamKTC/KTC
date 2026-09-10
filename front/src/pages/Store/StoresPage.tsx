import { Link } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import {
    Search,
    Phone,
    Mail,
    Globe,
    Check,
    Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./StoresPage.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const stores = [
    {
        id: 1,
        city: "Київ",
        name: "PixelRoom Київ",
        address: "вул. Яблунська, 52",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 25-36-845",
        lat: 50.4501,
        lng: 30.5234,
    },
    {
        id: 2,
        city: "Рівне",
        name: "PixelRoom Рівне",
        address: "вул. Соборна, 32 а",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 25-36-845",
        lat: 50.6199,
        lng: 26.2516,
    },
    {
        id: 3,
        city: "Рівне",
        name: "PixelRoom Рівне",
        address: "вул. В'ячеслава Чорновола, 17",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 25-36-845",
        lat: 50.625,
        lng: 26.255,
    },
    {
        id: 4,
        city: "Рівне",
        name: "PixelRoom Рівне",
        address: "вул. Лікаря, 15",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 25-36-845",
        lat: 50.615,
        lng: 26.26,
    },
    {
        id: 5,
        city: "Львів",
        name: "PixelRoom Львів",
        address: "вул. Андріївська, 12 а",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 85-76-753",
        lat: 49.8419,
        lng: 24.0315,
    },
    {
        id: 6,
        city: "Черкаси",
        name: "PixelRoom Черкаси",
        address: "вул. Л. Українки, 85",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (067) 47-65-852",
        lat: 49.4444,
        lng: 32.0598,
    },
    {
        id: 7,
        city: "Тернопіль",
        name: "PixelRoom Тернопіль",
        address: "вул. Соборна, 74",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 58-43-456",
        lat: 49.5535,
        lng: 25.5948,
    },
    {
        id: 8,
        city: "Хмельницький",
        name: "PixelRoom Хмельницький",
        address: "вул. Соборна, 74",
        schedule: "Пн-Нд: 10:00-20:00",
        phone: "+38 (097) 34-23-966",
        lat: 49.4230,
        lng: 26.9871,
    },
];

const cities = [
    "Київ",
    "Рівне",
    "Львів",
    "Тернопіль",
    "Черкаси",
    "Хмельницький",
];

type Store = (typeof stores)[number];

const MapController = ({
    selectedStore,
}: {
    selectedStore: Store | null;
}) => {
    const map = useMap();

    useEffect(() => {
        if (!selectedStore) return;

        map.flyTo(
            [selectedStore.lat, selectedStore.lng],
            14,
            {
                duration: 0.8,
            }
        );
    }, [map, selectedStore]);

    return null;
};

const StoresPage = () => {
    const [selectedCity, setSelectedCity] = useState("Рівне");
    const [search, setSearch] = useState("");
    const [selectedStore, setSelectedStore] =
        useState<Store | null>(stores[2]);

    const cityStores = stores.filter(
        (store) => store.city === selectedCity
    );

    const otherStores = stores.filter(
        (store) => store.city !== selectedCity
    );

    const searchedStores = otherStores.filter((store) => {
        const query = search.trim().toLowerCase();

        return (
            !query ||
            store.name.toLowerCase().includes(query) ||
            store.address.toLowerCase().includes(query) ||
            store.city.toLowerCase().includes(query)
        );
    });

    const center: [number, number] = selectedStore
        ? [selectedStore.lat, selectedStore.lng]
        : [50.6199, 26.2516];

    const selectCity = (city: string) => {
        setSelectedCity(city);
        setSearch("");

        const firstStore = stores.find(
            (store) => store.city === city
        );

        setSelectedStore(firstStore || null);
    };

    const openDirections = (store: Store | null) => {
        if (!store) return;

        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`,
            "_blank"
        );
    };

    return (
        <div className="profile-page">
            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Магазини</span>
            </div>

            <div className="stores-page">

                <div className="stores-title-row">
                    <h1>
                        Магазин PixelRoom, {selectedCity}
                        {selectedStore &&
                            `, ${selectedStore.address}`}
                    </h1>
                </div>

                <div className="stores-cities">
                    {cities.map((city) => (
                        <button
                            key={city}
                            type="button"
                            className={
                                selectedCity === city
                                    ? "stores-city active"
                                    : "stores-city"
                            }
                            onClick={() => selectCity(city)}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div className="stores-main">

                    <aside className="stores-sidebar">

                        <div className="stores-search">
                            <input
                                type="text"
                                placeholder="Пошук"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                            <Search size={15} />
                        </div>

                        <div className="stores-list">
                            {searchedStores.map((store) => (
                                <div
                                    key={store.id}
                                    className="store-card"
                                    onClick={() =>
                                        setSelectedStore(store)
                                    }
                                >
                                    <div className="store-card__top">
                                        <h3>{store.name}</h3>

                                        <span
                                            className={
                                                selectedStore?.id ===
                                                store.id
                                                    ? "store-radio active"
                                                    : "store-radio"
                                            }
                                        />
                                    </div>

                                    <p>{store.address}</p>
                                    <p>{store.schedule}</p>
                                    <p>{store.phone}</p>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openDirections(store);
                                        }}
                                    >
                                        Побудувати маршрут
                                    </button>
                                </div>
                            ))}

                            {searchedStores.length === 0 && (
                                <div className="stores-empty">
                                    Магазинів не знайдено
                                </div>
                            )}
                        </div>

                    </aside>

                    <div className="stores-right">

                        <div className="stores-map-wrapper">

                            <div className="map-store-cards">
                                {cityStores.map((store) => (
                                    <div
                                        key={store.id}
                                        className={
                                            selectedStore?.id === store.id
                                                ? "map-store-card selected"
                                                : "map-store-card"
                                        }
                                        onClick={() =>
                                            setSelectedStore(store)
                                        }
                                    >
                                        <div className="map-store-card__top">
                                            <strong>{store.name}</strong>

                                            <span
                                                className={
                                                    selectedStore?.id ===
                                                    store.id
                                                        ? "store-radio active"
                                                        : "store-radio"
                                                }
                                            />
                                        </div>

                                        <p>{store.address}</p>
                                        <p>{store.schedule}</p>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openDirections(store);
                                            }}
                                        >
                                            Побудувати маршрут
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="stores-map">
                                <MapContainer
                                    center={center}
                                    zoom={14}
                                    scrollWheelZoom={true}
                                >
                                    <TileLayer
                                        attribution="&copy; OpenStreetMap contributors"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <MapController
                                        selectedStore={selectedStore}
                                    />

                                    {cityStores.map((store) => (
                                        <Marker
                                            key={store.id}
                                            position={[
                                                store.lat,
                                                store.lng,
                                            ]}
                                            icon={defaultIcon}
                                            eventHandlers={{
                                                click: () =>
                                                    setSelectedStore(store),
                                            }}
                                        >
                                            <Popup>
                                                <strong>
                                                    {store.name}
                                                </strong>
                                                <br />
                                                {store.address}
                                                <br />
                                                {store.schedule}
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>

                        </div>

                        <div className="stores-info">

                            <div className="stores-info__block">
                                <h3>Контакти</h3>

                                <p>
                                    <Phone size={13} />
                                    +38 (067) 123-45-67
                                </p>

                                <p>
                                    <Mail size={13} />
                                    rvine@pixelroom.ua
                                </p>

                                <p>
                                    <Globe size={13} />
                                    pixelroom.ua
                                </p>
                            </div>

                            <div className="stores-info__block">
                                <h3>Послуги магазину</h3>

                                <p>
                                    <Check size={13} />
                                    Самовивіз
                                </p>

                                <p>
                                    <Check size={13} />
                                    Консультація експерта
                                </p>

                                <p>
                                    <Check size={13} />
                                    Оплата карткою
                                </p>

                                <p>
                                    <Check size={13} />
                                    Сервіс і гарантія
                                </p>

                                <p>
                                    <Check size={13} />
                                    Обмін та повернення
                                </p>
                            </div>

                            <div className="stores-info__block">
                                <h3>Як дістатися</h3>

                                <p className="direction-text">
                                    Знайти заклад та прокласти
                                    зручний маршрут
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        openDirections(selectedStore)
                                    }
                                >
                                    Побудувати маршрут
                                </button>
                            </div>

                            <div className="stores-info__block stores-rating">
                                <h3>
                                    <Star
                                        size={13}
                                        fill="currentColor"
                                    />
                                    4,9 / 5
                                </h3>

                                <div className="stars">
                                    ★★★★★
                                </div>

                                <span>(120 відгуків)</span>

                                <p className="review">
                                    Олексій М.
                                    <br />
                                    <b>
                                        «Чудовий сервіс, забрав за 5 хв.»
                                    </b>
                                </p>

                                <button type="button">
                                    Залишити відгук на Google
                                </button>
                            </div>

                        </div>

                        <div className="stores-benefits">

                            <div>
                                <h3>Сервіс і гарантія</h3>
                                <p>
                                    Офіційна гарантія та підтримка
                                    сервісного центру
                                </p>
                            </div>

                            <div>
                                <h3>Є в наявності</h3>
                                <p>
                                    Ви можете забронювати товар онлайн
                                    на 24 години без передоплати.
                                </p>
                            </div>

                            <div>
                                <h3>Консультація експерта</h3>
                                <p>
                                    Наші спеціалісти допоможуть
                                    підібрати найкраще рішення
                                </p>
                            </div>

                            <div>
                                <h3>Самовивіз</h3>
                                <p>
                                    Забирайте замовлення у зручному
                                    для вас магазині
                                </p>
                            </div>

                            <div>
                                <h3>Оплата карткою</h3>
                                <p>
                                    Готові до оплати карткою —
                                    в магазині
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default StoresPage;
