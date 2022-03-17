import Carousel from './LandingPage/Carousel';
import Featured from './LandingPage/Featured';
import Recommend from './LandingPage/Recommend';
import Services from './LandingPage/Services';

const HomePage = () => {
  return (
    <>
      <Carousel />
      <Services />
      <Recommend />
      <Featured />
    </>
  );
};

export default HomePage;
