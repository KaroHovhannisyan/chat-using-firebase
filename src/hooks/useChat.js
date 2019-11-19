import React from "react";
import firebase from "../configs/firebase"
import

export const useMessages = () => {
    const [state, setState] = React.useState(() => {
        const messages = firebase.auth().currentUser;
        return { initializing: !user, user } });
    function onChange(messages) {
        setState({ messages })
    }
    React.useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
    }, [])

    return state
}
