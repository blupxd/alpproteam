import { faBars, faClose, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upaliGaleriju } from '../actions/galerijaAction';
import logo from '../images/logophone.png'

const MobileNavbar = () => {
  const links = ['Početna', 'O nama', 'Usluge', 'Kontakt'];
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const sanitizeText = (text) => {
    const diacriticMap = { 'ć': 'c', 'č': 'c', 'đ': 'd', 'š': 's', 'ž': 'z' };
    return text
      .toLowerCase()
      .replace(/[ćčđšž]/g, (match) => diacriticMap[match] || match)
      .replace(/\s+/g, '-');
  };
  const otvori = useSelector((state) => state.isOpen);

  return (
    <div style={{ zIndex: 100 }} className='top-0 right-0 bottom-0 left-0 h-0 lg:hidden fixed w-full'>
      <div className='relative top-0 z-10 flex flex-col items-center border-b border-blue-300 py-2 bg-white justify-center w-full'>
        <div className=''>
          <img src={logo} alt="logo" className='w-10' />
        </div>
        <button
          style={{ transform: `rotate(${menu ? '90deg' : '0deg'})`}}
          className={`transition-transform duration-200 absolute right-4 text-blue-700 text-4xl`}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>
      <div
        style={{ overflow: 'hidden' }}
        className={`transition-transform bg-white py-12 w-full ease-in-out duration-300 h-screen ${menu ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className='flex flex-col items-center text-2xl gap-12'>
          {links.map((link, key) => (
            <li key={key}>
              <a
                className={`${selected === key ? 'text-amber-400 link-selected active' : 'text-blue-500 link-underline'} transition duration-200 `}
                onClick={() => {
                  setSelected(key);
                  setMenu(false);
                }}
                href={`/#${encodeURIComponent(sanitizeText(link))}`}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <button
              className={`${otvori ? 'text-amber-400 link-selected active' : 'text-blue-500 link-underline'} transition duration-200 `}
              onClick={() => {
                dispatch(upaliGaleriju(''));
                setMenu(false);
              }}
            >
              Galerija
            </button>
          </li>
        </ul>
        <div className='bg-blue-600 max-w-max mx-auto text-white mt-12 flex items-center justify-center gap-4 px-8 py-4'>
          <FontAwesomeIcon icon={faPhone} />
          <a href='tel:+381 60 3029 724' className='text-xl font-semibold'>+381 60 3029 724</a>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
