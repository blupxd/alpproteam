import About from "./components/About";
import Galerija from "./components/Galerija";
import Hero from "./components/Hero";
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
    </div>
  );
}

export default App;
