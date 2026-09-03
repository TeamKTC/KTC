import "./ProfilePage.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import PersonalInfo from "../../components/Profile/PersonalInfo/PersonalInfo";
import Security from "../../components/Profile/Security/Security";
import BonusHistory from "../../components/Profile/BonusHistory/BonusHistory";
import BonusCard from "../../components/Profile/BonusCard/BonusCard";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
    const {t} = useTranslation();
    return (
        <div className="profile-page">

          <div className="breadcrumbs">
                <Link to="/">{t("forAll.main")}</Link>
                <span> &gt; </span>
                <span>{t("forAll.personalCabinet")}</span>
            </div>

            <h1 className="profile-title">{t("forAll.personalCabinet")}</h1>

            <div className="profile-content">

                <Sidebar />

                <div className="center-column">
                    <PersonalInfo />
                    <BonusHistory />
                </div>

                <div className="right-column">
                    <Security />
                    <BonusCard />
                </div>

            </div>

            <FooterBenefits />

        </div>
    );
};

export default ProfilePage;