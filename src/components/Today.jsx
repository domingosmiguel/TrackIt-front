import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoginContext from "./LoginContext";
import dayjs from "dayjs";
import TodayHabitCard from "./TodayHabitCard";
import "dayjs/locale/pt-br";

export default function Habits() {
    const [todayHabits, setTodayHabits] = useState(null);
    const [todayHabitsDone, setTodayHabitsDone] = useState(null);
    const [renderHabitsAgain, setRenderHabitsAgain] = useState(false);
    const {
        loginData: { token },
    } = useContext(LoginContext);

    useEffect(() => {
        if (todayHabits) {
            const completed = todayHabits.reduce(
                (acc, habit) => (habit.done === true ? ++acc : acc),
                0
            );
            setTodayHabitsDone(((completed / todayHabits.length) * 100).toFixed());
        }
    }, [todayHabits]);
    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(url, config)
            .then((response) => setTodayHabits(response.data))
            .catch((error) => alert(error));
    }, [renderHabitsAgain]);
    if (todayHabits === null) {
        return;
    }

    function hasHabitsOnTheServer() {
        if (todayHabits.length === 0) {
            return (
                <UserHabitsHeader>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a
                    trackear!
                </UserHabitsHeader>
            );
        }
        return todayHabits.map((habit) => (
            <TodayHabitCard
                key={habit.id}
                id={habit.id}
                token={token}
                done={habit.done}
                renderHabitsAgain={renderHabitsAgain}
                setRenderHabitsAgain={setRenderHabitsAgain}
            >
                {[habit.name, habit.currentSequence, habit.highestSequence]}
            </TodayHabitCard>
        ));
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
                    {todayHabitsDone > 0
                        ? `${todayHabitsDone}% dos hábitos concluídos`
                        : "Nenhum hábito concluído ainda"}
                </PercentageOfHabits>
            </HabitsHeader>
            <HabitsSection>{hasHabitsOnTheServer()}</HabitsSection>
        </HabitsMain>
    );
}
const HabitsHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 5px auto;
`;
const TodayTime = styled.time``;
const PercentageOfHabits = styled.time`
    color: ${({ changeColor }) => (changeColor ? "var(--green)" : "var(--midGray)")};
`;
const HabitsMain = styled.main`
    width: 100%;
    position: absolute;
    padding: 0 18px;
`;
const HabitsSection = styled.section`
    max-width: 1200px;
    width: 100%;
`;
const UserHabitsHeader = styled.header`
    margin: 29px auto 0;
`;
