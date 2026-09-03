import { useState } from "react";
import "./Security.css";

import TwoFactorModal from "../../../pages/Auth/TwoFactorModal/TwoFactorModal";
import ChangePasswordModal from "../../../pages/Auth/ChangePasswordModal/ChangePasswordModal";

import {
    useEnableTwoFactorMutation,
    useConfirmEnableTwoFactorMutation,
    useDisableTwoFactorMutation,
    useConfirmDisableTwoFactorMutation,
    useChangePasswordMutation,
} from "../../../store/services/authApi";

import { useGetMeQuery } from "../../../store/services/userApi";
import { useTranslation } from "react-i18next";

const Security = () => {
    const {t} = useTranslation();
    const {
        data,
        isLoading,
        refetch,
    } = useGetMeQuery();

    const user = data?.payload;

    const [showTwoFactor, setShowTwoFactor] =
        useState(false);

    const [showChangePassword, setShowChangePassword] =
        useState(false);

    const [enableTwoFactor] =
        useEnableTwoFactorMutation();

    const [confirmEnableTwoFactor] =
        useConfirmEnableTwoFactorMutation();

    const [disableTwoFactor] =
        useDisableTwoFactorMutation();

    const [confirmDisableTwoFactor] =
        useConfirmDisableTwoFactorMutation();

    const [changePassword] =
        useChangePasswordMutation();

    const handleTwoFactor = async () => {
        try {
            if (user?.twoFactorEnabled) {
                await disableTwoFactor().unwrap();
            } else {
                await enableTwoFactor().unwrap();
            }

            setShowTwoFactor(true);
        } catch {
            alert("Не вдалося відправити код");
        }
    };

    const handleVerifyTwoFactor = async (
        code: string
    ) => {
        try {
            if (user?.twoFactorEnabled) {
                const result =
                    await confirmDisableTwoFactor({
                        code,
                    }).unwrap();

                alert(result.message);
            } else {
                const result =
                    await confirmEnableTwoFactor({
                        code,
                    }).unwrap();

                alert(result.message);
            }

            await refetch();

            setShowTwoFactor(false);
        } catch {
            alert(
                "Неправильний або прострочений код"
            );

            throw new Error(
                "Invalid two-factor code"
            );
        }
    };

    const handleChangePassword = async (
        currentPassword: string,
        newPassword: string
    ) => {
        try {
            const result =
                await changePassword({
                    currentPassword,
                    newPassword,
                }).unwrap();

            alert(result.message);

            setShowChangePassword(false);
        } catch (error: any) {
            alert(
                error?.data?.message ||
                "Не вдалося змінити пароль"
            );

            throw error;
        }
    };

    if (isLoading) {
        return (
            <div className="security-card">
                <h2>Безпека та паролі</h2>

                <p>Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="security-card">

            <h2>{t("profile.securityProfile.title")}</h2>

            <p className="security-description">
                {t("profile.securityProfile.subtitle")}
            </p>

            <button
                className="change-password"
                onClick={() =>
                    setShowChangePassword(true)
                }
            >
                {t("profile.securityProfile.changePassword")}
            </button>

            <div
                className="two-factor"
                onClick={handleTwoFactor}
            >
                <div>
                    <h4>
                        {t("profile.securityProfile.twoFactorTitle")}
                    </h4>

                    <p>
                        {user?.twoFactorEnabled
                            ? t("profile.securityProfile.twoFactorActive")
                            : t("profile.securityProfile.twoFactorNotActive")}
                    </p>
                </div>
            </div>

            {showTwoFactor && (
                <TwoFactorModal
                    onVerify={
                        handleVerifyTwoFactor
                    }
                    onClose={() =>
                        setShowTwoFactor(false)
                    }
                />
            )}

            {showChangePassword && (
                <ChangePasswordModal
                    onChangePassword={
                        handleChangePassword
                    }
                    onClose={() =>
                        setShowChangePassword(false)
                    }
                />
            )}

        </div>
    );
};

export default Security;