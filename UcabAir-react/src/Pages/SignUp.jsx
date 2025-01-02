import React from 'react';
import  { useState ,useEffect } from 'react';
import Logo from '../Components/Logo';
import '../styles/SignUp.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { HandleSignup } from '../Api/ApiSignup';
import { regExpEmail, regExpPassword } from '../Utils/Regex';

export default function SignUp() {
    const { register, handleSubmit, formState: {errors}} = useForm();

    const [showErrorP, setShowErrorP] = useState(false);
    const [showErrorE, setShowErrorE] = React.useState(false);

	const [errorPMessage, setErrorPMessage] = React.useState("");
    const [errorEMessage, setErrorEMessage] = React.useState(false);

	const [showSuccessful, setShowSuccesful] = React.useState(false);
	const [successfulMessage,setSuccesfulMessage] = React.useState("");

	const regexHandlerEmail = new RegExp(regExpEmail);
	const regexHandlerPassword = new RegExp(regExpPassword);

	function errorEmail(email) {
		if(regexHandlerEmail.test(email)) { 
			setShowErrorE(false);

		}else{
            setShowErrorE(true)
            setErrorEMessage("El correo ingresado no es válido");
        }
	}
	function errorPassword(password) {
		if (regexHandlerPassword.test(password)) {
			setShowErrorP(false);
			setSuccesfulMessage("Contraseña válida");
			setShowSuccesful(true);
            return false
		}else{
			setErrorPMessage("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número");
			setShowErrorP(true);
            return true
		}
	}

    useEffect(() => {
        errors?.user && toast.error(errors.user.message);
        errors?.email && toast.error(errors.email.message);
        errors?.password && toast.error(errors.password.message);
        if(!errors?.password)
            errors?.passwordConfirm && toast.error(errors.passwordConfirm.message);
        errors?.name && toast.error(errors.name.message);
        errors?.lastName && toast.error(errors.lastName.message);
        errors?.address && toast.error(errors.address.message);
        errors?.phone && toast.error(errors.phone.message);
        errors?.pagWeb && toast.error(errors.pagWeb.message);
        errors?.cedula && toast.error(errors.cedula.message);
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
                    <h1>Crear Usuario</h1>
                    <h3>Proporciona la siguiente información</h3>
                </div>
                <form onSubmit={handleSubmit(
                    
                    async (data) => {
                        if(errorPassword(data.password)||errorEmail(data.email)){
                            if(errorEmail(data.email)){
                                toast.error('El correo no cumple con los requisitos');
                            }
                            if (errorPassword(data.password)){
                                toast.error('La contraseña no cumple con los requisitos');
                            }
                            return;
                        }else if(data.password !== data.passwordConfirm){
                            toast.error('Las contraseñas no coinciden');
                            return;
                        }else{
                            let response = await HandleSignup(data);
                            if(response === '404'){
                                toast.error('Ocurrio un error de conexión con el servidor'); 
                            }else{
                                if(response.message === 'username already exists'){
                                    toast.error('Ya existe un usuario con ese nombre');
                                }else if(response.message === 'success'){
                                    sessionStorage.setItem('user', data.user);
                                    toast.success('Su usuario ha sido creado exitosamente');
                                }else if(response.message === 'email already exists'){
                                    toast.error('Ya existe un usuario con ese correo');
                                }else if(response.message === 'client already exists'){
                                    toast.error('Ya existe un cliente con esa cedula, es posible que ya tenga una cuenta');
                                }
                            
                            }
                        }
                    }
                )}>
                    <input {...register("user", {required: 'Es necesario ingresar un usuario'})} placeholder="Usuario" />
                    {showErrorE && <div className="erroremail text-red-500">{errorEMessage}</div>}                      {/* Intento de implementar tailwindcss... se puede cambiar por hotoast */}
                    <input {...register("email", {required: 'Se requiere un correo electronico'})} placeholder='Correo Electronico' />
                    {showErrorP && <div className="errorpassword text-red-500">{errorPMessage}</div>}
            		{showSuccessful && <div className="color: green">{successfulMessage}</div>}
                    <input {...register("password", {required: 'Es necesario ingresar una contraseña'})} placeholder="Contraseña" />
                    <input {...register("passwordConfirm", {required: 'Es necesario que confirme su contraseña'})} placeholder="Confirmación de Contraseña" />
                    <input {...register("name", {required: 'Se requiere un nombre'})} placeholder='Nombre' />
                    <input {...register("lastName", {required: 'Se requiere un apellido'})} placeholder='Apellido' />
                    <input {...register("cedula", {required: 'Se requiere una cedula'})} placeholder='Cedula' />
                    <input {...register("address", {required: 'Se requiere una dirección'})} placeholder='Dirección' />
                    <input {...register("address2")} placeholder='Dirección 2' />
                    <input {...register("phone", {required: 'Se requiere un número de teléfono'})} placeholder='Número de Teléfono' />
                    <input {...register("pagWeb", {required: 'Es necesario ingresar una pagina web de referencia'})} placeholder='Pagina Web' />
                    <button type="submit">Crear Cuenta</button>
                </form>
                <div className="formato-contraseña">
                    <div className="formato-contraseña-header">Formato de contraseña</div>
                    <div className="formato-contraseña-text">
                        <ul>
                            <li>Al menos 8 caracteres</li>
                            <li>Al menos una letra mayúscula</li>
                            <li>Al menos una letra minúscula</li>
                            <li>Al menos un número</li>
                        </ul>
                    </div>
                </div>
                <div><p>Ya tienes Cuenta? <a href="/login">Inicia sesión</a></p></div>

            </div>
        </>
    );
}
