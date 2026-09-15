import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import { useTranslation } from "react-i18next";
import  SavedCards  from "../../components/creditCardPage/savedCards/SavedCard";
import  SecurityInfo  from "../../components/creditCardPage/securityInfo/SecurityInfo";

const CreditCardPage = () =>{
    const {t} = useTranslation();
    return(
        <>
            <div className="profile-page">
                <h1 className="profile-title">{t("forAll.personalCabinet")}</h1>

                <div className="profile-content">

                    <Sidebar />

                    <div className="center-column">
                        <SavedCards/>
                    </div>

                    <div className="right-column">
                        <SecurityInfo/>
                    </div>

                </div>

                <FooterBenefits />

            </div>
        </>
    );
};

export default CreditCardPage;