import React, { useEffect, useState } from 'react';
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
                const response = await axios.get('https://alpproteam.vercel.app/posao');
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
            <div className="bg-blue-950 border border-blue-300 p-8 flex flex-col items-center justify-between text-white text-center w-full shadow-md h-[400px]">
                <h1 className="text-3xl my-4 h-[50px] font-bold">{posao.naziv}</h1>
                <p className="font-light w-80 p-4 text-sm text-center break-words overflow-hidden">
                {posao.opis}
                </p>
                <button
                onClick={() => {
                    dispatch(upaliGaleriju(posao.naziv));
                }}
                className="mt-4 text-white font-light text-center px-6 py-3 bg-amber-500 rounded-md"
                >
                Pogledaj galeriju
                </button>
            </div>
            </Reveal>
        ))}

        </div>
      </div>
  );
};

export default Usluge;
