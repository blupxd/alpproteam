import About from "./components/About";
import Galerija from "./components/Galerija";
import Hero from "./components/Hero";
import Kontakt from "./components/Kontakt";
import MobileNavbar from "./components/MobileNavbar";
import Navbar from "./components/Navbar";
import Usluge from "./components/Usluge";

function App() {
  return (
    <div className="App">
      <Galerija />
      <MobileNavbar />
      <Navbar />
      <Hero />
      <About />
      <Usluge />
      <Kontakt />
    </div>
  );
}

export default App;
