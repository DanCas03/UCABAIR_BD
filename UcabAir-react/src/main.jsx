import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App.jsx'

import { BrowserRouter, Route, Routes } from "react-router-dom";







createRoot(document.getElementById('root')).render(<App />)


window.addEventListener("beforeunload", () => {
	// Tu código aquí
	console.log("El usuario está cerrando la página");
	// Si deseas mostrar un mensaje de confirmación antes de cerrar, descomenta la siguiente línea:
    BeforeUnloadEvent.preventDefault();
});