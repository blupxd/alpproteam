import React, { useEffect, useState } from 'react';
import image from '../images/image1.jpg';
import Slider from 'react-slick';
import { Reveal } from './Reveal.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { upaliGaleriju } from '../actions/galerijaAction';
import { useDispatch } from 'react-redux';
import axios from 'axios'
const About = () => {
  const dispatch = useDispatch();
  const [poslovi, setPoslovi] = useState([])

  const workCard = (naziv, desc, image) => {
    const cardStyle = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      height: '100%',
    };

    return (
      <div>
        <div style={cardStyle} className='mx-2 md:mx-12 relative text-center px-4 py-12 border-gray-600 border flex flex-col'>
          <div className='z-10'>
            <h1 className='text-2xl text-white h-20'>{naziv}</h1>
            <button
              onClick={() => {
                dispatch(upaliGaleriju(naziv));
              }}
              className='px-6 py-2 text-white font-semibold border-white border-[2px] hover:bg-white hover:text-gray-950 transition duration-300'
            >
              Pregled
            </button>
          </div>

          <div className='absolute left-0 right-0 top-0 bottom-0 bg-black/60'></div>
        </div>
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchPoslovi = async () => {
      try {
          const response = await axios.get('https://alpproteam.vercel.app/posao');
          setPoslovi(response.data);
      } catch (error) {
          console.error(error);
      }
  };
  fetchPoslovi()
  }, [])

  return (
    <div id='o-nama' className='m-0 md:m-12 flex flex-col'>
        
      <div className='grid grid-cols-1 md:grid-cols-2 shadow-lg border border-gray-300 rounded-t-[10px] overflow-hidden'>
        <Reveal>
        <div className='flex flex-col px-8 py-12 md:p-12 bg-white'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-blue-700 font-semibold'>ALP Pro-Tim</h1>
          <hr className='w-20 border-[2px] border-amber-500 mt-4' />
          <Reveal>
            <p className='mt-4 text-lg md:text-xl text-justify text-gray-700'>
            ALP Pro-Tim je vodeća alpinistička firma specijalizovana za visinske poslove izvan domena alpinizma. 
            Pružamo širok spektar usluga na visinama, od molersko-fasaderskih radova do pranja prozora i održavanja konstrukcija. 
            Sa stručnim timom i vrhunskom opremom, garantujemo efikasnost i visok standard u izvođenju radova.
            </p>
          </Reveal>
          
        </div>
        </Reveal>
        <Reveal>
        <div className='h-96 overflow-hidden bg-black m-12 md:block hidden'>
          <img src={image} alt='image3' className='object-cover h-96 w-full' />
        </div>
        </Reveal>
      </div>
      <Reveal>
        <div className='bg-gray-200 py-12 px-12 md:px-24 lg:px-32'>
          <Slider {...settings}>
            {poslovi.map((pos, index) => workCard(pos.naziv, pos.naziv, pos.slika, index))}
          </Slider>
        </div>
      </Reveal>
    
    </div>
  );
};

export default About;
