import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <ul>
                <li>Impressum</li>
                <li>Datenschutzrichtlinien</li>
                <li>Nutzungsbedingungen</li>
            </ul>
            <p>&copy; Copyright by Börsenanalysten {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;