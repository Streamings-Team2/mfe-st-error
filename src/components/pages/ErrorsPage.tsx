import React from 'react';

interface ErrorPageProps {
  errorMessage: string;
  imageComponent?:  React.ReactNode;
  error:string; 
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage, imageComponent,error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-2">{error}</h1>
        <h1 className="text-2xl font-bold mb-2">¡Oops! Algo salió mal</h1>
      <img src="{imageComponent}" alt="" />  {imageComponent && <div className="mb-4 w-320 h-320">{imageComponent}</div>}
        <p className="text-gray-700 mb-4">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
