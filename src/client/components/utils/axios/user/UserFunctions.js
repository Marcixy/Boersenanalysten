import axios from 'axios';
import firebase from 'firebase/app';

export async function getUserById(userId) {
    const user = await axios.get('/getUserById', {
        params: {
            _id: userId
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
        console.error("User are not loaded with firebaseid", error);
        alert("Benutzerdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return user.data;
}

export async function getUserPortfolioArticles(userId) {
    const portfolioArticle = await axios.get(`/getUserPortfolioArticles`, {
        params: {
            _id: userId
        }
    }).catch((error) => {
        console.error("Portfolio Article are not loaded", error);
        alert("Portfolio Beiträge konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return portfolioArticle.data;
}

export async function getUserAnswers(userId) {
    const answers = await axios.get(`/getUserAnswers`, {
        params: {
            _id: userId
        }
    }).catch((error) => {
        console.error("Answers are not loaded", error);
        alert("Antworten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return answers.data;
}

export async function getUserArticles(userId, sortCriteria, currentPage) {
    const articles = await axios.get(`/getUserArticles/${sortCriteria}`, {
        params: {
            _id: userId,
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Articles are not loaded", error);
        alert("Beiträge konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return articles.data;
}

export async function getUserArticleCount(userId) {
    const userArticleCount = await axios.get('/getUserArticleCount', {
        params: {
            _id: userId,
        }
    }).catch((error) => {
        console.error("Article Count are not loaded", error);
    });
    return userArticleCount.data;
}

export async function getUserVotings(userId) {
    const votings = await axios.get(`/getUserVotings`, {
        params: {
            _id: userId
        }
    }).catch((error) => {
        console.error("Votings are not loaded", error);
        alert("Votings konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return votings.data;
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