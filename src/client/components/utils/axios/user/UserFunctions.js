import axios from 'axios';
import firebase from 'firebase/app';

export async function getUserByFirebaseid() {
    const user = await axios.get(`/getUserByFirebaseid`, {
        params: {
            firebaseid: firebase.auth().currentUser.uid
        }
    });
    return user.data;
}