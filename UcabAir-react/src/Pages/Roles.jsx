import TopBar from "../Components/TopBar";
import { useEffect, useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import { getUsers } from "../Api/ApiRoles";
import MultipleUsersContainer from "../Components/MultipleUsersContainer";
import Button from "../Components/referencias/Button";

export default function Roles() {
    const [users, setUsers] = useState();
    const [indexUser, setIndexUser] = useState(0);
    toast.loading('Cargando usuarios');
    useEffect(() => {
        (async () => {
            if (users) {
                return;
            }
            setUsers(await getUsers());
        })();
    });
    return(
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <aside><TopBar /></aside>
            <div>
                <h1>Usuarios</h1>
                <p>Selecciona para cambiar el rol</p>
            </div>
            <div className="fila-titulos">
                <div className="titulo-username">Nombre Usuario</div>
                <div className="titulo-cedula">Cedula o Rif</div>
                <div className="titulo-email">Email</div>
                <div className="titulo-name">Nombre</div>
                <div className="titulo-rol">Rol</div>
            </div>
            <MultipleUsersContainer users={users.slice(indexUser, indexUser+10)}/>
            <div className="botones-paginacion">
                <Button buttonText="Inicio" onClickFunction={() => setIndexUser(0)}/>
                <Button buttonText="Anterior" onClickFunction={() => {if(indexUser>0) setIndexUser(indexUser-10)}}/>
                <Button buttonText="Siguiente" onClickFunction={() => {if(indexUser<users.length-10) setIndexUser(indexUser+10)}}/>
                <Button buttonText="Final" onClickFunction={() => setIndexUser(users.length-10)}/>
            </div>
            
        </>
    );
}