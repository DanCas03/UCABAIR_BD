import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './Pages/App.jsx'

import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />} />
			</Routes>
		</BrowserRouter>
	);
}





createRoot(document.getElementById('root')).render(<App />)


window.addEventListener("beforeunload", () => {
	// Tu código aquí
	console.log("El usuario está cerrando la página");
	// Si deseas mostrar un mensaje de confirmación antes de cerrar, descomenta la siguiente línea:
    BeforeUnloadEvent.preventDefault();
});