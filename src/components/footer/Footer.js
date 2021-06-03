import './Footer.css';

// third-party imports
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <ul>
                <Link to="/privacyPolicy">
                    <li>Datenschutzrichtlinien</li>
                </Link>
                <Link to="/legalNotice">
                    <li>Impressum</li>
                </Link>
                <Link to="/termsOfUse">
                    <li>Nutzungsbedingungen</li>
                </Link>
            </ul>
            <p>&copy; Copyright by Börsenanalysten {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;