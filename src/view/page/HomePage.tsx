import Footer from 'view/components/Footer';
import Carousel from './LandingPage/Carousel';
import Featured from './LandingPage/Featured';
import Recommend from './LandingPage/Recommend';
import Services from './LandingPage/Services';

const HomePage = () => {
  return (
    <div>
 
      <Carousel />
      <Services />
      <Recommend />
      <Featured />

      <Footer />
    </div>
  );
};

export default HomePage;
