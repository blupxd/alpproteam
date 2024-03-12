import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditSlikaForma = ({ selectedSlika, onClose }) => {
  const [poslovi, setPoslovi] = useState([]);
  const [editedSlika, setEditedSlika] = useState({
    slikaURL: selectedSlika.slikaURL,
    slikaAlt: selectedSlika.slikaAlt,
    posao: selectedSlika.posao,
    file: null,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false); // Add state for button disabled

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setEditedSlika((prevSlika) => ({
      ...prevSlika,
      [name]: name === 'file' ? files[0] : value,
      posao: name === 'posao' ? value : prevSlika.posao,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonDisabled(true); // Disable the button on submit

      const formData = new FormData();

      if (editedSlika.file) {
        formData.append('filename', editedSlika.file);
      }

      formData.append('posao', editedSlika.posao);

      const response = await axios.put(`https://alpproteam.vercel.app/galerija/${selectedSlika._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      });

      setEditedSlika((prevSlika) => ({
        ...prevSlika,
        slikaURL: response.data.slikaURL,
      }));
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setButtonDisabled(false); // Enable the button after the request is completed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePoslovi = await axios.get('https://alpproteam.vercel.app/posao/');
        setPoslovi(responsePoslovi.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='bg-white p-8 rounded-md'>
      <h1 className='text-2xl font-bold mb-4'>Uredi sliku</h1>
      <div className='mb-4 w-full h-32 overflow-hidden'>
        <img
          src={editedSlika.file ? URL.createObjectURL(editedSlika.file) : selectedSlika.slikaURL}
          className='w-full h-full object-cover'
          alt={editedSlika.file ? editedSlika.slikaAlt : selectedSlika.slikaAlt}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='file' className='block text-gray-800 font-medium'>
            Izaberite sliku:
          </label>
          <input
            type='file'
            id='file'
            name='file'
            accept='image/*'
            onChange={handleInputChange}
            className='w-full mt-1 p-2 border rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='posao' className='block text-gray-800 font-medium'>
            Posao:
          </label>
          <select
            id='posao'
            name='posao'
            value={editedSlika.posao}
            onChange={handleInputChange}
            className='w-full mt-1 p-2 border rounded-md'
          >
            {poslovi.map((posao) => (
              <option key={posao._id} value={posao.naziv}>
                {posao.naziv}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-800 px-4 py-2 bg-gray-300 rounded-md'
            disabled={buttonDisabled}
          >
            Otkaži
          </button>
          <button
            type='submit'
            className='text-white px-4 py-2 bg-blue-500 rounded-md'
            disabled={buttonDisabled}
          >
            Sačuvaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSlikaForma;
