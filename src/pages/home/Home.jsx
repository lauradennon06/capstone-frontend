// Home page will be a component that has a title, a link to the list of cars for sale, and a link to the list of auction sites, and a link for the user to log in

import { Link } from "react-router";
import icon from "../../assets/dh_marte_web_icon.jpg";
import carsLong from "../../assets/cars_for_sale_long1.jpg";
import auctions from "../../assets/auctions1.jpg";
import contact from "../../assets/contact_us.jpg";
import "./home.css";

export default function Home() {
  return (
    <>
      <header></header>
      <p className="intro">
        Welcome to DH Marte Auto Sale, your trusted destination for quality used
        vehicles and personalized car-buying services.
      </p>
      <div className="links">
        <div className="cars">
          <p>
            Ready to drive your new car today? <br></br> Click the link below to
            explore our cars that are maintenanced and ready for sale!
          </p>
          <p>
            <Link to="/cars">
              <img
                src={carsLong}
                alt="Cars for Sale"
                style={{ width: "300px", height: "100px" }}
              />
            </Link>
          </p>
        </div>
        <div className="auctions">
          <p>
            Looking for something more specific? <br></br>Explore auction sites
            for a wider selection of vehicles. We will use our expertise to
            guide you.
          </p>
          <p>
            <Link to="/auctions">
              <img
                src={auctions}
                alt="Auctions"
                style={{ width: "300px", height: "100px" }}
              />
            </Link>
          </p>
        </div>
      </div>
      <p className="contact">
        HAVE QUESTIONS?<br></br>
        <Link to="/generalinquiries">
          <img
            src={contact}
            alt="Contact Us"
            style={{ width: "300px", height: "200px" }}
          />
        </Link>
      </p>

      <footer>
        <Link to="/login">
          <img
            src={icon}
            alt="Login"
            style={{ width: "150px", height: "60px" }}
          />
        </Link>
      </footer>
    </>
  );
}
