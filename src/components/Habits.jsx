import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HabitCard from "./HabitCard";
import NewHabitCard from "./NewHabitCard";
import StyledButton, { ButtonStyle } from "./StyledButton";
import axios from "axios";
import LoginContext from "./LoginContext";

export default function Habits() {
    const [addNewHabit, setAddNewHabit] = useState(false);
    const [userHabits, setUserHabits] = useState(null);
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });

    const {
        loginData: { token },
    } = useContext(LoginContext);

    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(url, config)
            .then((response) => setUserHabits(response.data))
            .catch((error) => alert(error));
    }, []);
    if (userHabits === null) {
        return;
    }

    function hasHabitsOnTheServer() {
        if (userHabits.length === 0) {
            return (
                <UserHabitsHeader>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a
                    trackear!
                </UserHabitsHeader>
            );
        }
        return userHabits.map((habit) => (
            <HabitCard
                key={habit.id}
                id={habit.id}
                days={habit.days}
                token={token}
                userHabits={userHabits}
                setUserHabits={setUserHabits}
            >
                {habit.name}
            </HabitCard>
        ));
    }

    return (
        <HabitsMain>
            <HabitsHeader>
                Meus hábitos
                <StyledButton
                    onClick={() => setAddNewHabit(!addNewHabit)}
                    freeButtonSize={true}
                    fontSize={`font-size: 26.976px; line-height: 34px;`}
                >
                    {addNewHabit ? "-" : "+"}
                </StyledButton>
            </HabitsHeader>
            {addNewHabit && (
                <NewHabitCard
                    newHabit={newHabit}
                    setNewHabit={setNewHabit}
                    addNewHabit={addNewHabit}
                    setAddNewHabit={setAddNewHabit}
                    userHabits={userHabits}
                    setUserHabits={setUserHabits}
                />
            )}
            <HabitsSection>{hasHabitsOnTheServer()}</HabitsSection>
        </HabitsMain>
    );
}
const HabitsMain = styled.main`
    width: 100%;
    position: absolute;
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    padding-bottom: 31px;
`;
const HabitsHeader = styled.header`
    max-width: 400px;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0;

    font-size: 22.976px;
    line-height: 29px;
    color: var(--darkBlue);
    /* letter-spacing: 0; */
`;
const HabitsSection = styled.section`
    max-width: 436px;
    width: 100%;
`;
const UserHabitsHeader = styled.header`
    margin: 29px auto 0;
    font-size: 17.976px;
    line-height: 22px;
    color: var(--darkGray);
`;
