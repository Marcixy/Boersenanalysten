import axios from 'axios';

export async function getTaglist() {
    const response = await axios.get(`/getTaglist/`);
    //const data = promise.then((tagListResponse) => tagListResponse.data);
    console.log(response);
    return response.data;
}