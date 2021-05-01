import './Homepage.css';

// material-ui imports
import { Button } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

// image imports
import BackgroundImg from '../../../assets/images/homepage-background.jpg';
import financeCommunityImg from '../../../assets/images/finance-community.svg';
import questionImg from '../../../assets/images/questions.svg';
import scoreImg from '../../../assets/images/score.svg';

let backgroundImage = {
    backgroundImage: `url(${ BackgroundImg })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
}

function Homepage() {
    return (
        <div className="homepage">
            <div className="overview">
                <section style={ backgroundImage }>
                    <h2>Börsenanalysten</h2>
                    <h3>Von Investoren für Investoren</h3>
                </section>
            </div>
            <div className="features">
                <div className="feature-1">
                    <img src={financeCommunityImg} alt="Finanz Community" />
                    <h3>Finanz Community</h3>
                    <p>Tausche dich mit anderen aus der Finanz-Community aus.</p>
                </div>
                <div className="feature-2">
                    <img src={questionImg} alt="Fragen und Antworten" />
                    <h3>Fragen & Antworten</h3>
                    <p>
                    Du hast Fragen zu Finanzen, Vermögensaufbau, Börse, Aktien, ... .
                    Dann stelle deine Frage im Forum oder helfe anderen mit deinen Antworten.
                    </p>
                </div>
                <div className="feature-3">
                    <img src={scoreImg} alt="Punkte sammeln" />
                    <h3>Punkte sammeln</h3>
                    <p>
                    Wenn andere Mitglieder deine Fragen oder Antworten hilfreich finden bekommst du Punkte
                    du selbst kannst anderen Mitglieder auch Punkte vergeben für gute Beiträge.
                    </p>
                </div>
            </div>
            <div className="finance-community">
                <h2>Werde Teil der Finanz Community.</h2>
                <div className="finance-community-buttons">
                    <Link to="/login">
                        <Button variant="contained" color="primary" size="large">Login</Button>
                    </Link>
                    <Link to='/register'>
                        <Button variant="contained" color="primary" size="large">Registrieren</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage;