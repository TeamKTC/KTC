import { Link } from "react-router-dom";

import AboutIntro from "../../components/AboutUs/AboutIntro/AboutIntro";
import AboutSidebar from "../../components/AboutUs/AboutSidebar/AboutSidebar";
import AboutBenefits from "../../components/AboutUs/AboutBenefits/AboutBenefits";
import AboutDescription from "../../components/AboutUs/AboutDescription/AboutDescription";
import AboutContacts from "../../components/AboutUs/AboutContacts/AboutContacts";

import "./AboutUsPage.css";

const AboutUsPage = () => {
    return (
        <div className="profile-page">
            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Про нас</span>
            </div>

            <h1 className="profile-title">Про нас</h1>

            <div className="about-page">
                <div className="about-page__top">
                    <AboutIntro />
                    <AboutSidebar />
                </div>

                <AboutBenefits />

                <div className="about-page__bottom">
                    <AboutDescription />
                    <AboutContacts />
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;