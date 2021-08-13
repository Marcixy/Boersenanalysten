import axios from 'axios';

export async function getArticleById(articleId) {
    const article = await axios.get(`/getArticleById`, {
        params: {
            articleid: articleId
        }
    }).catch((error) => {
        console.error("Articledata are not loaded", error);
        alert("Beitrag konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return article.data;
}

export async function getArticleCreatorNames(sortCriteria, currentPage) {
    const articleCreatorNames = await axios.get(`/getArticleCreatorNames/${sortCriteria}`, {
        params: {
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Article Creator Names are not loaded", error);
        alert("Beitragsersteller konnten nicht geladen werden.");
    });
    return articleCreatorNames.data;
}

export async function getArticlelist(sortCriteria, currentPage) {
    const articlelist = await axios.get(`/getArticlelist/${sortCriteria}`, {
        params: {
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Articlelist are not loaded", error);
        alert("Beitragsliste konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return articlelist.data;
}

export async function getArticleCount() {
    return (await axios.get('/getArticleCount')).data;
}

export async function createArticle(title, content, tags, creatorId, articleType) {
    const newArticle = await axios({
        url: '/createArticle',
        method: 'post',
        data: {
            title: title,
            content: content,
            tags: tags,
            creator: creatorId,
            articleType: articleType
        }
    }).catch((error) => {
        console.error("Create Article failed", error);
        alert("Beitrag konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.");
    });
    return newArticle.data;
}