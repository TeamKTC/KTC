import React from "react";
import "./SupportPage.css";
import { Link } from "react-router-dom";

import SupportHero from "../../components/SupportPage/SupportHero/SupportHero";
import FAQSection from "../../components/SupportPage/FAQSection/FAQSection";
import ContactSection from "../../components/SupportPage/ContactSection/ContactSection";
import SupportForm from "../../components/SupportPage/SupportForm/SupportForm";
import SupportBenefits from "../../components/SupportPage/SupportBenefits/SupportBenefits";

const SupportPage = () => {
    return (
        <div className="profile-page">
            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Підтримка</span>
            </div>

              <h1 className="profile-title">Підтримка</h1>


            <SupportHero />

            <FAQSection />

            <div className="support-contact-layout">
                <ContactSection />
                <SupportForm />
            </div>

            <SupportBenefits />
        </div>
    );
};

export default SupportPage;