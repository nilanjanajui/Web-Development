

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";
import Banner from "./components/Banner";
import StatsSection from "./components/Status";
import MainSection from "./components/MainSection";
import StepsSection from "./components/StepsSection";
import PricingSection from "./components/PricingSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <div className="min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={2500}></ToastContainer>
        <Navbar cartCount={cartItems.length}></Navbar>
        <Banner></Banner>
        <StatsSection></StatsSection>
        <MainSection cartItems={cartItems} setCartItems={setCartItems}></MainSection>
        <StepsSection></StepsSection>
        <PricingSection></PricingSection>
        <Workflow></Workflow>
        <Footer></Footer>

      </div>
    </>
  );
}

export default App;