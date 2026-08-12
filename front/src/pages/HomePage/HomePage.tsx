import Brand from "../../components/brand/Brand";
import FeatureBanner from "../../components/featureBanner/FeatureBanner";
import HitOfSells from "../../components/hitOfSells/HitOfSells";
import HeroSection from "../../components/homePageFirstComponent/HeroSection";
import MiddleSection from "../../components/middleSectionOnHomePage/middleSection";
import PickedForYou from "../../components/pickedForYou/PickedForYou";
import Recommended from "../../components/recommended/Recommended";


const HomePage = () => {
    return (
        <>
            <HeroSection/>
            <Recommended/>
            <MiddleSection/>
            <HitOfSells/>
            <Brand/>
            <PickedForYou/>
            <FeatureBanner/>
        </>
    );
}

export default HomePage;