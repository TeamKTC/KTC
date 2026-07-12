import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { notificationApi } from "./services/notificationApi";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";
import { cartItemApi } from "./services/cartItemApi";
import {cartApi} from "./services/cartApi";
export const store = configureStore({
    reducer: {
        auth: authReducer,

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [cartItemApi.reducerPath]: cartItemApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(notificationApi.middleware)
            .concat(cartItemApi.middleware)
            .concat(cartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;