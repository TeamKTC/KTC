import DefLayouts from "./components/layouts/DefLayouts";
import { useAppSelector } from "./hooks/redux";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Navigate } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";


const DefaultRoutes = () => {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    return (
        <Routes>
            <Route path="/" element={<DefLayouts />}>
                <Route index element={<HomePage />} />
                <Route path="/details/:id" element={<DetailsPage />} />

                <Route path="profile"
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
                <Route path="favorites"
                    element={
                        isAuthenticated
                            ? <FavoritesPage />
                            : <Navigate to="/" replace />
                    }
                />
            </Route>
        </Routes>
    );
};

export default DefaultRoutes;