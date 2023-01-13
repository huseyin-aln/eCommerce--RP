import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer, Header } from "../components";
import {
  Home,
  Contact,
  Cart,
  Admin,
  OrderHistory,
  Login,
  Register,
  Reset,
} from "../pages";
import AdminOnlyRoute from "../components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "../components/product/productDetails/ProductDetails";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/admin"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
