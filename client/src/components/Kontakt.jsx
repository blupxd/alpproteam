import React from 'react';
import image from '../images/image1.jpg';
import shape from '../images/shape.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Reveal } from './Reveal.tsx';

const Kontakt = () => {
  return (
    <div id="kontakt" className='flex flex-col relative pb-[42rem] md:pb-96 mb-24'>
      <div className='bg-blue-500 grid relative grid-cols-1 md:grid-cols-2 h-[30rem] overflow-hidden'>
        <Reveal>
        <div className='flex flex-col items-center md:items-start gap-2 py-24 px-12 text-center md:text-left'>
          <h1 className='text-6xl md:text-5xl lg:text-6xl font-semibold text-white'>Kontaktirajte nas</h1>
          <hr className='w-12 hidden md:inline-block border-[2px] border-amber-500'/>
          <Reveal>
          <p className='text-2xl mt-6 w-96 md:w-64 lg:w-96 text-white text-center md:text-justify'>Ukoliko želite da sarađujete sa nama, evo načina na koje možete stupiti u kontakt.</p>
          </Reveal>
        </div>
        </Reveal>
        <div className='hidden md:inline-block overflow-hidden'>
          <img src={image} alt="" className='rounded-tl-[30%] w-full object-cover rounded-bl-[70%]' />
        </div>
        <img className='absolute w-96 rotate-[90deg] left-[-12rem] md:left-[26rem] bottom-[-10rem] md:bottom-[-14rem]' src={shape} alt="" />
      </div>
      <div
        style={{
          zIndex: 30
        }}
        className='grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-12 absolute bottom-0 md:bottom-32 right-0 left-0 gap-4'>
        <Reveal className='w-full'>
            <div className='p-12 bg-white w-full border border-gray-200  shadow-md flex flex-col gap-4 items-center justify-center shadow-black/30'>
                <FontAwesomeIcon icon={faPhone} className='text-5xl text-gray-800' />
                <h1 className='text-xl text-center my-6 font-semibold text-gray-800'>Putem telefona</h1>
                <p className='w-64 text-center'>Zainteresovani ste za naše usluge? Nazovite nas na naš broj.</p>
                <a
                    href="tel:+381 61 1234 567"
                    className='text-blue-400 px-4 py-2 border border-blue-400 text-base transition duration-300 hover:bg-blue-400 hover:text-white'
                >
                    +381 61 1234 567
                </a>
            </div>
        </Reveal>
        <Reveal>
            <div className='p-12 bg-white border border-gray-200 shadow-md flex flex-col gap-4 items-center justify-center shadow-black/30'>
                <FontAwesomeIcon icon={faEnvelope} className='text-5xl text-gray-800' />
                <h1 className='text-xl text-center my-6 font-semibold text-gray-800'>Putem mail-a</h1>
                <p className='w-64 text-center'>Zainteresovani ste za naše usluge? Pišite nam na naš mejl</p>
                <a
                    href="mailto:mail@mail.com"
                    className='text-amber-500 text-base px-4 py-2 border border-amber-500 transition duration-300 hover:bg-amber-500 hover:text-white'
                >
                    mail@mail.com
                </a>
            </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Kontakt;
