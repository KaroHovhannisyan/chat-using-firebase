import firebase from "../configs/firebase";
import {MESSAGES_COLLECTION, USERS_COLLECTION} from "../configs/constants";
const db = firebase.firestore();
const storage = firebase.storage();


class FirebaseApi {
    static sendMessage(message, from, to){
        return db.collection(MESSAGES_COLLECTION).add({
            message,
            createdAt: new Date(),
            from: from.email,
            to: to || "*"
        })
    }

    static listenCollection(collectionName, cb){
        db.collection(collectionName)
            .orderBy("createdAt")
            .onSnapshot({
                includeMetadataChanges: true
            }, querySnapshot => {
                const data = [];
                querySnapshot.forEach(function(doc) {
                    data.push(doc.data());
                });
                cb(data)
            });
    }

    static uploadFile(file, cb){
        const storageRef = storage.ref("uploads");
        storageRef.put(file).then(data => cb(data))
    }

    static signUp(data){
        return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    }

    static signIn(data){
        return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    }
}

export default FirebaseApi;
