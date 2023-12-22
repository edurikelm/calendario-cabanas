import { useState } from "react";


export const useForm = (initialState) => {

  const [error, setError] = useState('');

  const [dataInput, setDataInput] = useState({
    title: '',
    start: '',
    end: '',
    cabana: '',
    cantPersonas: 0,
    celular: '',
    ubicacion: '',
    valorNoche: '',
    pago: false,
    cantDias: 0,
    descuento: false,
    valorTotal: 0,
  });

  const handleInputChange = (e) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const resetInput = () => {
    setDataInput(initialState);
  };

  return {error, setError, handleInputChange, resetInput, setDataInput, dataInput}

}