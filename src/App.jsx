import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Car from "./pages/Car";
import InquiryCar from "./pages/InqueiryCar";
import User from "./pages/User";
import Auctions from "./pages/Auctions";
import Inqueries from "./pages/Inquiries";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/inquiries" element={<Inqueries />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars/:carId" element={<Car />} />
        <Route path="/cars/:carId/inquire" element={<InquiryCar />} />
      </Route>
    </Routes>
  );
}
