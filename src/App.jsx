import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import GlobalStyles from "./GlobalStyles";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/cadastro" element={<Registration />} exact />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
