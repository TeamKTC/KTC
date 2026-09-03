import { useTranslation } from "react-i18next";

export const FeaturesBanner = () => {
  const { t } = useTranslation();
  return (
    <div 
      className="d-flex justify-content-around align-items-center rounded-3 p-4 my-3" 
      style={{ backgroundColor: '#e8eef5' }}
    >
      <button className="btn border-0 fw-medium">{t("main.bottomBar.fastDelivery")}</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">{t("main.bottomBar.officialWarranty")}</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">{t("main.bottomBar.easyReturn")}</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">{t("main.bottomBar.convenientPayment")}</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">{t("main.bottomBar.support247")}</button>
    </div>
  );
};

export default FeaturesBanner;