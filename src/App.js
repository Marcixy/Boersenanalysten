// own component imports
import Article from './client/components/pages/article/Article';
import Articlelist from './client/components/pages/articlelist/Articlelist';
import Blog from './client/components/pages/blog/Blog';
import CreateArticle from './client/components/pages/createArticle/CreateArticle';
import Footer from './client/components/footer/Footer';
import ForgotPassword from './client/components/pages/forgotPassword/ForgotPassword';
import Help from './client/components/pages/help/Help';
import Homepage from './client/components/pages/homepage/Homepage';
import Navigationbar from './client/components/navigationbar/Navigationbar';
import Message from './client/components/pages/message/Message';
import Register from './client/components/pages/register/Register';
import Login from './client/components/pages/login/Login';
import LegalNotice from './client/components/pages/legalNotice/LegalNotice';
import PortfolioHistory from './client/components/pages/portfolioHistory/PortfolioHistory';
import PrivacyPolicy from './client/components/pages/privacyPolicy/PrivacyPolicy';
import ProfileSettings from './client/components/pages/settings/profileSettings/ProfileSettings';
import EmailSettings from './client/components/pages/settings/emailSettings/EmailSettings';
import PasswordSettings from './client/components/pages/settings/passwordSettings/PasswordSettings';
import DeleteAccount from './client/components/pages/settings/deleteAccount/DeleteAccount';
import TermsOfUse from './client/components/pages/termsOfUse/TermsOfUse';
import Userprofile from './client/components/pages/userprofile/Userprofile';
import Taglist from './client/components/pages/taglist/Taglist';
import CreateTag from './client/components/pages/createTag/CreateTag';
import ScrollToTop from './client/components/utils/scrollToTop/ScrollToTop';

// blog article imports
import Blogarticle210928 from './client/components/pages/blogarticle/Blogarticle210928';
import Blogarticle210929 from './client/components/pages/blogarticle/Blogarticle210929';

// third-party imports
import { Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navigationbar />
      <Route exact path="/" component={ Homepage } />
      <Route exact path="/blog" component={ Blog } />
      <Route exact path="/blogarticle210928" component={ Blogarticle210928 } />
      <Route exact path="/blogarticle210929" component={ Blogarticle210929 } />
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
      <Route exact path="/article/:articleid" component={ Article } />
      <Route exact path="/forgotPassword" component={ ForgotPassword } />
      <Route exact path="/portfolioHistory/:id" component={ PortfolioHistory } />
      <Route exact path="/profileSettings/:userid" component={ ProfileSettings } />
      <Route exact path="/emailSettings/:userid" component={ EmailSettings } />
      <Route exact path="/passwordSettings/:id" component={ PasswordSettings } />
      <Route exact path="/deleteAccount/:id" component={ DeleteAccount } />
      <Route exact path="/taglist" component={ Taglist } />
      <Route exact path="/createTag" component={ CreateTag } />
      <Footer />
    </div>
  );
}

export default App;