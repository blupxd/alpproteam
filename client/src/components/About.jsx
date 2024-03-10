import React from 'react';
import image from '../images/image1.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import poslovi from '../poslovi.json';
import { upaliGaleriju } from '../actions/galerijaAction';
import { useDispatch } from 'react-redux';
const About = () => {
  const dispatch = useDispatch();

  const workCard = (naslov, nav, image) => {
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
            <h1 className='text-2xl text-white h-20'>{naslov}</h1>
            <button
              onClick={() => {
                dispatch(upaliGaleriju(nav));
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
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

 

  return (
    <div id='o-nama' className='m-0 md:m-12 flex flex-col'>
        
      <div className='grid grid-cols-1 md:grid-cols-2 shadow-lg border border-gray-300 rounded-t-[10px] overflow-hidden'>
        <div className='flex flex-col px-8 py-12 md:p-12 bg-white'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-blue-500 font-semibold'>ALP-PRO Team</h1>
          <hr className='w-20 border-[2px] border-amber-500 mt-4' />
          <p className='mt-4 text-lg md:text-2xl text-justify text-gray-700'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque culpa tempora natus, molestiae totam
            provident quam, nisi, eum minus exercitationem atque neque tenetur blanditiis! Consequatur aliquid possimus
            delectus sapiente impedit.
          </p>
        </div>
        <div className='h-72 md:h-96 bg-black'>
          <img src={image} alt='image3' className='object-cover w-full opacity-70' />
        </div>
      </div>
      <div className='bg-gray-200 py-12 px-12 md:px-24 lg:px-32'>
        <Slider {...settings}>
          {poslovi.map((pos, index) => workCard(pos.posao, pos.link, image, index))}
        </Slider>
      </div>
    </div>
  );
};

export default About;
