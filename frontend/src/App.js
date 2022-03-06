import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

// <Route path='/cart/:id?' element={<CartScreen />} ismei humne id ke aage ? isliye lagaya h kyuki ye zaruri nhi h ki jab bhi hum cart mei jaaye toh humare pass quantity hogi hi kyuki bina kuch select kre bhi toh hum cart ko access kr skte h toh uss case mei humare url mei qty nhi rhegi......ek aur point ye h ki react router v6 mei regex allowed nhi h toh hum jo id ke baad ? laga rhe h vo valid nhi h so humei /cart/:id aur /cart ko different route mei dena padega pr dono ek hi component ko render krenge
