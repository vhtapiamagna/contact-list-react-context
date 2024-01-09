import React, { useState, useEffect } from 'react';
import { useContactContext } from '../Context/ContactContext';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditContact = ({ onCancel }) => {
  const { state, dispatch } = useContactContext();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addres, setAddres] = useState('');

  useEffect(() => {
    const contact = state.contacts.find((contact) => contact.id === parseInt(id));

    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setAddres(contact.addres);
    }
  }, [state.contacts, id]);

  const handleUpdate = () => {
    const updatedContact = {
      id: parseInt(id),
      name,
      email,
      phone,
      addres,
    };

    dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
    showSuccessNotification();
    onCancel();
  };

  const showSuccessNotification = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Bien hecho!',
      text: 'El contacto ha sido actualizado exitosamente.',
    });
  };

  return (
    <div className='edit-container'>
      <div className='edit'>
        <h2>Editar Contacto</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
          />
          <NavLink to="/">
            <button onClick={handleUpdate}>Actualizar Contacto</button>
            <button onClick={onCancel}>Cancelar</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
