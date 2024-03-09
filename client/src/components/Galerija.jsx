import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ugasiGaleriju } from '../actions/galerijaAction'

const Galerija = () => {
    const otvori = useSelector((state) => state.isOpen)
    const dispatch = useDispatch()
  return (
    <div className={`${otvori ? 'inline-block' : 'hidden'} fixed w-full top-0 h-screen bg-black/40 z-50`}>
        <div className='bg-white flex relative flex-col items-center justify-center rounded-xl m-24 p-24'>
            <button className='absolute right-4 top-4' onClick={() => dispatch(ugasiGaleriju())}><FontAwesomeIcon icon={faClose} /></button>
            <h1 className='text-4xl font-bold text-amber-500'>Galerija</h1>
            <div className='border border-gray-300 p-2'>
              
            </div>
        </div>
    </div>
  )
}

export default Galerija