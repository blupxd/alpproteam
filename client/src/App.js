import About from "./components/About";
import Footer from "./components/Footer";
import Galerija from "./components/Galerija";
import Hero from "./components/Hero";
import Kontakt from "./components/Kontakt";
import Login from "./components/Login";
import MobileNavbar from "./components/MobileNavbar";
import Navbar from "./components/Navbar";
import Panel from "./components/Panel";
import ScrollUp from "./components/ScrollToTop";
import Usluge from "./components/Usluge";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes> 
        <Route exact path='/' element={
          <>
            <Galerija />
            <ScrollUp />
            <MobileNavbar />
            <Navbar />
            <Hero />
            <About />
            <Usluge />
            <Kontakt />
            <Footer />
          </>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/admin-panel' element={<Panel />} />
      </Routes>
    </Router>
      
  );
}

export default App;
