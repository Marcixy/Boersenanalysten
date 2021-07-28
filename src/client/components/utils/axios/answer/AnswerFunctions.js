import axios from 'axios';

export async function getAnswerCreatorNames(userId) {
    const answerCreatorNames = await axios.get(`/getAnswerCreatorNames`, {
        params: {
            id: userId
        }
    });
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
    });
}