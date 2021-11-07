import React, { useState } from 'react';
import './App.css';
import { LoginForm } from "./app/LoginForm";
import { MainView } from "./app/MainView";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    const [token, setToken] = useState('')

    return (
        <>
            {token === '' && <LoginForm setToken={setToken}/>}
            {token !== '' && <MainView token={token} setToken={setToken}/>}
        </>
    );
}

export default App;
