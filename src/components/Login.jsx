import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Div100vh from "react-div-100vh";

import trackItLogo from "../images/trackit.PNG";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

export default function Login({ loginData, setLoginData }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    if (loginData !== null) {
        navigate("/habitos");
    }

    function handleForm(e) {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    function successfulLogin({ data }) {
        const { name, image, token, id, email } = data;
        const newLoginData = { name, image, token, id, email };
        setLoginData(newLoginData);
        const serializedNewLoginData = JSON.stringify(newLoginData);
        localStorage.setItem("loginData", serializedNewLoginData);
        navigate("/hoje");
    }
    function failedLogin(error) {
        alert(error);
        setLoading(false);
    }
    function handleButtonClick(e) {
        e.preventDefault();
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        setLoading(true);
        axios.post(url, login).then(successfulLogin).catch(failedLogin);
    }
    return (
        <Main>
            <LogoContainer src={trackItLogo} alt="logo" />
            <InputContainer>
                <StyledInput
                    name="email"
                    disabled={loading}
                    type="email"
                    value={login.email}
                    onChange={handleForm}
                    placeHolder="email"
                />
                <StyledInput
                    name="password"
                    disabled={loading}
                    type="password"
                    value={login.password}
                    onChange={handleForm}
                    placeHolder="senha"
                />

                <StyledButton loading={loading} type="submit" onClick={handleButtonClick}>
                    Entrar
                </StyledButton>
                <StyledLink disabled={loading} to="/cadastro">
                    Não tem uma conta? Cadastre-se
                </StyledLink>
            </InputContainer>
        </Main>
    );
}
const Main = styled(Div100vh)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const LogoContainer = styled.img`
    max-width: 250px;
    margin-bottom: 45px;
`;
const InputContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 303px;
    width: 100%;
`;
const StyledLink = styled(Link)`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    text-align: center;
    color: var(--blue);
    cursor: pointer;
    margin-top: 25px;

    font-size: 13.976px;
    line-height: 17px;
`;
