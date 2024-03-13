import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DodajSlikuForma = ({ onSlika, prviPoslovi }) => {
  const [poslovi, setPoslovi] = useState(prviPoslovi);
  const [selectedPosao, setSelectedPosao] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [slikaDodana, setSlikaDodana] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Dodato stanje za praćenje slanja slike

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPoslovi = async () => {
      try {
        const response = await axios.get('https://alpproteam.vercel.app/posao');
        setPoslovi(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoslovi();
  }, [poslovi]);

  const handleDodajSliku = async () => {
    try {
      if (!selectedFile) {
        setError('Izaberite sliku.');
        return;
      }

      setError(null);

      const limit = 4.5 * 1024 * 1024;
      if (selectedFile.size > limit) {
        setError('Veličina slike premašuje dozvoljeni limit od 4.5 MB.');
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('posao', selectedPosao);
      formData.append('filename', selectedFile);

      await axios.post('https://alpproteam.vercel.app/galerija', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      });
      
      setSlikaDodana(true);
      setSelectedPosao('');
      setSelectedFile(null)
      fileInputRef.current.value = ''
      onSlika();
      setTimeout(() => {
        setSlikaDodana(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError('Greška prilikom slanja slike.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border border-gray-800 rounded-md">
      <h2 className="text-xl text-white font-semibold mb-4">Dodaj Novu Sliku</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {slikaDodana && <p className="text-green-500 mb-4">Slika uspešno dodana!</p>}

      <div className="mb-4">
                <label htmlFor="posao" className="block text-sm text-white">
                    Posao
                </label>
                <select
                    id="posao"
                    name="posao"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedPosao}
                    onChange={(e) => setSelectedPosao(e.target.value)}
                >
                    <option value="">Izaberi posao</option>
                    {poslovi.map((posao) => (
                        <option key={posao._id} value={posao.naziv}>
                            {posao.naziv}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="file" className="block text-sm text-white">
                    Izaberi Sliku <span className='font-bold text-amber-500'>(limit 4.5MB)</span>
                </label>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="mt-1 p-2 w-full border border-gray-300 text-white rounded-md focus:outline-none"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </div>
      <button
        onClick={handleDodajSliku}
        className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${isSubmitting ? 'cursor-not-allowed bg-gray-500' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Slanje...' : 'Dodaj Sliku'}
      </button>
    </div>
  );
};

export default DodajSlikuForma;
