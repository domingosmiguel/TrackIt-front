import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Login from "./components/Login";
import Registration from "./components/Registration";
import LoggedPage from "./components/LoggedPage";
import { useState } from "react";

function App() {
    const [loginData, setLoginData] = useState();
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/cadastro" element={<Registration />} />
                <Route path="/:route" element={<LoggedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
