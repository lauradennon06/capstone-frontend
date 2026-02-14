import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/home/Home";
import Cars from "./pages/cars/Cars";
import Car from "./pages/cars/Car";
import AddCar from "./pages/cars/AddCar";
import InquiryCar from "./pages/inquiries/InqueiryCar";
import GeneralInquiries from "./pages/inquiries/GeneralInquiries";
import User from "./pages/home/User";
import Auctions from "./pages/auctions/Auctions";
import AddAuction from "./pages/auctions/AddAuction";
import DeleteAuction from "./pages/auctions/DeleteAuction";
import Inqueries from "./pages/inquiries/Inquiries";
import Error404 from "/src/Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/new" element={<AddCar />} />
        <Route path="/cars/:carId" element={<Car />} />
        <Route path="/cars/:carId/inquire" element={<InquiryCar />} />
        <Route path="/generalinquiries" element={<GeneralInquiries />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/inquiries" element={<Inqueries />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/new" element={<AddAuction />} />
        <Route path="/auctions/delete/:auctionId" element={<DeleteAuction />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
