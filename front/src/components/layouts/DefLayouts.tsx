import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../lowbar/Footer";

const DefLayouts = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Outlet />
            </div>

            <Footer />
        </>
    );
}

export default DefLayouts;