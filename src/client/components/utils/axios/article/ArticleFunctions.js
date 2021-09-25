import axios from 'axios';

export async function getArticleById(articleid, currentPage = 0) {
    const article = await axios.get(`/getArticleById`, {
        params: {
            articleid: articleid,
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Articledata are not loaded", error);
        alert("Beitrag konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return article?.data;
}

export async function getArticleCreatorNames(sortCriteria, currentPage, titleFilter = "", articleTypeFilter = "", tagFilter = []) {
    const articleCreatorNames = await axios.get(`/getArticleCreatorNames/${sortCriteria}`, {
        params: {
            currentPage: currentPage,
            titleFilter: titleFilter,
            articleTypeFilter: articleTypeFilter,
            tagFilter: tagFilter
        }
    }).catch((error) => {
        console.error("Article Creator Names are not loaded", error);
        alert("Beitragsersteller konnten nicht geladen werden.");
    });
    return articleCreatorNames?.data;
}

export async function getArticlelist(sortCriteria, currentPage, titleFilter = "", articleTypeFilter = "", tagFilter = []) {
    const articlelist = await axios.get(`/getArticlelist/${sortCriteria}`, {
        params: {
            currentPage: currentPage,
            titleFilter: titleFilter,
            articleTypeFilter: articleTypeFilter,
            tagFilter: tagFilter
        }
    }).catch((error) => {
        console.error("Articlelist are not loaded", error);
        alert("Beitragsliste konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return articlelist?.data;
}

export async function getArticleCount(titleFilter = "", articleTypeFilter = "", tagFilter = []) {
    const articleCount = await axios.get(`/getArticleCount`, {
        params: {
            titleFilter: titleFilter,
            articleTypeFilter: articleTypeFilter,
            tagFilter: tagFilter
        }
    }).catch((error) => {
        console.error("Article count are not loaded", error);
        alert("Beitragsanzahl konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return articleCount?.data;
}

export async function createArticle(title, content, tags, creatorid, articleType) {
    const newArticle = await axios({
        url: '/createArticle',
        method: 'post',
        data: {
            title: title,
            content: content,
            tags: tags,
            creator: creatorid,
            articleType: articleType
        }
    }).catch((error) => {
        console.error("Create Article failed", error);
        alert("Beitrag konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.");
    });
    return newArticle.data;
}

export async function updateArticleVoting(articleVoting, articleid, voterid) {
    const articleVotingResponse = await axios({
        url: `/updateArticleVoting/${articleid}`,
        method: 'post',
        data: {
            voting: articleVoting,
            voterid: voterid
        }
    }).catch((error) => {
        console.error("Article Voting could not be updated", error);
        alert("Beitrags Voting konnte nicht geupdatet werden. Bitte versuchen Sie es später erneut.");
    });
    return articleVotingResponse.data;
}