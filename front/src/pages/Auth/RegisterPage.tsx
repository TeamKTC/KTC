import { useState } from "react";
import { useRegisterMutation } from "../../store/services/authApi";

export default function RegisterPage() {

    const [register] = useRegisterMutation();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {

            const result = await register({
                phoneNumber,
                firstName,
                lastName,
                email,
                password,
            }).unwrap();

            alert(result.message);

        } catch (err) {
            console.log(err);
            alert("Помилка реєстрації");
        }
    };

    return (
        <div>
            <input
                placeholder="Phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}