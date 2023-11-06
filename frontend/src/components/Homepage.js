import { Link } from 'react-router-dom';
import './styles/main.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-div_center">
        <h1>Welcome to the workout tracker app!</h1>
      </div>
      <div className="home-div_center">
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;