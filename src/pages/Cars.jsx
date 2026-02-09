//Cars page will fetch and display a list of cars from the API
import { useState, useEffect } from "react";
import { getCars } from "../api/cars";
import { Link } from "react-router";

export default function Cars() {
  const [cars, setCars] = useState([]);

  const syncCars = async () => {
    try {
      const data = await getCars();
      console.log("fetched cars", data);
      setCars(data);
    } catch (error) {
      console.error("failed to fetch cars", error);
    }
  };

  useEffect(() => {
    syncCars();
  }, []);

  return (
    <>
      <h1>Cars for Sale</h1>
      <ul>
        {cars.map(
          (car) => (
            console.log("car", car),
            (
              <li key={car.id}>
                <img src={car.photo_url} alt={car.make + " " + car.model} />
                <Link to={`/cars/${car.id}`}>
                  {car.make} {car.model}
                </Link>
                <br />
                {car.year}
                <br />- ${car.price}
              </li>
            )
          ),
        )}
      </ul>
    </>
  );
}
