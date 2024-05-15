import { Link } from 'react-router-dom';
import "./Home.scss";


const Home = () => {
  return (
    <div className="Home-Container">
            {/* <div className='test'>vggg</div> */}
      <div className="Hero-Pizza">
        <img src="./src/assets/img/hero-pizza.png" className="Pizza-Image"  />
      </div>

      <div className="Hero-Text-Container">
        <p className="text">Are you hungry ?</p>
        <Link to="/pizza-menu" className="Hero-Text">Order Now</Link>
      </div>
      
    </div>
  );
};

export default Home;
