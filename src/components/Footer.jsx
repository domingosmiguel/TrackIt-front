import { useNavigate } from "react-router";
import styled from "styled-components";
// import StyledButton from "./StyledButton";
import { ButtonStyle } from "./StyledButton";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <FooterContainer>
            <NavContainerFooter>
                <FooterButton onClick={() => navigate("/habitos")}>Hábitos</FooterButton>
                <FooterButton onClick={() => navigate("/hoje")}>Hoje</FooterButton>
                <FooterButton onClick={() => navigate("/historico")}>Histórico</FooterButton>
            </NavContainerFooter>
        </FooterContainer>
    );
}
const FooterContainer = styled.footer`
    width: 100vw;
    height: 70px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 2;
`;
const NavContainerFooter = styled.nav`
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;

    font-family: "Playball", cursive;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;

    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    align-items: center;
`;
const FooterButton = styled(ButtonStyle)`
    width: 100px;
    background-color: white;
    color: var(--blue);
`;
