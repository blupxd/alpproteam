import React from 'react';
import hero from '../images/image2.jpg';

const Hero = () => {
  return (
    <div id="pocetna" className='bg-white mt-24 max-h-[1000px] md:mt-20 mb-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 my-4'>
            <div className='p-4 md:p-12 flex md:text-left text-center md:items-start items-center justify-center flex-col gap-4'>
                <h1 className='text-gray-600 font-semibold text-7xl md:text-8xl'>
                    <span className='text-blue-600 font-bold'>ALP-PRO</span> Team
                </h1>
                <h3 className='w-96 md:border-b-0 md:border-l-[4px] pb-4 pl-0 md:pl-4 border-amber-500 text-gray-600 font-light text-3xl md:text-2xl'>
                    Visoko iznad očekivanja! Profesionalni alpinistički rad, jer svaki vrhunski detalj čini razliku.
                </h3>
                <div className='flex flex-row mt-14 gap-4 mb-14 items-center'>
                    <a
                        href="/#kontakt"
                        className='text-xl px-8 py-2 rounded-md text-white bg-amber-500 border border-amber-500 hover:bg-white hover:border-amber-400 hover:text-amber-500 transition duration-300'
                    >
                        Kontakt
                    </a>
                    <a
                        href="/#usluge"
                        className='text-xl px-8 py-2 rounded-md text-white bg-blue-500 border border-blue-500 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition duration-300'
                    >
                        Usluge
                    </a>
                </div>   
            </div>
            <div className='h-72 md:h-[30rem] overflow-hidden shadow-lg shadow-black/40 bg-black rounded-b-[0] md:rounded-br-[0px] md:rounded-l-[20px]'>
                <img src={hero} alt="hero" className='object-cover opacity-70 h-full w-full' />
            </div>
        </div>
    </div>
  );
};

export default Hero;
