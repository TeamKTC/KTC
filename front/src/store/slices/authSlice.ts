import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

interface JwtPayload {
    exp: number;
}

const getValidToken = (): string | null => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            return null;
        }

        return token;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
};

const validToken = getValidToken();

const initialState: AuthState = {
    token: validToken,
    isAuthenticated: !!validToken,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("token", action.payload);
        },

        logout(state) {
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;