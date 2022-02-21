import no_data from 'assets/images/no_data.png';
import './style.css';

const NotFound = () => {
  return (
    <div className="notfound">
      <h3 className="my-5">System is down for maintenance. Please wait</h3>
      <img src={no_data} alt="no data found" />
    </div>
  );
};

export default NotFound;
