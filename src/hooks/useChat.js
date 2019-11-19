import React, {useEffect} from "react";
import firebase from "../configs/firebase";
import {MESSAGES_COLLECTION} from "../configs/constants";
import FirebaseApi from "../api";

// export const useChat2 = () => {
//     const [state, setState] = React.useState(() => {
//         const messages = db.collection(MESSAGES_COLLECTION).once(value);
//
//         return { messages } });
//     function onChange(data) {
//         const messages = []
//         messages.docs.forEach(d => messages.push(d.data()))
//         console.log(messages, "messages")
//         setState({ messages })
//     }
//     React.useEffect(() => {
//         // listen for auth state changes
//         const unsubscribe = FirebaseApi.listenCollection(MESSAGES_COLLECTION, onChange)
//         // unsubscribe to the listener when unmounting
//         return () => unsubscribe()
//     }, [])
//
//     return state
// }


export function useChat() {
    // initialize our default state
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    useEffect(
        () => {
            FirebaseApi.listenCollection(MESSAGES_COLLECTION, data => {
                setMessages(data);
                setLoading(false);
            })
        },
        []
    )

    return {
        error,
        loading,
        messages,
    }
}
