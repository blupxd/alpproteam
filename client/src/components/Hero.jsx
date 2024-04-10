import React from "react";
import hero from "../images/image2.jpg";
import { Reveal } from "./Reveal.tsx";
import logo from "../images/logo.png";
const Hero = () => {
  return (
    <div id="pocetna" className="bg-white mt-0 md:mt-20 max-h-[1000px] mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 my-0 md:my-4 relative">
        <div className="py-24 px-12 md:p-12 md:my-0 mt-24 flex md:text-left z-20 text-center md:items-start items-center  justify-center flex-col gap-4">
          <Reveal>
            <img src={logo} className="w-[36rem]" alt="logo"/>
          </Reveal>
          <Reveal>
            <hr className="border-amber-500 w-24 border-[4px] mt-12 mb-2 md:block hidden"/>
            <h3 className="text-clip text-white md:text-gray-600 font-light text-2xl md:text-2xl">
              Profesionalni alpinistički rad, jer svaki
              vrhunski detalj čini razliku.
            </h3>
          </Reveal>
          <Reveal>
            <div className="flex flex-row mt-14 gap-4 mb-14 items-center">
              <a
                href="/#kontakt"
                className="text-xl px-8 py-2 rounded-md text-white bg-amber-500 border border-amber-500 hover:bg-white hover:border-amber-400 hover:text-amber-500 transition duration-300"
              >
                Kontakt
              </a>
              <a
                href="/#usluge"
                className="text-xl px-8 py-2 rounded-md text-white bg-blue-500 border border-blue-500 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition duration-300"
              >
                Usluge
              </a>
            </div>
          </Reveal>
        </div>
        <div className="h-full w-full overflow-hidden absolute md:hidden bg-black block">
          <img
            src={hero}
            alt="hero"
            className="object-cover opacity-20 h-full w-full"
          />
        </div>
        <Reveal>
          <div className="h-72 md:h-[30rem] overflow-hidden md:block hidden shadow-lg shadow-black/40 bg-black rounded-b-[0] md:rounded-br-[0px] md:rounded-l-[20px]">
            <img
              src={hero}
              alt="hero"
              className="object-cover opacity-70 h-full w-full"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Hero;
