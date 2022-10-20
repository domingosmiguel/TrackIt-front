import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Login from "./components/Login";
import Registration from "./components/Registration";
import LoggedPage from "./components/LoggedPage";
import { useState, useEffect } from "react";
import { LoginProvider } from "./components/LoginContext";

function App() {
    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        const serializedOldLoginData = localStorage.getItem("loginData");
        if (serializedOldLoginData !== null) {
            const oldLoginData = JSON.parse(serializedOldLoginData);
            setLoginData(oldLoginData);
        }
    }, []);
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route
                    path="/"
                    element={<Login loginData={loginData} setLoginData={setLoginData} />}
                    exact
                />
                <Route path="/cadastro" element={<Registration />} />
                <Route
                    path="/:route"
                    element={
                        <LoginProvider value={{ loginData }}>
                            <LoggedPage loginData={loginData} />
                        </LoginProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
