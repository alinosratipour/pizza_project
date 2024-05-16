import { useNavigate } from "react-router-dom";
import "./Home.scss";
import Button from "../../components/UI-Liberary/Button/Button";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/pizza-menu");
  };
  return (
    <div className="Home-Container">
      <div className="Hero-Pizza">
        <img src="/assets/img/hero-pizza.png" className="Pizza-Image" />
      </div>

      <div className="Hero-Text-Container">
        <p className="text">Are you hungry ?</p>
        <p className="Hero-Text">Stay Home We Deliver</p>
        <div className="Button-Container">
          <Button size="md" colorscheme="secondery" onClick={handleClick}>
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
