import { Link } from "react-router-dom";
import styled from "styled-components";

import trackItLogo from "../images/trackit.PNG";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

export default function Login() {
    function handleButtonClick(e) {
        e.preventDefault();
    }
    return (
        <Main>
            <LogoContainer src={trackItLogo} alt="logo" />
            <InputContainer>
                <StyledInput type="text" />
                <StyledInput type="number" />
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
