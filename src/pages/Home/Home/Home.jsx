import Banner from "../Banner/Banner";
import CurrentlyPopular from "../CurrentlyPopular/CurrentlyPopular";
import Features from "../Features/Features";
import PartnersSection from "../PartnersSection/PartnersSection";


const Home = () => {
    return (
        <div className="">
           <Banner></Banner>
           <PartnersSection></PartnersSection>
           <Features></Features>
           <CurrentlyPopular></CurrentlyPopular>
        </div>
    );
};

export default Home;