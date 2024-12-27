import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './Pages/App.jsx'
import LogIn from './Pages/LogIn.jsx'
import SignUp from './Pages/SignUp.jsx'

import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />

			</Routes>
		</BrowserRouter>
	);
}





createRoot(document.getElementById('root')).render(<App />)


window.addEventListener("beforeunload", () => { //no se como funciona pero algo debe hacer
	// Tu código aquí
	console.log("El usuario está cerrando la página");
	// Si deseas mostrar un mensaje de confirmación antes de cerrar, descomenta la siguiente línea:
    BeforeUnloadEvent.preventDefault();
});