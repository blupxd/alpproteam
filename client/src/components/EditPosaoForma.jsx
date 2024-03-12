import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPosaoForma = ({ selectedPosao, onClose, onEdit }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null);
  const [previewSlika, setPreviewSlika] = useState(null); 
  const [uspeh, setUspeh] = useState('');
  const [greska, setGreska] = useState('');
  const [dugmeOnemoguceno, setDugmeOnemoguceno] = useState(false);

  useEffect(() => {
    if (selectedPosao) {
      setNaziv(selectedPosao.naziv);
      setOpis(selectedPosao.opis);
      setSlika(selectedPosao.slika);
      setPreviewSlika(selectedPosao.slika);
    }
  }, [selectedPosao]);


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'slika' && files && files.length > 0) {
      setSlika(files[0]);
      setPreviewSlika(URL.createObjectURL(files[0]));
    } else if (name !== 'slika') {
      if (!dugmeOnemoguceno) {
        if (name === 'naziv') {
          setNaziv(value);
        } else if (name === 'opis') {
          setOpis(value);
        }
      }
    }
  
    setGreska('');
    setUspeh('');
  };
  const handleEditPosao = async () => {
    try {
      if (!naziv || !opis) {
        setGreska('Molimo popunite sva polja.');
        setUspeh('');
        return;
      }
  
      setDugmeOnemoguceno(true);
  
      const formData = new FormData();
      formData.append('naziv', naziv);
      formData.append('opis', opis);
      formData.append('filename', slika);
  
      const response = await axios.put(
        `https://alpproteam.vercel.app/posao/${selectedPosao._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('user')}`
          },
        }
      );
  
      onEdit(response.data);
      setUspeh('Uspešno ste editovali posao!');
      setGreska('');
    } catch (error) {
      setUspeh('');
      setGreska('Došlo je do greške prilikom editovanja posla.');
      console.error(error);
    } finally {
      setDugmeOnemoguceno(false);
    }
  };

  return (
    <div className='p-12'>
      <div className='bg-gray-950 rounded-md p-8 max-w-md mx-auto'>
        <h1 className='text-white text-xl mb-4'>Edituj Posao</h1>
        {uspeh && <p className='text-green-500'>{uspeh}</p>}
        {greska && <p className='text-red-500'>{greska}</p>}
        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='naziv'>
            Naziv posla:
          </label>
          <input
            type='text'
            id='naziv'
            value={naziv}
            onChange={(e) => handleInputChange(e)}
            className='p-2 border rounded-md w-full'
            name='naziv'
          />
        </div>

        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='opis'>
            Opis posla:
          </label>
          <textarea
            style={{
              resize: "none",
              height: "100px"
            }}
            id='opis'
            value={opis}
            onChange={(e) => handleInputChange(e)}
            className='p-2 border focus:outline-none rounded-md w-full'
            name='opis'
          />
        </div>
        <div className='mb-4'>
          <label className='text-white text-sm' htmlFor='slika'>
            Nova slika:
          </label>
          <input
            type='file'
            id='slika'
            onChange={(e) => handleInputChange(e)}
            className='p-2 border text-white rounded-md w-full'
            name='slika'
          />
        </div>
        <div className='mb-4 w-full h-32 overflow-hidden'>
          <img src={previewSlika} className='w-full h-full object-cover' alt={naziv} />
        </div>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={handleEditPosao}
            className={`text-white p-2 rounded-md ${dugmeOnemoguceno ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}`}
            disabled={dugmeOnemoguceno}
          >
            Sačuvaj izmene
          </button>
          <button
            type='button'
            onClick={onClose}
            className='text-white bg-red-600 p-2 ml-2 rounded-md'
          >
            Otkaži
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPosaoForma;
