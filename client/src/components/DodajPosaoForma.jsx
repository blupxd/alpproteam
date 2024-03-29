import React, { useState } from 'react';
import axios from 'axios';

const DodajPosaoForma = ({ onDodaj }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null);
  const [uspeh, setUspeh] = useState('');
  const [greska, setGreska] = useState('');
  const [dugmeOnemoguceno, setDugmeOnemoguceno] = useState(false);
  const [brojKaraktera, setBrojKaraktera] = useState(0);

  const handleDodajPosao = async () => {
    try {
      if (!naziv || !opis || !slika) {
        setGreska('Molimo popunite sva polja.');
        setUspeh('');
        return;
      }

      // Provera veličine slike
      const limit = 4.5 * 1024 * 1024; // 4.5 MB u bajtovima
      if (slika.size > limit) {
        setGreska('Veličina slike premašuje dozvoljeni limit od 4.5 MB.');
        setUspeh('');
        return;
      }

      setDugmeOnemoguceno(true);

      const formData = new FormData();
      formData.append('naziv', naziv);
      formData.append('opis', opis);
      formData.append('filename', slika);

      await axios.post('https://alpproteam.vercel.app/posao', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      });

      setUspeh('Uspešno ste dodali posao!');
      setGreska('');
      setNaziv('');
      setOpis('');
      setSlika(null);
      onDodaj();
      document.getElementById('slika').value = null;
    } catch (error) {
      setUspeh('');
      setGreska('Došlo je do greške prilikom dodavanja posla.');
      console.error(error);
    } finally {
      setDugmeOnemoguceno(false);
    }
  };

  return (
    <div className='bg-gray-950 rounded-md w-full'>
      <h1 className='text-white text-xl mb-4'>Dodaj novi posao:</h1>
      {uspeh && <p className='text-green-500'>{uspeh}</p>}
      {greska && <p className='text-red-500'>{greska}</p>}
      <form>
        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='naziv'>
            Naziv posla:
          </label>
          <input
            type='text'
            id='naziv'
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            className='p-2 border rounded-md w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='opis'>
            Opis posla:
          </label>
          <textarea
            id='opis'
            maxlength="320"
            value={opis}
            onChange={(e) => {
              setOpis(e.target.value)
              setBrojKaraktera(e.target.value.length);}}
            className='p-2 border rounded-md w-full'
          />
          <p className="text-sm text-white">{brojKaraktera}/320 karaktera</p>
        </div>
        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='slika'>
            Slika: <span className='font-bold text-amber-500'>(limit 4.5MB)</span>
          </label>
          <input
            type='file'
            id='slika'
            onChange={(e) => setSlika(e.target.files[0])}
            className='p-2 border text-white rounded-md w-full'
          />
        </div>
        <button
          type='button'
          onClick={handleDodajPosao}
          className={`text-white bg-green-500 p-2 rounded-md ${dugmeOnemoguceno ? 'cursor-not-allowed bg-gray-500' : ''}`}
          disabled={dugmeOnemoguceno}
        >
          {dugmeOnemoguceno ? 'Slanje...' : 'Dodaj posao'}
        </button>
      </form>
    </div>
  );
};

export default DodajPosaoForma;
