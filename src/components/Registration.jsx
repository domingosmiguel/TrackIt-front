import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Div100vh from "react-div-100vh";

import trackItLogo from "../images/trackit.PNG";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

export default function Registration() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState({
        email: "",
        name: "",
        image: "",
        password: "",
    });

    function handleForm(e) {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }
    function failedRegistration(error) {
        alert(error.response.data.message);
        setLoading(false);
    }
    function handleButtonClick(e) {
        e.preventDefault();
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        setLoading(true);
        axios
            .post(url, register)
            .then(() => navigate("/"))
            .catch(failedRegistration);
    }
    return (
        <Main>
            <LogoContainer src={trackItLogo} alt="logo" />
            <InputContainer>
                <StyledInput
                    name="email"
                    disabled={loading}
                    type="email"
                    value={register.email}
                    onChange={handleForm}
                    placeHolder="email"
                />
                <StyledInput
                    name="password"
                    disabled={loading}
                    type="password"
                    value={register.password}
                    onChange={handleForm}
                    placeHolder="senha"
                />
                <StyledInput
                    name="name"
                    disabled={loading}
                    type="text"
                    value={register.name}
                    onChange={handleForm}
                    placeHolder="nome"
                />
                <StyledInput
                    name="image"
                    disabled={loading}
                    type="url"
                    value={register.image}
                    onChange={handleForm}
                    placeHolder="foto"
                />
                <StyledButton loading={loading} type="submit" onClick={handleButtonClick}>
                    Cadastrar
                </StyledButton>
                <StyledLink disabled={loading} to="/">
                    Já tem uma conta? Faça login!
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

    height: 100vh;
    height: calc((var(--vh, 1vh) * 100));
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
