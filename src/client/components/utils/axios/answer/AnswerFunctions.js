import axios from 'axios';

export async function getAnswerById(articleid, answerid) {
    const answer = await axios.get(`/getAnswerById`, {
        params: {
            articleid: articleid,
            answerid: answerid
        }
    }).catch((error) => {
        console.error("Answerdata are not loaded", error);
        alert("Antwort konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    console.log("answer?.data: " + answer);
    return answer?.data;
}

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

export async function updateAnswerVoting(articleVoting, articleid, voterid, answerid) {
    const answerVotingResponse = await axios({
        url: `/updateAnswerVoting/${articleid}`,
        method: 'post',
        data: {
            voting: articleVoting,
            voterid: voterid,
            answerid: answerid
        }
    }).catch((error) => {
        console.error("Answer Voting could not be updated", error);
        alert("Antworten Voting konnte nicht geupdatet werden. Bitte versuchen Sie es später erneut.");
    });
    console.log("answerVotingResponse: " + answerVotingResponse);
    return answerVotingResponse.data;
}