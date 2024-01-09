import React from 'react';
import { useContactContext } from '../Context/ContactContext';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContactList = () => {
  const { state, dispatch } = useContactContext();

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este contacto?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'DELETE_CONTACT', payload: id });
        Swal.fire(
          '¡Eliminado!',
          'El contacto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  return (
    <div className='container'>
      <h2>Lista de Contactos usando React & Context</h2>
      <ul className='datos'>
        {state.contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="contact-info">
              {contact.name}<br />
              {contact.email}<br />
              {contact.phone}<br />
              {contact.addres}<br />
            </div>
            <button onClick={() => handleDelete(contact.id)} className="delete-button">Borrar</button>
            <NavLink to={`/editar/${contact.id}`} className="edit-button">Editar</NavLink>
          </li>
        ))}
      </ul>
      <NavLink to="/agregar" className="btn">Agregar Contacto</NavLink>
    </div>
  );
};

export default ContactList;

