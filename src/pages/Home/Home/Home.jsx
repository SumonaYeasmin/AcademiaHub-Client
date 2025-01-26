import Banner from "../Banner/Banner";
import CurrentlyPopular from "../CurrentlyPopular/CurrentlyPopular";
import Features from "../Features/Features";
import InspiresTeacher from "../InspiresTeacher/InspiresTeacher";
import PartnersSection from "../PartnersSection/PartnersSection";
import Statistics from "../Statistics/Statistics";


const Home = () => {
    return (
        <div className="">
           <Banner></Banner>
           <PartnersSection></PartnersSection>
           <Features></Features>
           <CurrentlyPopular></CurrentlyPopular>
           <Statistics></Statistics>
           <InspiresTeacher></InspiresTeacher>
        </div>
    );
};

export default Home;