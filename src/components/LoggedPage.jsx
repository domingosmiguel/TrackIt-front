import { useParams } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Habits from "./Habits";
import Header from "./Header";
import Today from "./Today";

export default function LoggedPage({ loginData }) {
    const { route } = useParams();
    if (loginData === null) {
        return (
            <>
                <Header />
                <Footer />
            </>
        );
    }
    function routeDecision() {
        switch (route) {
            case "habitos":
                return <Habits />;
            case "hoje":
                return <Today />;
            default:
                break;
        }
    }
    return (
        <>
            <Header userImage={loginData.image} />
            <LoggedMain>{routeDecision()}</LoggedMain>
            <Footer />
        </>
    );
}

const LoggedMain = styled.main`
    max-width: 100vw;
    height: calc(100vh - 140px);
    position: relative;
    top: 70px;
    overflow-y: scroll;

    background-color: var(--lightGray);
`;
