import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Habits from "./Habits";
import Header from "./Header";
import History from "./History";
import PageNotFound from "./PageNotFound";
import Today from "./Today";
import { use100vh } from "react-div-100vh";

export default function LoggedPage({ loginData }) {
    const [todayHabits, setTodayHabits] = useState(null);
    const [todayHabitsDone, setTodayHabitsDone] = useState(null);
    const navigate = useNavigate();
    const { route } = useParams();

    useEffect(() => {
        const serializedOldLoginData = localStorage.getItem("loginData");
        if (serializedOldLoginData === null) {
            navigate("/");
            return;
        }
    }, [navigate]);

    const height = use100vh();
    const customHeight = height ? height - 140 + "px" : "calc(100vh - 140px)";

    function routeDecision() {
        switch (route) {
            case "habitos":
                return <Habits token={loginData?.token} />;
            case "hoje":
                return (
                    <Today
                        token={loginData?.token}
                        todayHabits={todayHabits}
                        todayHabitsDone={todayHabitsDone}
                    />
                );
            case "historico":
                return <History token={loginData?.token} />;
            default:
                return <PageNotFound route={route} />;
        }
    }
    return (
        <>
            <Header userImage={loginData?.image} />
            <LoggedMain customHeight={customHeight}>{routeDecision()}</LoggedMain>
            <Footer
                token={loginData?.token}
                todayHabits={todayHabits}
                setTodayHabits={setTodayHabits}
                todayHabitsDone={todayHabitsDone}
                setTodayHabitsDone={setTodayHabitsDone}
            />
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
