import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "../src/components/Chat"
import AuthModal from "./components/AuthModal";
import MainContext from "./hooks/mainContext";
import {useAuth} from "./hooks/useAuth";


function App() {

  const { initializing, user } = useAuth();
    if (initializing) {
        return <div>Loading</div>
    }
  return (
   <MainContext.Provider value={{ user }}>
        <Chat/>
       {!user && <AuthModal/>}
   </MainContext.Provider>
  );
}

export default App;
