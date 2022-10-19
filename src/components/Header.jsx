import styled from "styled-components";
import Default from "../images/default.jpg";
export default function Header({ isLogged = true, userImage }) {
    return (
        <HeaderContainer>
            <NavContainerHeader>
                TrackIt
                {isLogged && <ImageContainer src={userImage || Default} />}
            </NavContainerHeader>
        </HeaderContainer>
    );
}
const HeaderContainer = styled.header`
    width: 100vw;
    height: 70px;
    background-color: var(--darkBlue);
    color: white;

    position: fixed;
    top: 0;
`;
const NavContainerHeader = styled.nav`
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
const ImageContainer = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 25.5px;
`;
