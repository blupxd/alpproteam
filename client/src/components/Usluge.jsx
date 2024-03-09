import React from 'react';
import poslovi from '../poslovi.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { upaliGaleriju } from '../actions/galerijaAction';
import { useDispatch } from 'react-redux';

const Usluge = () => {
    const dispatch = useDispatch()
  return (
      <div id="usluge" className='bg-gray-300 px-8 py-12 md:p-12 rounded-lg shadow-md shadow-black/20 my-48 mx-12 flex flex-col justify-center items-center'>
        <h1 className='text-7xl md:text-left text-center font-bold text-blue-500 mb-12'>NAŠE USLUGE</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 m-0 md:m-8 gap-4'>
            {poslovi &&
                poslovi.map((posao, key) => (
                <div
                key={key}
                className='bg-white rounded-lg p-8 items-center justify-center flex flex-col text-blue-500 w-full shadow-md'
                >
                <h1 className='text-xl font-semibold mb-4'>{posao.posao}</h1>
                <FontAwesomeIcon icon={faPaintRoller} size="5x" />
                <p className='text-gray-700 italic text-sm'>{posao.opis}</p>
                <button
                    onClick={() => {
                        dispatch(upaliGaleriju(posao.posao))
                    }} 
                    className='text-amber-500 px-4 py-2 border-amber-500 border mt-2 inline-block'
                >
                    Galerija
                </button>
                </div>
            ))}
        </div>
      </div>
  );
};

export default Usluge;
