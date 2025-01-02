import UserContainer from "./UserContainer";
import PropTypes from 'prop-types';

MultipleUsersContainer.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        cedula: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        rol: PropTypes.string.isRequired
    })).isRequired
};

// Componente que contiene varios UserContainer segun la cantidad de usuarios que se le pasen

export default function MultipleUsersContainer({users}) {
    return (
        <div className="multiple-users-container">
            {users.map((user) => {
                return <UserContainer key={user.username} username={user.username} cedula={user.cedula} email={user.email} name={user.name} rol={user.rol}/>
            })}
        </div>
    );
}