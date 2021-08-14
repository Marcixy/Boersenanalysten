import axios from 'axios';

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

export async function getTaglist(currentPage) {
    const taglist = await axios.get(`/getTaglist`, {
        params: {
            currentPage: currentPage
        }
    }).catch((error) => {
        console.error("Taglist are not loaded", error);
        alert("Tagliste konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    });
    return taglist.data;
}

export async function getTagCount() {
    const tagCount = await axios.get('/getTagCount').catch((error) => {
        console.error("Tagcount are not loaded", error);
    });
    return tagCount.data;
}