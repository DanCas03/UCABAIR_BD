import UserLogo from "./UserLogo";
import Logo from "./Logo";

export default function TopBar() {
    const isConnected = sessionStorage.getItem('user') !== null;
    const username = isConnected ? sessionStorage.getItem('user') : 'Desconectado';
    return (
        <div className="top-bar">
            <Logo />
            <UserLogo username={username} isConnected={isConnected} />
        </div>
    );
}