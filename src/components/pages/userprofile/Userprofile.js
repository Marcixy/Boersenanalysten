import './Userprofile.css';
import connectToMongoDB from '../../../server/mongoDB/Server';

function Userprofile() {
    return (
        <div className="userprofile-page">
            <h2>Profil</h2>
            <button onClick={() => connectToMongoDB()}>Verbinden zur MongoDB</button>
        </div>
    )
}

export default Userprofile;