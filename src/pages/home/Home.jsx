// Home page will be a component that has a title, a link to the list of cars for sale, and a link to the list of auction sites, and a link for the user to log in

import { Link } from "react-router";
import icon from "../../assets/dh_marte_web_icon.jpg";

export default function Home() {
  return (
    <>
      <header></header>
      <p className="intro">
        Welcome to DH Marte Auto Sale, your trusted destination for quality used
        vehicles and personalized car-buying services.
      </p>

      <p className="links">
        <Link to="/cars">Cars for Sale</Link>

        <Link to="/auctions">Auction Sites</Link>
      </p>
      <p className="cars">
        Explore our extensive inventory of pre-owned vehicles, carefully
        inspected and competitively priced to meet your needs and budget.
      </p>
      <p className="auctions">
        Discover our curated list of reputable auction sites, where you can find
        a wide range of vehicles at competitive prices, all backed by our
        commitment to quality and customer satisfaction.
      </p>
      <Link to="/generalinquiries">General Inquiries</Link>
      <p className="inquiries">
        Have questions or need assistance? Contact us through our general
        inquiry form.
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
