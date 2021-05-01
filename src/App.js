// own component imports
import Articlelist from './components/pages/articlelist/Articlelist';
import Footer from './components/footer/Footer';
import Homepage from './components/pages/homepage/Homepage';
import Navigationbar from './components/navigationbar/Navigationbar';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';

// third-party imports
import { Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div>
      <Navigationbar />
      <Route exact path="/" component={ Homepage } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/articlelist" component={ Articlelist } />
      <Footer />
    </div>
  );
}

export default App;