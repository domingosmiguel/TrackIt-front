import styled from "styled-components";
import DefaultImage from "../images/default.jpg";

export default function Header({ userImage }) {
    return (
        <HeaderContainer>
            <NavContainerHeader>
                TrackIt
                <ImageContainer data-identifier="avatar" src={userImage || DefaultImage} />
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
    z-index: 2;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;
const NavContainerHeader = styled.nav`
    max-width: 436px;
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
    object-fit: cover;
`;
