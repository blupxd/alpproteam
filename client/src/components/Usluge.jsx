import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { upaliGaleriju } from '../actions/galerijaAction';
import { useDispatch } from 'react-redux';
import { Reveal } from './Reveal.tsx';
import axios from 'axios'
const Usluge = () => {
    const dispatch = useDispatch()
    const [poslovi, setPoslovi] = useState([])

    useEffect(() => {
        const fetchPoslovi = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posao');
                setPoslovi(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPoslovi()
    }, [])
  return (
      <div id="usluge" className='bg-blue-950 px-4 py-12 md:p-12 shadow-md shadow-black/20 my-48 mx-0 flex flex-col justify-center items-center'>
        <Reveal>
            <h1 className='text-7xl md:text-left text-center font-bold text-blue-200'>NAŠE <span className='text-blue-400'>USLUGE</span></h1>
        </Reveal>
        <hr className='border-blue-400 w-40 my-4 mx-auto border-[2px]'/>
        <div className='grid grid-cols-1 md:grid-cols-3 m-0 md:m-8 gap-4'>
            {poslovi &&
                poslovi.map((posao, key) => (
                <Reveal key={key}>
                <div className='bg-blue-950 border border-blue-300 p-8 flex flex-col items-center justify-center text-white text-center w-full shadow-md'>
                    <FontAwesomeIcon icon={faPaintRoller} size="3x" className='p-4 rounded-full border-amber-500 border text-amber-500'/>
                    <h1 className='text-2xl my-4 h-18 md:h-24'>{posao.naziv}</h1>
                    <p className='font-light h-16 w-32 text-center break-words'>{posao.opis}</p>
                    <div className='flex-grow' />
                    <button
                    onClick={() => {
                        dispatch(upaliGaleriju(posao.naziv))
                    }} 
                    className='mt-5 text-white font-light text-center px-4 py-2 bg-amber-500 inline-block'
                    >
                    GALERIJA
                    </button>
                </div>
                </Reveal>

            ))}
        </div>
      </div>
  );
};

export default Usluge;
