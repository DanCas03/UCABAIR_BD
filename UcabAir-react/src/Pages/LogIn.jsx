import Logo from '../Components/Logo';
import '../styles/LogIn.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { HandleLogin } from '../Components/ApiLogin';


export default function LogIn() {
    const { register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        errors?.user && toast.error(errors.user.message);
        errors?.password && toast.error(errors.password.message);
    });

    return (
        <>
            <Toaster
				position="bottom-right"
				reverseOrder={false}
				/>
            <Logo />
            <div className="LogIn">
                <div>
                    <h1>Iniciar sesión</h1>
                    <p>Ingresa tus datos para iniciar sesión</p>
                </div>
                <form onSubmit={handleSubmit(
                    
                    async (data) => {
                        let response = await HandleLogin(data.user, data.password);
                        if(response === '404'){
                            toast.error('Ocurrio un error de conexión con el servidor'); 
                        }else{
                            if(response.message === 'user not found'){
                                toast.error('Usuario no encontrado');
                            }else if(response.message === 'success'){
                                sessionStorage.setItem('user', data.user);
                                toast.success('Inicio de sesión exitoso');
                            }else if(response.message === 'incorrect password'){
                                toast.error('Contraseña incorrecta');
                            }
                        }
                    }
                )}>
                    <input {...register("user", {required: 'Es necesario ingresar un nombre de usuario'})} placeholder="Nombre de Usuario" />
                    <input {...register("password", {required: 'Es necesario ingresar una contraseña'})} placeholder="Contraseña" />
                    <button type="submit">Iniciar sesión</button>
                </form>
                <div><p>No tienes Cuenta aún? <a href="/signup">Registrate</a></p></div>
            </div>
        </>
    );
}