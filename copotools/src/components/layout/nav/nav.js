import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Nav = () => {
    const location = useLocation()
    console.log(location);
    return (
    <header className="window-header">
    <nav className="navigation">
        <div className="navigation-top">
        
            <Link to="/" className={`navigation-item ${location.pathname === '/' ? 'active' : ''}`}>
                <i class="bi bi-house"></i>
                <span className="navigation-item-title">Home</span>
            </Link>

        </div>
        <div className="navigation-bottom">
            <Link to="/settings" className={`navigation-item ${location.pathname.includes('/settings') ? 'active' : ''}`}>
                <i class="bi bi-gear"></i>
                <span className="navigation-item-title">Settings</span>
            </Link>
            <Link to="/about" className={`navigation-item ${location.pathname.includes('/about') ? 'active' : ''}`}>
                <i class="bi bi-question-diamond"></i>
                <span className="navigation-item-title">About</span>
            </Link>
        </div>
    </nav>
</header>);
}

export default Nav;