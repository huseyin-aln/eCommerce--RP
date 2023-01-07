import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "../components";
import { Home, Contact, Cart, Admin, OrderHistory } from "../pages";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
