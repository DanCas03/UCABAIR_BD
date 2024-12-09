import Logo from '../Components/Logo';
import '../styles/LogIn.css';

export default function LogIn() {
    return (
        <>
            <Logo />
            <div className="LogIn">
                <div>
                    <h1>Iniciar sesión</h1>
                    <p>Ingresa tus datos para iniciar sesión</p>
                </div>
                <form>
                    <input type="email" placeholder="Correo" />
                    <input type="password" placeholder="Contraseña" />
                    <button>Iniciar sesión</button>
                </form>
            </div>
        </>
    );
}