import React, { useState } from 'react';
import { useContactContext } from '../Context/ContactContext';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddContact = () => {
  const { dispatch } = useContactContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addres, setAddres] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addresError, setAddresError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!name) {
      setNameError('El Nombre es requerido');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Correo electrónico inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone) {
      setPhoneError('El Teléfono es requerido');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!addres) {
      setAddresError('La Dirección es requerida');
      isValid = false;
    } else {
      setAddresError('');
    }

    if (isValid) {
      const newContact = {
        id: new Date().getTime(),
        name,
        email,
        phone,
        addres,
      };

      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      showSuccessNotification();
      navigate('/');
      setName('');
      setEmail('');
      setPhone('');
      setAddres('');
    }
  };

  const showSuccessNotification = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Bien hecho!',
      text: 'El contacto ha sido agregado exitosamente.',
    });
  };

  return (
    <div className='formContainer'>
      <h2>Agregar Contacto</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="error">{nameError}</p>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error">{emailError}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="error">{phoneError}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Dirección"
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
          />
          <p className="error">{addresError}</p>
        </div>
        <button type="submit" className='btn-contac'>Agregar Contacto</button>
      </form>
      <NavLink to="/" className="btn">Ir al Home</NavLink>
    </div>
  );
};

export default AddContact;


