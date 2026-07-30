import "./ProfilePage.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import PersonalInfo from "../../components/Profile/PersonalInfo/PersonalInfo";
import Security from "../../components/Profile/Security/Security";
import BonusHistory from "../../components/Profile/BonusHistory/BonusHistory";
import BonusCard from "../../components/Profile/BonusCard/BonusCard";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";

const ProfilePage = () => {
    return (
        <div className="profile-page">

          <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Особистий кабінет</span>
            </div>

            <h1 className="profile-title">Особистий кабінет</h1>

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