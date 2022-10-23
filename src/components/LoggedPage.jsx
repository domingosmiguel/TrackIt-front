import { useParams } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Habits from "./Habits";
import Header from "./Header";
import History from "./History";
import PageNotFound from "./PageNotFound";
import Today from "./Today";
import { useState } from "react";
import { use100vh } from "react-div-100vh";

export default function LoggedPage({ loginData }) {
    const [todayHabitsDone, setTodayHabitsDone] = useState(null);
    const { route } = useParams();

    const height = use100vh();
    const customHeight = height ? height - 140 + "px" : "calc(100vh - 140px)";

    function routeDecision() {
        switch (route) {
            case "habitos":
                return <Habits token={loginData && loginData.token} />;
            case "hoje":
                return (
                    <Today
                        token={loginData && loginData.token}
                        todayHabitsDone={todayHabitsDone}
                        setTodayHabitsDone={setTodayHabitsDone}
                    />
                );
            case "historico":
                return <History token={loginData && loginData.token} />;
            default:
                return <PageNotFound route={route} />;
        }
    }
    return (
        <>
            <Header userImage={loginData && loginData.image} />
            <LoggedMain customHeight={customHeight}>{routeDecision()}</LoggedMain>
            <Footer percentage={todayHabitsDone} />
        </>
    );
}

const LoggedMain = styled.main`
    max-width: 100vw;
    height: ${({ customHeight }) => customHeight};
    position: relative;
    top: 70px;
    overflow-y: scroll;
    background-color: var(--lightGray);

    display: flex;
    justify-content: center;
`;
