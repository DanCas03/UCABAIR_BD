import PropTypes from 'prop-types';

const UserLogo = ({ username, isConnected }) => {
    return (
        <div className="user-logo">
            {isConnected ? <img src="/images/user.png" alt="UserLogo" /> : <img src="/images/user-off.png" alt="UnkownLogo" />}
            <p>{isConnected ? username : <a href='/login'>Iniciar Sesion</a>}</p>
        </div>
    );
}
UserLogo.propTypes = {
    username: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
};

export default UserLogo;