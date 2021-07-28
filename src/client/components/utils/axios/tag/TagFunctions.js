import axios from 'axios';

export async function getTaglist() {
    return (await axios.get(`/getTaglist`)).data;
}

export async function createTag(tagname, userId) {
    await axios({
        url: '/createTag',
        method: 'post',
        data: {
            tagname: tagname,
            creatorId: userId,
            description: 'TODO',
            status: 'In Prüfung'
        }
    });
}