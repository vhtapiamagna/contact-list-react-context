import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactProvider } from './Context/ContactContext';
import ContactList from './Components/ContactList';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';

function App() {
  return (
    <Router>
      <ContactProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/agregar" element={<AddContact />} />
            <Route path="/editar/:id" element={<EditContact />} />
          </Routes>
        </div>
      </ContactProvider>
    </Router>
  );
}

export default App;



