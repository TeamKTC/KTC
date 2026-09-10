import DefLayouts from "./components/layouts/DefLayouts";
import { useAppSelector } from "./hooks/redux";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Navigate } from "react-router-dom";
import CartPage from "./pages/Cart/CartPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import DeliveryAndPaymentPage from "./pages/Delivery&Payment/Delivery&Payment";
import WarrantyPage from "./pages/warranty/WarrantyPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import CatalogePage from "./pages/CatalogePage/CatalogePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import OrderCheckoutPage from "./pages/OrderCheckout/OrderCheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccess/OrderSuccessPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import StoresPage from "./pages/Store/StoresPage";
import SupportPage from "./pages/Support/SupportPage";
const DefaultRoutes = () => {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
        
    );
    

    return (
        <Routes>
            <Route path="/" element={<DefLayouts />}>
                <Route index element={<HomePage />} />
                <Route path="/details/:id" element={<DetailsPage />} />
                <Route
                    path="cataloge"
                    element={<CatalogePage />}
                />
                

                <Route
                    path="profile"
                    element={
                        isAuthenticated
                            ? <ProfilePage />
                            : <Navigate to="/" replace />
                    }
                />

                <Route
                    path="cart"
                    element={
                        isAuthenticated
                            ? <CartPage />
                            : <Navigate to="/" replace />
                    }

          
                />

                <Route
                    path="cart/checkout"
                    element={
                        isAuthenticated
                            ? <OrderCheckoutPage />
                            : <Navigate to="/" replace />
                }
/>
            
                <Route
                    path="favorites"
                    element={
                        isAuthenticated
                            ? <FavoritesPage />
                            : <Navigate to="/" replace />
                    }
                />
                <Route
                    path="settings"
                    element={
                        isAuthenticated
                            ? <SettingsPage />
                            : <Navigate to="/" replace />
                    }
                />

                <Route
                    path="delivery"
                    element={<DeliveryAndPaymentPage />}
                />
                <Route
                    path="warranty"
                    element={<WarrantyPage />}
                />
                <Route
                    path = "about"
                    element={<AboutUsPage />}
                />

                <Route
                    path="order-success"
                    element={<OrderSuccessPage />}
                />
                <Route
                    path="orders"
                    element={
                        isAuthenticated
                            ? <OrdersPage />
                            : <Navigate to="/" replace />
                    }
                />

                <Route
                    path="store"
                    element={
                        <StoresPage />
                    }
                />
                <Route
                    path="support"
                    element={
                        <SupportPage />
                    }
                />
            </Route>
        </Routes>
    );
};

export default DefaultRoutes;