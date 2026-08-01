
export const FeaturesBanner = () => {
  return (
    <div 
      className="d-flex justify-content-around align-items-center rounded-3 p-4 my-3" 
      style={{ backgroundColor: '#e8eef5' }}
    >
      <button className="btn border-0 fw-medium">Швидка доставка</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">Офіційна гарантія</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">14 днів на повернення</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">Зручна оплата</button>
      <div style={{ width: '1px', height: '40px', backgroundColor: '#80a8f8' }}></div>

      <button className="btn border-0 fw-medium">Підтримка 24/7</button>
    </div>
  );
};

export default FeaturesBanner;