import { initializeApp } from "firebase/app";
import { getStorage, uploadString, getDownloadURL, deleteObject, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "medicapp-pacientes-fotos.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (folder, image) => {
    try {
        const storageRef = ref(storage, `${folder}/${image.name}`);
        const uploadTask = await uploadString(storageRef, image.file, "data_url");
        return getDownloadURL(uploadTask.ref);
    } catch (error) {
        console.error("upload firebase image error: ", error);
        return null;
    }
};

export const deleteImage = async (folder, id) => {
    try {
        const storageRef = ref(storage, `${folder}/${id}`);
        return await deleteObject(storageRef);
    } catch (error) {
        console.error("delete firebase image error: ", error);
        return null;
    }
};