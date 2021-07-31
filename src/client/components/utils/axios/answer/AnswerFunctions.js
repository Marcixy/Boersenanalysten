import axios from 'axios';

export async function getAnswerCreatorNames(userId) {
    const answerCreatorNames = await axios.get(`/getAnswerCreatorNames`, {
        params: {
            id: userId
        }
    }).catch((error) => {
        console.error("Answer Creator Names are not loaded", error);
        alert("Beitragsersteller konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });;
    return answerCreatorNames.data;
}

export async function createAnswer(articleId, content, creatorId) {
    await axios({
        url: `/createAnswer/${articleId}`,
        method: 'post',
        data: {
            content: content,
            creator: creatorId,
            articleid: articleId
        }
    }).catch((error) => {
        console.error("Create Answer failed", error);
        alert("Antwort konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.");
    });
}