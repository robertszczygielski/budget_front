import React, { useState } from 'react';
import './App.css';
import { LoginForm } from "./app/LoginForm";
import { AllAssets } from "./app/assets/AllAssets";
import { MainView } from "./app/MainView";
import 'bootstrap/dist/css/bootstrap.min.css';

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
