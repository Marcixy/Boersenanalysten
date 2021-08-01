import axios from 'axios';

export async function getTaglist() {
    return (await axios.get(`/getTaglist`)).data;
}

export async function createTag(tagname, tagDescription, userId) {
    await axios({
        url: '/createTag',
        method: 'post',
        data: {
            tagname: tagname,
            creatorId: userId,
            description: tagDescription,
            status: 'In Prüfung'
        }
    }).catch((error) => {
        console.error("Create Tag failed", error);
        alert("Tag konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.");
    });
}