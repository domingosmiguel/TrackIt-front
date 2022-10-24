import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
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
        navigate("/hoje");
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
        alert(error.response.data.message);
        setLoading(false);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        setLoading(true);
        axios.post(url, login).then(successfulLogin).catch(failedLogin);
    }
    return (
        <Main>
            <LogoContainer src={trackItLogo} alt="logo" />
            <InputContainer onSubmit={handleFormSubmit}>
                <StyledInput
                    identifier="input-email"
                    name="email"
                    disabled={loading}
                    type="email"
                    value={login.email}
                    onChange={handleForm}
                    placeHolder="email"
                />
                <StyledInput
                    identifier="input-password"
                    name="password"
                    disabled={loading}
                    type="password"
                    value={login.password}
                    onChange={handleForm}
                    placeHolder="senha"
                />

                <StyledButton identifier="login-btn" loading={loading} type="submit">
                    Entrar
                </StyledButton>
                <StyledLink identifier="sign-up-action" disabled={loading} to="/cadastro">
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
const DisabledLink = css`
    pointer-events: none;
    opacity: 0.7;
`;
const StyledLink = styled(Link)`
    ${({ disabled }) => disabled && DisabledLink};
    text-align: center;
    color: var(--blue);
    cursor: pointer;
    margin-top: 25px;

    font-size: 13.976px;
    line-height: 17px;

    &:hover {
        transform: scale(1.02);
    }
`;
