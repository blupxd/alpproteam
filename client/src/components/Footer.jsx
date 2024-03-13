import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upaliGaleriju } from '../actions/galerijaAction';
import logo2 from '../images/logo2.png'
const Footer = () => {
    const links = ['Početna', 'O nama', 'Usluge', 'Kontakt'];
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
    <div className='bg-black flex flex-col items-center'>
    <div className='grid p-12 grid-cols-1 gap-y-24 md:grid-cols-3 gap-x-64 items-top text-gray-500'>
        <div className='p-2 flex flex-col gap-4 items-center justify-start'>
            <h1 className='text-lg text-white border-b-[2px] border-blue-500 pb-1'>Linkovi</h1>
            <ul className='flex flex-col text-center text-xs gap-4 p-6'>
                {links.map((link, key) => (
                <li key={key}>
                <a
                    className={`text-gray-500 link-underline transition duration-200 `}
                    href={`/#${encodeURIComponent(sanitizeText(link))}`}
                >
                    {link}
                </a>
                </li>
            ))}
            <li>
                <button
                className={`${otvori ? 'text-amber-400 link-selected active' : 'text-gray-500 link-underline'} transition duration-200 `}
                onClick={() => {
                    dispatch(upaliGaleriju(''));
                }}
                >
                Galerija
                </button>
            </li>
        </ul>
        </div>
        <div className='p-2 flex flex-col items-center gap-4 justify-start'>
            <h1 className='text-lg text-white border-b-[2px] border-blue-500 pb-1'>Mreže</h1>
            <ul className='flex flex-col text-center text-xs gap-4 p-6 '>
                <li className=' link-underline'>
                    <a href='https://www.instagram.com/'>Instagram <FontAwesomeIcon icon={faInstagram} /></a>
                </li>
                <li className=' link-underline'>
                    <a href='https://www.facebook.com/'>Facebook <FontAwesomeIcon icon={faFacebook} /></a>
                </li>
            </ul>
        </div>
        <div className='p-2 flex flex-col items-center justify-start gap-8'>
            <h1 className='text-lg text-white border-b-[2px] border-blue-500 pb-1'>Kontakt</h1>
            <ul className='flex flex-col items-center justify-center gap-4'>
                <li>
                    <a className='link-underline text-xs pb-1' href="mailto:ivanperapetrovic@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} /> ivanperapetrovic@gmail.com
                    </a>
                </li>
                <li>
                    <a className='link-underline text-xs pb-1' href="tel:+381 60 3029 724">
                        <FontAwesomeIcon icon={faPhone} /> +381 60 3029 724
                    </a>
                </li>
            </ul>
            
        </div>
    </div>
    <div className='bg-gray-950/40 text-gray-700 text-xs flex flex-col items-center justify-center text-center w-full p-12'>
        <img src={logo2} alt="logo" className='w-32 mb-4 opacity-20'/>
        <h1>© 2024 AL-PRO Team</h1>
    </div>
</div>
  )
}

export default Footer