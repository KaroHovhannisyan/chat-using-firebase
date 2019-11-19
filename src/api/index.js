import firebase from "../configs/firebase";
import {MESSAGES_COLLECTION} from "../configs/constants";
const db = firebase.firestore();

class FirebaseApi {
    static sendMessage(message){
        return db.collection(MESSAGES_COLLECTION).add({
            message,
            createdAt: new Date(),
            from: "",
            to: "*"
        })
    }

    static listenCollection(collectionName,cb){
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

}

export default FirebaseApi;
