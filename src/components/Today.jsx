import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import TodayHabitCard from "./TodayHabitCard";
import "dayjs/locale/pt-br";
import LoadingPage from "./LoadingPage";

export default function Habits({ token, todayHabitsDone, setTodayHabitsDone }) {
    const [todayHabits, setTodayHabits] = useState(null);
    const [refreshHabits, setRefreshHabits] = useState(false);

    useEffect(() => {
        if (todayHabits && token) {
            const completed = todayHabits.reduce(
                (acc, habit) => (habit.done === true ? ++acc : acc),
                0
            );
            setTodayHabitsDone(((completed / todayHabits.length) * 100).toFixed());
        }
    }, [todayHabits, setTodayHabitsDone, token]);

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
    }, [refreshHabits, token]);
    if (todayHabits === null) {
        return <LoadingPage />;
    }

    function hasHabitsOnTheServer() {
        if (todayHabits.length !== 0) {
            return todayHabits.map((habit) => (
                <TodayHabitCard
                    key={habit.id}
                    id={habit.id}
                    token={token}
                    done={habit.done}
                    refreshHabits={refreshHabits}
                    setRefreshHabits={setRefreshHabits}
                >
                    {[habit.name, habit.currentSequence, habit.highestSequence]}
                </TodayHabitCard>
            ));
        }
    }
    function subtitle() {
        if (todayHabits.length === 0) {
            return `Não há nada aqui! Clique no botão "Hábitos" e adicione um novo hábito.`;
        }
        return todayHabitsDone > 0
            ? `${todayHabitsDone}% dos hábitos concluídos`
            : "Nenhum hábito concluído ainda";
    }
    function dayOfTheWeek() {
        const writtenData = dayjs().locale("pt-br").format("dddd").split("-")[0];
        const writtenDataUppercase = writtenData[0].toUpperCase() + writtenData.substring(1);
        return writtenDataUppercase + dayjs().format(", D/MM");
    }
    return (
        <HabitsMain>
            <HabitsHeader>
                <TodayTime>{dayOfTheWeek()}</TodayTime>
                <PercentageOfHabits changeColor={todayHabitsDone > 0}>
                    {subtitle()}
                </PercentageOfHabits>
            </HabitsHeader>
            <HabitsSection>{hasHabitsOnTheServer()}</HabitsSection>
        </HabitsMain>
    );
}
const HabitsMain = styled.main`
    max-width: 436px;
    width: 100%;
    position: absolute;
    padding: 0 18px 31px;
`;
const HabitsHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 10px auto 0;
    height: 97px;
`;
const TodayTime = styled.time`
    font-size: 22.976px;
    line-height: 29px;
    color: var(--darkBlue);
`;
const PercentageOfHabits = styled.div`
    color: ${({ changeColor }) => (changeColor ? "var(--green)" : "var(--midGray)")};
    font-size: 17.976px;
    line-height: 22px;
`;
const HabitsSection = styled.section`
    max-width: 1200px;
    width: 100%;
`;
