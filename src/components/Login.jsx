import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import trackItLogo from "../images/trackit.PNG";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    function handleForm(e) {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    function loginSuccessful({ data }) {
        console.log(data);
        navigate("/");
    }
    function handleButtonClick(e) {
        e.preventDefault();
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        axios
            .post(url, login)
            .then(loginSuccessful)
            .catch((error) => alert(error));
    }
    return (
        <Main>
            <LogoContainer src={trackItLogo} alt="logo" />
            <InputContainer>
                <StyledInput
                    name="email"
                    type="email"
                    value={login.email}
                    onChange={handleForm}
                    placeHolder="email"
                />
                <StyledInput
                    name="password"
                    type="password"
                    value={login.password}
                    onChange={handleForm}
                    placeHolder="senha"
                />
                <StyledButton type="submit" onClick={handleButtonClick}>
                    Entrar
                </StyledButton>
                <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se</StyledLink>
            </InputContainer>
        </Main>
    );
}
const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LogoContainer = styled.img`
    max-width: 250px;
`;
const InputContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 303px;
    width: 100%;
`;
const StyledLink = styled(Link)`
    text-align: center;
    color: var(--blue);
    cursor: pointer;
    margin-top: 25px;
`;
