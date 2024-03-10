import About from "./components/About";
import Footer from "./components/Footer";
import Galerija from "./components/Galerija";
import Hero from "./components/Hero";
import Kontakt from "./components/Kontakt";
import MobileNavbar from "./components/MobileNavbar";
import Navbar from "./components/Navbar";
import ScrollUp from "./components/ScrollToTop";
import Usluge from "./components/Usluge";

function App() {
  return (
    <div className="App">
      <Galerija />
      <ScrollUp />
      <MobileNavbar />
      <Navbar />
      <Hero />
      <About />
      <Usluge />
      <Kontakt />
      <Footer />
    </div>
  );
}

export default App;
