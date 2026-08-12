import { Link } from "react-router-dom";

import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import WarrantyHero from "../../components/Warranty/WarrantyHero/WarrantyHero";
import WarrantyFeatures from "../../components/Warranty/WarrantyFeatures/WarrantyFeatures";
import WarrantyProcess from "../../components/Warranty/WarrantyProcess/WarrantyProcess";
import WarrantyCoverage from "../../components/Warranty/WarrantyCoverage/WarrantyCoverage";
import WarrantyTerms from "../../components/Warranty/WarrantyTerms/WarrantyTerms";
import ServiceCenter from "../../components/Warranty/ServiceCentere/ServiceCenter";

const WarrantyPage = () => {
    return (
        <div className="profile-page">

            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Гарантія</span>
            </div>

            <h1 className="profile-title">Гарантія</h1>

            <WarrantyHero />

            <WarrantyFeatures />

            <WarrantyProcess />

            <WarrantyCoverage />

            <WarrantyTerms />

            <ServiceCenter />

            <FooterBenefits />

        </div>
    );
};

export default WarrantyPage;