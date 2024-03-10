import React from 'react';
import poslovi from '../poslovi.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { upaliGaleriju } from '../actions/galerijaAction';
import { useDispatch } from 'react-redux';
import { Reveal } from './Reveal.tsx';

const Usluge = () => {
    const dispatch = useDispatch()
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
                        <div
                        className='bg-blue-950 border border-blue-300 p-8 items-center justify-center flex flex-col text-white w-full shadow-md'
                        >
                        <FontAwesomeIcon icon={faPaintRoller} size="3x" className='p-4 rounded-full border-amber-500 border text-amber-500'/>
                        <h1 className='text-3xl my-4'>{posao.posao}</h1>
                        <p className='font-light w-64 text-center'>{posao.opis}</p>
                        <button
                            onClick={() => {
                                dispatch(upaliGaleriju(posao.posao))
                            }} 
                            className='mt-6 text-white font-light text-center px-4 py-2 bg-amber-500 mt-2 inline-block'
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
