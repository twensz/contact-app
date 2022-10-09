import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactApp from './components/ContactApp.js';
import { BrowserRouter } from 'react-router-dom';


import './styles/style.css';



const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContactApp />
  </BrowserRouter>
);