import React from 'react'
import ErrorPage from './ErrorsPage';
// import UnavailableImage from '../../assets/503.svg';
import '../../index.scss';
const Unavailable = () => {
	const hasError = true;
	const errorMessage = 'El servidor no puede manejar la solicitud en ese momento..';
	const errorType = '503';
  
	return (
	  <div>
		{hasError ? (
		  <ErrorPage
			errorMessage={errorMessage}
			// imageComponent={<UnavailableImage/>  }
			error={errorType}
		  />
		) : (
		  <div className="p-6">
			<h1 className="text-3xl font-bold">Bienvenido a la aplicación</h1>
		  </div>
		)}
	  </div>
	);
  };

export default Unavailable
