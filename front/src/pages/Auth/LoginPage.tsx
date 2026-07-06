import { useState } from "react";
import { useLoginMutation } from "../../store/services/authApi";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../store/slices/authSlice";
import RegisterPage from "./RegisterPage";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [loginRequest] = useLoginMutation();

    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const result = await loginRequest({
                login: userLogin,
                password: password,
            }).unwrap();

            dispatch(login(result.payload));

            alert("Успішний логін");
        } catch (err) {
            alert("Неправильний логін або пароль");
                console.log(err);
                console.log("status:", err.status);
                console.log("data:", err.data);
        }
    };

    return (
        <div>
            <input
                placeholder="Login"
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button onClick={handleLogin}>
                Login
            </button>

            <RegisterPage />
        </div>
    );
}