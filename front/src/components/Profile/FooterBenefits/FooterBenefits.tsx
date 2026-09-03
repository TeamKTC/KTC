import { useTranslation } from "react-i18next";
import "./FooterBenefits.css";
import {
    Truck,
    CreditCard,
    Shield,
    RotateCcw
} from "lucide-react";

const FooterBenefits = () => {
    const { t } = useTranslation();
    return (
        <section className="footer-benefits">

            <div className="benefit">
                <Truck size={24} />
                <div className="benefit-text">
                    <h4>{t("profile.footerBenefits.deliveryTitle")}</h4>
                    <p>{t("profile.footerBenefits.deliveryDesc1")}</p>
                    <span>{t("profile.footerBenefits.deliveryDesc2")}</span>
                </div>
            </div>

            <div className="benefit">
                <CreditCard size={24} />
                <div className="benefit-text">
                    <h4>{t("profile.footerBenefits.paymentTitle")}</h4>
                    <p>{t("profile.footerBenefits.paymentDesc1")}</p>
                    <span>{t("profile.footerBenefits.paymentDesc2")}</span>
                </div>
            </div>

            <div className="benefit">
                <Shield size={24} />
                <div className="benefit-text">
                    <h4>{t("profile.footerBenefits.warrantyTitle")}</h4>
                    <p>{t("profile.footerBenefits.warrantyDesc1")}</p>
                    <span>{t("profile.footerBenefits.warrantyDesc2")}</span>
                </div>
            </div>

            <div className="benefit">
                <RotateCcw size={24} />
                <div className="benefit-text">
                    <h4>{t("profile.footerBenefits.returnTitle")}</h4>
                    <p>{t("profile.footerBenefits.returnDesc1")}</p>
                    <span>{t("profile.footerBenefits.returnDesc2")}</span>
                </div>
            </div>

        </section>
    );
};

export default FooterBenefits;