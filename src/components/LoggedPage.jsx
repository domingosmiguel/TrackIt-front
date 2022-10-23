import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Habits from "./Habits";
import Header from "./Header";
import History from "./History";
import PageNotFound from "./PageNotFound";
import Today from "./Today";
import { useState } from "react";
import LoadingPage from "./LoadingPage";

export default function LoggedPage({ loginData }) {
    console.log("🚀 ~ file: LoggedPage.jsx ~ line 12 ~ LoggedPage ~ loginData", loginData);
    const navigate = useNavigate();
    const [todayHabitsDone, setTodayHabitsDone] = useState(null);
    const { route } = useParams();

    function routeDecision() {
        switch (route) {
            case "habitos":
                return <Habits token={loginData.token} />;
            case "hoje":
                return (
                    <Today
                        token={loginData.token}
                        todayHabitsDone={todayHabitsDone}
                        setTodayHabitsDone={setTodayHabitsDone}
                    />
                );
            case "historico":
                return <History token={loginData.token} />;
            default:
                return <PageNotFound route={route} />;
        }
    }
    return (
        <>
            <Header userImage={loginData && loginData.image} />
            <LoggedMain>{loginData ? routeDecision() : <LoadingPage />}</LoggedMain>
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
