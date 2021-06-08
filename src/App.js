// own component imports
import Article from './components/pages/article/Article';
import Articlelist from './components/pages/articlelist/Articlelist';
import CreateArticle from './components/pages/createArticle/CreateArticle';
import Footer from './components/footer/Footer';
import ForgotPassword from './components/pages/forgotPassword/ForgotPassword';
import Help from './components/pages/help/Help';
import Homepage from './components/pages/homepage/Homepage';
import Navigationbar from './components/navigationbar/Navigationbar';
import Message from './components/pages/message/Message';
import Settings from './components/pages/settings/Settings';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import LegalNotice from './components/footer/legalNotice/LegalNotice';
import PortfolioHistory from './components/pages/portfolioHistory/PortfolioHistory';
import PrivacyPolicy from './components/footer/privacyPolicy/PrivacyPolicy';
import TermsOfUse from './components/footer/termsOfUse/TermsOfUse';
import Userprofile from './components/pages/userprofile/Userprofile';

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
      <Route exact path="/userprofile/:id" component={ Userprofile } />
      <Route exact path="/articlelist" component={ Articlelist } />
      <Route exact path="/legalNotice" component={ LegalNotice } />
      <Route exact path="/privacyPolicy" component={ PrivacyPolicy } />
      <Route exact path="/termsOfUse" component={ TermsOfUse } />
      <Route exact path="/help" component={ Help } />
      <Route exact path="/message" component={ Message } />
      <Route exact path="/createArticle" component={ CreateArticle } />
      <Route exact path="/article/:id" component={ Article } />
      <Route exact path="/forgotPassword" component={ ForgotPassword } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/portfolioHistory" component={ PortfolioHistory } />
      <Footer />
    </div>
  );
}

export default App;