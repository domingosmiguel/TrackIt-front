import { useParams } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Habits from "./Habits";
import Header from "./Header";
import History from "./History";
import PageNotFound from "./PageNotFound";
import Today from "./Today";
import { useState } from "react";

export default function LoggedPage({ loginData }) {
    const [todayHabitsDone, setTodayHabitsDone] = useState(null);
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
                return (
                    <Today
                        todayHabitsDone={todayHabitsDone}
                        setTodayHabitsDone={setTodayHabitsDone}
                    />
                );
            case "historico":
                return <History />;
            default:
                return <PageNotFound route={route} />;
        }
    }
    return (
        <>
            <Header userImage={loginData.image} />
            <LoggedMain>{routeDecision()}</LoggedMain>
            <Footer percentage={todayHabitsDone} />
        </>
    );
}

const LoggedMain = styled.main`
    max-width: 100vw;
    height: calc(100vh - 140px);
    height: calc((var(--vh, 1vh) * 100 - 140px));
    position: relative;
    top: 70px;
    overflow-y: scroll;
    background-color: var(--lightGray);

    display: flex;
    justify-content: center;
`;
