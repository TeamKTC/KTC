

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from './store/slices/authSlice'
import DefaultRoutes from "./DefaultRoutes";
import { ThemeProvider } from './context/ThemeContext';
function App() {
    const dispatch = useDispatch();

     useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch]);

    return (
        <ThemeProvider>

            <DefaultRoutes />
        </ThemeProvider>
    );
}

export default App;