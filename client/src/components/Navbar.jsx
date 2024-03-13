import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upaliGaleriju } from '../actions/galerijaAction';
import logo from '../images/logophone.png'

const Navbar = () => {
    const links = ['Početna', 'O nama', 'Usluge', 'Kontakt']
    const [selected, setSelected] = useState(null)
    const dispatch = useDispatch()
    const sanitizeText = (text) => {
        const diacriticMap = { 'ć': 'c', 'č': 'c', 'đ': 'd', 'š': 's', 'ž': 'z' };
        return text
          .toLowerCase()
          .replace(/[ćčđšž]/g, (match) => diacriticMap[match] || match)
          .replace(/\s+/g, '-');
      };
      const otvori = useSelector((state) => state.isOpen)
  return (
    <div style={{zIndex:90}} className='fixed w-full top-0 bg-white hidden px-24 py-2 border-b border-blue-300 lg:flex items-center justify-between'>
        <div className=''>
            <img src={logo} className='w-12' alt="" />
        </div>
        <ul className='flex items-center gap-5 lg:gap-12'>
            {links.map((link, key) => (
            <li key={key}>
                <a className={`${selected === key ? 'text-amber-400 link-selected active' : 'text-blue-500 link-underline'} transition duration-200 `} onClick={() => setSelected(key)} href={`/#${encodeURIComponent(sanitizeText(link))}`}>
                {link}
                </a>
            </li>
            ))}
            <li>
                <button className={`${otvori? 'text-amber-400 link-selected active' : 'text-blue-500 link-underline'} transition duration-200 `} 
                onClick={() => {
                    dispatch(upaliGaleriju(''))
                    }}>
                    Galerija
                </button>
            </li>
        </ul>
        <div className='bg-blue-600 text-white  flex items-center justify-center gap-4 px-4 py-2'>
            <FontAwesomeIcon icon={faPhone} /> 
            <a href='tel:+381 60 3029 724' className='text-sm font-semibold'>+381 60 3029 724</a>
        </div>
    </div>
  )
}

export default Navbar