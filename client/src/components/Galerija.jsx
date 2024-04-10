import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ugasiGaleriju } from "../actions/galerijaAction";
import axios from "axios";

const Galerija = () => {
  const otvori = useSelector((state) => state.isOpen);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [slike, setSlike] = useState([]);
  const [poslovi, setPoslovi] = useState([]);
  const [selectedPosao, setSelectedPosao] = useState("");
  const [selectedSlika, setSelectedSlika] = useState(null);

  useEffect(() => {
    if (filter) {
      setSelectedPosao(filter);
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://alpproteam.vercel.app/galerija"
        );
        setSlike(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPoslovi = async () => {
      try {
        const response = await axios.get("https://alpproteam.vercel.app/posao");
        setPoslovi(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (otvori === true) {
      document.body.style.overflow = "hidden";
    } else if (otvori === false) {
      document.body.style.overflow = "";
    }
    fetchData();
    fetchPoslovi();
  }, [otvori]);

  const filteredSlike = selectedPosao
    ? slike.filter((slika) => slika.posao === selectedPosao)
    : slike;

  const openSlikaModal = (slika) => {
    setSelectedSlika(slika);
    document.body.style.overflow = "hidden";
  };

  const closeSlikaModal = () => {
    setSelectedSlika(null);
    document.body.style.overflow = "";
  };

  const handleBgClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(ugasiGaleriju());
    }
  };

  return (
    <div
      onClick={handleBgClick}
      style={{ zIndex: 100 }}
      className={`${
        otvori ? "flex" : "hidden"
      } items-center justify-center fixed bottom-0 right-0 left-0 w-full top-0 h-screen  bg-black/40`}
    >
      <div className="bg-white flex relative flex-col gap-6 items-center justify-center rounded-xl h-[30rem] mt-0 md:my-40 mx-4 md:mx-40 p-12">
        <button
          className="absolute right-4 text-3xl text-gray-600 top-4"
          onClick={() => dispatch(ugasiGaleriju())}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <h1 className="text-4xl font-bold text-amber-500">Galerija</h1>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="filter" className="text-gray-600 font-semibold">
            Filtriraj
          </label>
          <select
            name="filter"
            className="px-4 py-2 focus:outline-none text-gray-500 border-gray-400 border text-md"
            value={selectedPosao}
            onChange={(e) => setSelectedPosao(e.target.value)}
          >
            <option value="">Svi poslovi</option>
            {poslovi &&
              poslovi.map((posao) => (
                <option key={posao.naziv} value={posao.naziv}>
                  {posao.naziv}
                </option>
              ))}
          </select>
        </div>
        <div className="gap-12 overflow-auto h-96 grid grid-cols-1 md:grid-cols-3 p-2">
          {filteredSlike.map((slika, key) => (
            <div
              className="w-72 h-72 md:w-48 cursor-pointer md:h-48 overflow-hidden border-gray-300 rounded-lg shadow-md shadow-black/30 border"
              key={key}
              onClick={() => openSlikaModal(slika)}
            >
              <img src={slika.slikaURL} alt={slika.slikaAlt} />
            </div>
          ))}
        </div>
      </div>
      {selectedSlika && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSlikaModal()
            }
          }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
        >
          <div className="relative">
            <div
              className="absolute top-4 right-4 text-white text-3xl md:text-5xl cursor-pointer"
              onClick={closeSlikaModal}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
            <img
              src={selectedSlika.slikaURL}
              alt={selectedSlika.slikaAlt}
              className="md:h-[35rem] h-full max-h-[35rem]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Galerija;
