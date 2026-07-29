import DefLayouts from "./components/layouts/DefLayouts";
import { useAppSelector } from "./hooks/redux";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
const DefaultRoutes = () => {
   // const {isAuth, user} = useAppSelector((state) => state.auth);

    return (
        <Routes>
             <Route path="/" element={<DefLayouts />}>
                <Route index element={<HomePage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );

};

export default DefaultRoutes;