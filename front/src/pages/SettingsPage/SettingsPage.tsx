import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import "./SettingsPage.css";
import PersonalSettings from "../../components/SettingsPage/personalSettings/PersonalSettings";
import PrivacySettings from "../../components/SettingsPage/privacySettings/PrivacySettings";
import SecuritySettings from "../../components/SettingsPage/securitySettings/SecuritySettings";
import NotificationSettings from "../../components/SettingsPage/notificationSettings/NotificationSettings";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="profile-page">
                <h1 className="profile-title">{t("forAll.personalCabinet")}</h1>

                <div className="profile-content">

                    <Sidebar />

                    <div className="center-column">
                        <PersonalSettings/>
                        <PrivacySettings/>
                    </div>

                    <div className="right-column">
                        <SecuritySettings/>
                        <NotificationSettings/>
                    </div>

                </div>

                <FooterBenefits />

            </div>
        </>
    );
};

export default SettingsPage;