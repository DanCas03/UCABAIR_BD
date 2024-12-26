import Logo from '../Components/Logo';
import '../styles/LogIn.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { HandleLogin } from '../Components/ApiLogin';


export default function LogIn() {
    const { register, handleSubmit, formState: {errors}} = useForm();
    errors?.usuario && toast.error(errors.usuario.message);
    errors?.contraseña && toast.error(errors.contraseña.message);
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
                            console.log(data);
                            console.log(response);
                        }
                    }
                )}>
                    <input {...register("user", {required: 'Es necesario ingresar un usuario'})} placeholder="Usuario" />
                    <input {...register("password", {required: 'Es necesario ingresar una contraseña'})} placeholder="Contraseña" />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </>
    );
}