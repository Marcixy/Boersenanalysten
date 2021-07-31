import axios from 'axios';
import firebase from 'firebase/app';

export async function getUserByFirebaseid() {
    const user = await axios.get(`/getUserByFirebaseid`, {
        params: {
            firebaseid: firebase.auth().currentUser.uid
        }
    }).catch((error) => {
        console.error("User are not loaded", error);
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