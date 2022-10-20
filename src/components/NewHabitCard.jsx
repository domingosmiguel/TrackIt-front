import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import Day from "./Day";
import LoginContext from "./LoginContext";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

export default function NewHabitCard({ setAddNewHabit }) {
    const {
        loginData: { token },
    } = useContext(LoginContext);
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });
    console.log("🚀 ~ file: NewHabitCard.jsx ~ line 14 ~ NewHabitCard ~ newHabit", newHabit);
    const arrayOfDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    function handleSave() {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(url, newHabit, config)
            .then(() => setAddNewHabit(false))
            .catch((error) => alert(error));
    }
    function handleNewHabitData(name, value) {
        setNewHabit({ ...newHabit, [name]: value });
    }
    return (
        <Card>
            <DataContainer>
                <StyledInput
                    name="name"
                    type="text"
                    value={newHabit.name}
                    onChange={(e) => handleNewHabitData(e.target.name, e.target.value)}
                    placeHolder="nome do hábito"
                />
                <DaysContainer>
                    {arrayOfDays.map((day, index) => (
                        <Day
                            key={index}
                            name="days"
                            numberOfTheDay={index}
                            daysOfTheWeek={newHabit.days}
                            handleNewHabitData={handleNewHabitData}
                        >
                            {day}
                        </Day>
                    ))}
                </DaysContainer>
            </DataContainer>
            <ButtonsContainer>
                <StyledButton onClick={() => setAddNewHabit(false)}>Cancelar</StyledButton>
                <StyledButton onClick={handleSave}>Salvar</StyledButton>
            </ButtonsContainer>
        </Card>
    );
}

const Card = styled.section`
    max-width: 354px;
    min-height: 180px;
    background-color: white;
    border-radius: 5px;
    padding: 18px;
    margin: 20px auto 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const DataContainer = styled.div``;
const DaysContainer = styled.div`
    max-width: 234px;
    margin-top: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ButtonsContainer = styled.nav`
    display: flex;
    justify-content: flex-end;
`;
