

import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import CurrentlyPopular from "../CurrentlyPopular/CurrentlyPopular";
import Features from "../Features/Features";
import Feedback from "../Feedback/Feedback";
import InspiresTeacher from "../InspiresTeacher/InspiresTeacher";
import PartnersSection from "../PartnersSection/PartnersSection";
import Statistics from "../Statistics/Statistics";
import SuccessStories from "../SuccessStories/SuccessStories";

const Home = () => {

  return (
    <div>
      <div className="container mx-auto">
        
          <Banner></Banner>
       
    
          <PartnersSection></PartnersSection>
      
    
          <CurrentlyPopular></CurrentlyPopular>
       
   
          <Statistics></Statistics>
       
   
          <Feedback></Feedback>
          <SuccessStories></SuccessStories>
      
      </div>
      
        <InspiresTeacher></InspiresTeacher>
     
      
        <Features></Features>
     
      
        <Footer></Footer>
  
    </div>
  );
};

export default Home;
