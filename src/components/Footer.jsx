import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer({
    token,
    todayHabits,
    setTodayHabits,
    todayHabitsDone,
    setTodayHabitsDone,
}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (todayHabits) {
            const completed = todayHabits.reduce(
                (acc, habit) => (habit.done === true ? ++acc : acc),
                0
            );
            setTodayHabitsDone(((completed / todayHabits.length) * 100).toFixed());
        }
    }, [todayHabits, setTodayHabitsDone]);
    useEffect(() => {
        if (token) {
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios
                .get(url, config)
                .then((response) => setTodayHabits(response.data))
                .catch((error) => alert(error.response.data.message));
        }
    }, [todayHabits, token]);
    return (
        <FooterContainer>
            <NavContainerFooter>
                <StyledButton
                    identifier="habit-page-action"
                    invertColor={true}
                    freeButtonSize={true}
                    onClick={() => navigate("/habitos")}
                    fontSize={`font-size: 17.976px; line-height: 22px;`}
                >
                    Hábitos
                </StyledButton>
                <MiddleButtonContainer onClick={() => navigate("/hoje")}>
                    <CircularProgressbar
                        value={todayHabitsDone}
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "var(--blue)",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                        })}
                    />
                </MiddleButtonContainer>
                <StyledButton
                    identifier="historic-page-action"
                    invertColor={true}
                    freeButtonSize={true}
                    onClick={() => navigate("/historico")}
                    fontSize={`font-size: 17.976px; line-height: 22px;`}
                >
                    Histórico
                </StyledButton>
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
    max-width: 436px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    align-items: center;

    position: relative;

    @media screen and (max-width: 370px) {
        padding: 0 0;
    }
`;
const MiddleButtonContainer = styled.div`
    width: 91px;
    position: absolute;
    left: min(calc((100vw - 91px) / 2), 172.5px);
    bottom: 10px;

    & :nth-child(n) {
        cursor: pointer;
    }
`;
