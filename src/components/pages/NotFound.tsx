import React from 'react'
import ErrorPage from './ErrorsPage';
import NotFoundImage from '../../assets/404.svg';
const NotFound = () => {
	const hasError = true;
	const errorMessage = 'No se pudo cargar la información. Por favor, inténtalo de nuevo.';
	const errorType = '404';
  
	return (
	  <div>
		{hasError ? (
		  <ErrorPage
			errorMessage={errorMessage}
			imageComponent={<NotFoundImage/>  }
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

export default NotFound
