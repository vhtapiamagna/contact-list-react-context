import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ContactContext = createContext();

export const useContactContext = () => {
  return useContext(ContactContext);
};

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      const newContacts = [...state.contacts, action.payload];
      localStorage.setItem('contacts', JSON.stringify(newContacts));
      return { ...state, contacts: newContacts };
    case 'DELETE_CONTACT':
      const filteredContacts = state.contacts.filter((contact) => contact.id !== action.payload);
      localStorage.setItem('contacts', JSON.stringify(filteredContacts));
      return { ...state, contacts: filteredContacts };
    case 'UPDATE_CONTACT':
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return { ...state, contacts: updatedContacts };
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    dispatch({ type: 'LOAD_CONTACTS', payload: contacts });
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};


