import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DodajPosaoForma from './DodajPosaoForma';
import DodajSlikuForma from './DodajSlikuForma';
import EditPosaoForma from './EditPosaoForma';
import EditSlikaForma from './EditSlikaForma';
import { useNavigate, useParams } from 'react-router-dom';

const Panel = () => {
  const [poslovi, setPoslovi] = useState([]);
  const [slike, setSlike] = useState([]);
  const [selectedPosao, setSelectedPosao] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletePosaoId, setDeletePosaoId] = useState(null);
  const [deleteSlikaId, setDeleteSlikaId] = useState(null);
  const [isDeleteSlikaModalVisible, setIsDeleteSlikaModalVisible] = useState(false);

  const [selectedSlika, setSelectedSlika] = useState(null);
  const [isSlikaModalVisible, setIsSlikaModalVisible] = useState(false);
  const history = useNavigate();
    const params = useParams()
  useEffect(() => {
    const userToken = localStorage.getItem('user');

    if (!userToken) {
      // Ako nema korisnika, preusmeri na login stranicu
      history('/login');
    } else {
      // Ako ima korisnika, učitaj podatke
      fetchData();
    }
  }, [params]);
  const handleLogout = () => {
    localStorage.removeItem('user');
    history('/login');
  };

  const handleEditSlika = (slika) => {
    setSelectedSlika(slika);
    setIsSlikaModalVisible(true);
  };

  const handleDeleteSlika = (slikaId) => {
    setDeleteSlikaId(slikaId);
    setIsDeleteSlikaModalVisible(true);
  };

  const handleDeletePosao = (posaoId) => {
    setDeletePosaoId(posaoId);
    setIsDeleteModalVisible(true);
  };
  const fetchData = async () => {
    try {
      const responseSlike = await axios.get('http://localhost:5000/galerija');
      setSlike(responseSlike.data);

      const responsePoslovi = await axios.get('http://localhost:5000/posao');
      setPoslovi(responsePoslovi.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isSlikaModalVisible]);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posao/${deletePosaoId}`);
      const responsePoslovi = await axios.get('http://localhost:5000/posao');
      setPoslovi(responsePoslovi.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteModalVisible(false);
      setDeletePosaoId(null);
    }
  };

  const handleConfirmDeleteSlika = async () => {
    try {
      await axios.delete(`http://localhost:5000/galerija/${deleteSlikaId}`);
      const responseSlike = await axios.get('http://localhost:5000/galerija');
      setSlike(responseSlike.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteSlikaModalVisible(false);
      setDeleteSlikaId(null);
    }
  };

  const handleEditPosao = (posao) => {
    setSelectedPosao(posao);
    setIsModalVisible(true);
  };
  const handleConfirmEditSlika = async (editedSlika) => {
    try {
      await axios.put(`http://localhost:5000/galerija/${editedSlika._id}`, editedSlika);
      // Add any additional logic if needed
    } catch (error) {
      console.error(error);
    } finally {
      setIsSlikaModalVisible(false);
      setSelectedSlika(null);
    }
  };
  

  return (
    <div className='bg-gray-950'>
      {isSlikaModalVisible && (
        <div style={{ zIndex: 100 }} className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
            <EditSlikaForma
            selectedSlika={selectedSlika}
            onClose={() => {
                setIsSlikaModalVisible(false);
                setSelectedSlika(null);
            }}
            onEdit={(editedSlika) => {
                handleConfirmEditSlika(editedSlika);
            }}
            />
        </div>
        )}

      {isModalVisible && (
        <div style={{ zIndex: 100 }} className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
          <EditPosaoForma
            selectedPosao={selectedPosao}
            onClose={() => {
              setIsModalVisible(false);
              setSelectedPosao(null);
            }}
            onEdit={(editedPosao) => {
              setPoslovi((prevPoslovi) =>
                prevPoslovi.map((posao) =>
                  posao._id === editedPosao._id ? editedPosao : posao
                )
              );
              setIsModalVisible(false);
              setSelectedPosao(null);
            }}
          />
        </div>
      )}

      {isDeleteSlikaModalVisible && (
        <div style={{ zIndex: 100 }} className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
          <div className='bg-white p-8 rounded-md'>
            <p className='text-gray-800 text-lg mb-4'>Da li ste sigurni da želite obrisati ovu sliku?</p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => {
                  setIsDeleteSlikaModalVisible(false);
                  setDeleteSlikaId(null);
                }}
                className='text-gray-800 px-4 py-2 bg-gray-300 rounded-md'
              >
                Otkaži
              </button>
              <button
                onClick={() => {
                  handleConfirmDeleteSlika();
                }}
                className='text-white px-4 py-2 bg-red-600 rounded-md'
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalVisible && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
          <div className='bg-white p-8 rounded-md'>
            <p className='text-gray-800 text-lg mb-4'>Da li ste sigurni da želite obrisati ovaj posao?</p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => {
                  setIsDeleteModalVisible(false);
                  setDeletePosaoId(null);
                }}
                className='text-gray-800 px-4 py-2 bg-gray-300 rounded-md'
              >
                Otkaži
              </button>
              <button
                onClick={() => {
                  handleConfirmDelete();
                }}
                className='text-white px-4 py-2 bg-red-600 rounded-md'
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex items-center p-6 md:p-24 gap-6 md:gap-24 justify-center flex-col'>
        <h1 className='text-3xl md:text-5xl text-white'>Admin Panel</h1>
            <div className='fixed top-4 right-4'>
            <button
            onClick={handleLogout}
            className='text-white px-4 py-2 bg-red-600 rounded-md hover:bg-red-700'
            >
            Odjavi se
            </button>
        </div>
        <div className='flex flex-col gap-4 min-w-0'>
          <h1 className='text-white text-xl md:text-3xl'>Poslovi:</h1>
          <DodajPosaoForma onDodaj={() => fetchData()} />

          {poslovi && poslovi.map((posao, key) => (
            <div key={key} className=' min-w-0 text-white mx-auto font-light bg-black py-2 px-4 grid grid-cols-3 lg:grid-cols-5 items-center gap-4 md:gap-2 w-full'>
              <div className='w-32 flex items-center h-8 overflow-hidden'>
                <img src={posao.slika} className='w-full h-full object-cover' alt={posao.naziv} />
              </div>
              <h1 className='text-blue-500 flex items-center gap-2 w-full overflow-hidden '>
                <span className='text-sm text-gray-200'>naziv: </span>{posao.naziv}
              </h1>
              <p className='text-left flex  min-w-0 items-center truncate gap-2 text-sm sm:text-base text-gray-200'>
                <span className='text-gray-200'>opis: </span>{posao.opis}
                </p>


              <h1 className='flex items-center col-span-2 lg:col-span-1  text-xs gap-2'>
                <span className='text-sm text-gray-200'>id: </span>{posao._id}
              </h1>
              <div className='flex flex-row items-center gap-4 md:gap-12'>
                <button onClick={() => handleEditPosao(posao)} className='text-black px-2 md:px-4 py-1 md:py-2 bg-white'>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={() => handleDeletePosao(posao._id)} className='text-white px-2 md:px-4 py-1 md:py-2 bg-red-600'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}

          <h1 className='text-white text-xl md:text-3xl'>Slike: </h1>
          <DodajSlikuForma onSlika={() => fetchData()}/>
          <div className='grid h-96 overflow-auto grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-12 border border-gray-800 rounded-lg'>
            {slike &&
              slike.map((slika, key) => (
                <div key={key} className='w-full h-64 relative overflow-hidden mb-6'>
                  <img src={slika.slikaURL} alt={slika.slikaAlt} className='w-full h-full object-cover' />
                  <div className='absolute flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-black/50'>
                    <h1 className='text-white text-xl md:text-2xl text-center w-48 wrap-text'>
                      {slika.posao !== '' ? slika.posao : 'Slika'}
                    </h1>
                  </div>
                  <div className="absolute bottom-2 right-2 flex flex-row items-center justify-center z-90 gap-2">
                    <button onClick={() => handleEditSlika(slika)} className='text-black px-2 md:px-4 py-1 md:py-2 bg-white'>
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button onClick={() => handleDeleteSlika(slika._id)} className='text-white px-2 md:px-4 py-1 md:py-2 bg-red-600'>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
