import axios from 'axios';
import firebase from 'firebase/app';

export async function getUserById(userid) {
    const user = await axios.get('/getUserById', {
        params: {
            _id: userid
        }
    }).catch((error) => {
        console.error("User are not loaded with id", error);
        alert("Benutzerdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return user.data;
}

export async function getUserByFirebaseid() {
    const user = await axios.get(`/getUserByFirebaseid`, {
        params: {
            firebaseid: firebase.auth().currentUser.uid
        }
    }).catch((error) => {
        console.error("User are not loaded with firebaseid. ", error);
        alert("Benutzerdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return user.data;
}

export async function getUserPortfolioArticles(userid) {
    const portfolioArticle = await axios.get(`/getUserPortfolioArticles`, {
        params: {
            _id: userid
        }
    }).catch((error) => {
        console.error("Portfolio Article are not loaded", error);
        alert("Portfolio Beiträge konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return portfolioArticle.data;
}

export async function getUserAnswers(userid, sortCriteria, currentPage) {
    const answers = await axios.get(`/getUserAnswers/${sortCriteria}`, {
        params: {
            _id: userid,
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Answers are not loaded", error);
        alert("Antworten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return answers.data;
}

export async function getUserAnswerCount(userid) {
    const userAnswerCount = await axios.get('/getUserAnswerCount', {
        params: {
            _id: userid,
        }
    }).catch((error) => {
        console.error("Answer Count are not loaded", error);
    });
    return userAnswerCount.data;
}

export async function getUserArticles(userid, sortCriteria, currentPage) {
    const articles = await axios.get(`/getUserArticles/${sortCriteria}`, {
        params: {
            _id: userid,
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Articles are not loaded", error);
        alert("Beiträge konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return articles.data;
}

export async function getUserArticleCount(userid) {
    const userArticleCount = await axios.get('/getUserArticleCount', {
        params: {
            _id: userid
        }
    }).catch((error) => {
        console.error("Article Count are not loaded", error);
    });
    return userArticleCount.data;
}

export async function getUserVotings(userid, currentPage, votingType) {
    const votings = await axios.get(`/getUserVotings`, {
        params: {
            _id: userid,
            currentPage: currentPage,
            votingType: votingType
        }
    }).catch((error) => {
        console.error("Votings are not loaded", error);
        alert("Votings konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return votings.data;
}

export async function isArticleVotedFromUser(userid, articleid) {
    const isVotedFromUser = await axios.get(`/isArticleVotedFromUser`, {
        params: {
            userid: userid,
            articleid: articleid
        }
    }).catch((error) => {
        console.error("Is Article upvoted from user could not be loaded.", error);
    });
    return isVotedFromUser.data;
}

export async function isAnswerVotedFromUser(userid, articleid, answerid) {
    const isVotedFromUser = await axios.get(`/isAnswerVotedFromUser`, {
        params: {
            userid: userid,
            articleid: articleid,
            answerid: answerid
        }
    }).catch((error) => {
        console.error("Is Answer voted from user could not be loaded.", error);
    });
    return isVotedFromUser.data;
}

export async function getUserVotingCount(userid, votingType) {
    const userVotingCount = await axios.get('/getUserVotingCount', {
        params: {
            _id: userid,
            votingType: votingType
        }
    }).catch((error) => {
        console.error(`{$votingType} Count are not loaded`, error);
    });
    return userVotingCount.data;
}

export async function registerUser(email, username) {
    await axios({
        url: '/registerUser',
        method: 'post',
        data: {
            firebaseid: firebase.auth().currentUser.uid,
            email: email,
            username: username
        }
    }).catch((error) => {
        console.error("Create User failed", error);
        alert("Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.");
    });
}

export async function updateProfile(userid, username, aboutMe) {
    await axios({
        url: '/updateProfile',
        method: 'post',
        data: {
            userid: userid,
            username: username,
            aboutMe: aboutMe
        }
    }).catch((error) => {
        console.error("Update profile failed. ", error);
        alert("Profil konnte nicht aktualisiert werden.");
    });
}

export async function updateEmail(userid, email) {
    await axios({
        url: '/updateEmail',
        method: 'post',
        data: {
            userid: userid,
            email: email
        }
    }).catch((error) => {
        console.error("Update email failed. ", error);
        alert("Email konnte nicht aktualisiert werden.");
    });
}

export async function updateShareCounter(incValue, userid) {
    await axios({
        url: '/updateShareCounter',
        method: 'post',
        data: {
            userid: userid,
            incValue: incValue,
        }
    }).catch((error) => {
        console.error("Update share counter failed. ", error);
        alert("Aktienanteile konnten nicht aktualisiert werden.");
    });
}