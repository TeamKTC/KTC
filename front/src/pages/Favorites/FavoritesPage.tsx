import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import { Link } from "react-router-dom";
import { useGetFavoritesQuery } from "../../store/services/favoriteApi";
import FavoriteCard from "../../components/favorite/FavoriteCard";
const FavoritesPage = () => {
    const { data, isLoading, error } = useGetFavoritesQuery();

    const favorites = data?.payload ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching favorites:", error);
        return <div>Something went wrong.</div>;
    }

    return (
        <div className="profile-page">
            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <span>Обране</span>
            </div>

            <h1 className="profile-title">Обране</h1>

            <div className="profile-content">
                <Sidebar />

                <div className="favorites-list">
                    {favorites.length === 0 ? (
                        <p>Обране порожнє.</p>
                ) : (
                    favorites.map((product) => (
                            <FavoriteCard
                                key={product.id}
                                product={product}
                            />
                            ))
                        )}
                </div>
            </div>

            <FooterBenefits />
        </div>
    );
};

export default FavoritesPage;