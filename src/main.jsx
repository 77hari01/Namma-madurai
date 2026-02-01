import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import EventWebsite from './new.jsx';
import NammaMaduraiSwag from './NammaMaduraiSwag.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NammaMaduraiSwag />
  </StrictMode>,
)
