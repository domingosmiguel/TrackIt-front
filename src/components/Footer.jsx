import styled from "styled-components";
import StyledButton from "./StyledButton";

export default function Footer() {
    return (
        <FooterContainer>
            <NavContainerFooter>
                <NewButton>Hábitos</NewButton>
                <NewButton>Hoje</NewButton>
                <NewButton>Histórico</NewButton>
            </NavContainerFooter>
        </FooterContainer>
    );
}
const FooterContainer = styled.footer`
    width: 100vw;
    height: 70px;
    background-color: var(--darkBlue);
    color: white;

    position: fixed;
    bottom: 0;
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
const NewButton = styled(StyledButton)`
    width: 100px;
    background-color: white;
    color: var(--blue);
`;
