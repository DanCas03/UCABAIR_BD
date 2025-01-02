import PropTypes from 'prop-types';
import { getRoles } from '../Api/ApiRoles';
import { useState, useEffect } from 'react';
import Button from "../Components/referencias/Button";
import { guardarRol } from '../Api/ApiRoles';
import toast from 'react-hot-toast';


// Componente creado para contener la informacion de un unico usuario usuario

export default function UserContainer({username, cedula, email, name, rol}) {
    const [roles, setRoles] = useState();
    const [newRol, setNewRol] = useState(rol);

    useEffect(() => {
        (async () => {
            if (roles) {
                return;
            }
            setRoles(await getRoles());
        })();
    });

    const handleRolChange = async (newRol) => {
        const response = await guardarRol(newRol, username);
        if (response === 'success'){
            toast.success('Rol actualizado con éxito');
        }else{
            toast.error('Error al actualizar rol');
            console.log(response);
        }
    }
    return (

        <div className="user-container">
            <div className="user-container__user">
                <p>{username}</p>
           </div>
            <div className="user-container__cedula">
                <p>{cedula}</p>
            </div>
            <div className="user-container__email">
                <p>{email}</p>
            </div>
            <div className="user-container__name">
                <p>{name}</p>
            </div>
            <div className="user-container__rol">
                <select name="user-rol" id="user-rol" defaultValue={rol} onChange={(e) => {setNewRol(e.target.value)}}>
                    {roles.map((rol) => {
                        return <option key={rol} value={rol}>{rol}</option>
                    })}
                </select>
            </div>
            <div className='user-container__save'>
                <Button buttonText="Guardar" onClickFunction={() => {handleRolChange(newRol)}}/>
            </div>
        </div>
    );
}

UserContainer.propTypes = {
    username: PropTypes.string.isRequired,
    cedula: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    rol: PropTypes.string
}