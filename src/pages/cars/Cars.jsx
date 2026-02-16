//Cars page will fetch and display a list of cars from the API
// logged in user will have the option to add a new car, which will take them to a form to fill out the details of the car
// logged in user will also have the option to delete a car

import { useState, useEffect } from "react";
import { getCars, getCarPhotos } from "../../api/cars";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import carsLong from "../../assets/cars_for_sale_long.jpg";
import "./cars.css";

const API = import.meta.env.VITE_API;

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [photos, setPhotos] = useState({});
  const { token } = useAuth();

  const syncCars = async () => {
    try {
      const data = await getCars();

      setCars(data);
      const photosMap = {};
      await Promise.all(
        data.map(async (car) => {
          const carPhotos = await getCarPhotos(car.id);
          photosMap[car.id] = carPhotos;
        }),
      );
      setPhotos(photosMap);
    } catch (error) {
      console.error("failed to fetch cars", error);
    }
  };

  useEffect(() => {
    syncCars();
  }, []);

  return (
    <>
      <h1>
        <img
          src={carsLong}
          alt="Cars for Sale"
          style={{ width: "400px", height: "300px" }}
        />
      </h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id} className="carListItem">
            <Link to={`/cars/${car.id}`} className="carTitle">
              {car.make} {car.model} {car.year}
            </Link>
            <Link to={`/cars/${car.id}`}>
              {photos[car.id] && photos[car.id].length > 0 ? (
                <img
                  src={
                    photos[car.id][0].file_path.startsWith("http")
                      ? photos[car.id][0].file_path
                      : `${API}/${photos[car.id][0].file_path}`
                  }
                  alt={`${car.make} ${car.model}`}
                  width="400"
                  height="400"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <img
                  src={car.photo_url}
                  alt={`${car.make} ${car.model}`}
                  width="400"
                  height="400"
                  style={{ objectFit: "cover" }}
                />
              )}
            </Link>
            {token && (
              <Link to={`/cars/${car.id}/delete`} className="deleteCarLink">
                Delete Car
              </Link>
            )}
          </li>
        ))}
      </ul>
      {token && <Link to="/cars/new">Add New Car</Link>}
    </>
  );
}
