import axios from 'axios';

export async function getArticleById(articleId) {
    const article = await axios.get(`/getArticleById`, {
        params: {
            articleid: articleId
        }
    });
    return article.data;
}

export async function getArticleCreatorNames(sortCriteria) {
    return (await axios.get(`/getArticleCreatorNames/${sortCriteria}`)).data;
}

export async function getArticlelist(sortCriteria, currentPage) {
    const articlelist = await axios.get(`/getArticlelist/${sortCriteria}`, {
        params: {
            currentPage: currentPage
        }
    });
    return articlelist.data;
}

export async function getArticleCount() {
    return (await axios.get('/getArticleCount')).data;
}