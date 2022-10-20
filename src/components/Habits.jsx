import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HabitCard from "./HabitCard";
import NewHabitCard from "./NewHabitCard";
import { ButtonStyle } from "./StyledButton";
import axios from "axios";
import LoginContext from "./LoginContext";

export default function Habits() {
    const [addNewHabit, setAddNewHabit] = useState(false);
    const [userHabits, setUserHabits] = useState(null);
    console.log("🚀 ~ file: Habits.jsx ~ line 10 ~ Habits ~ userHabits", userHabits);
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

    return (
        <HabitsMain>
            <HabitsHeader>
                Meus hábitos
                <HabitsButton onClick={() => setAddNewHabit(!addNewHabit)}>
                    {addNewHabit ? "-" : "+"}
                </HabitsButton>
            </HabitsHeader>
            {addNewHabit && <NewHabitCard setAddNewHabit={setAddNewHabit} />}
            {userHabits.map((habit) => (
                <HabitCard key={habit.id}>{habit.name}</HabitCard>
            ))}
            <HabitsSection>
                <UserHabitsHeader>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a
                    trackear!
                </UserHabitsHeader>
            </HabitsSection>
        </HabitsMain>
    );
}
const HabitsHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px auto;
    /* height: 51px; */
`;
const HabitsButton = styled(ButtonStyle)`
    width: fit-content;
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
