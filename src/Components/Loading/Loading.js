import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Loading.css'

const Loading = () => {
  return (
    <div className="loader">

      <ClipLoader color="beige" loading={true} size={150} />
      <h2 className="mensaje">Se está cargando, por favor espera...</h2>
    </div>
  );
};

export default Loading;


