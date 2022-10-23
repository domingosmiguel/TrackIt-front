import styled from "styled-components";
import PageNotFoundImg from "../images/pageNotFound.png";

export default function PageNotFound({ route }) {
    return (
        <Main>
            <Img src={PageNotFoundImg} />
            <Header>
                A URL /{route} não foi encontrada neste servidor, use a barra de navegação abaixo!
            </Header>
        </Main>
    );
}
const Main = styled.main`
    max-width: 436px;
    width: 100%;
    position: absolute;
    padding: 0 18px 31px;
`;
const Header = styled.header`
    color: var(--darkGray);
    font-size: 17.976px;
    line-height: 22px;
`;
const Img = styled.img`
    width: 100%;
`;
