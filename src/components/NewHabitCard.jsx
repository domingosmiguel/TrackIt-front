import axios from "axios";
import { useContext, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Day from "./Day";
import LoginContext from "./LoginContext";
import StyledButton, { ButtonStyle } from "./StyledButton";
import StyledInput from "./StyledInput";

export default function NewHabitCard({
    newHabit,
    setNewHabit,
    addNewHabit,
    setAddNewHabit,
    userHabits,
    setUserHabits,
}) {
    const {
        loginData: { token },
    } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const arrayOfDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    function newHabitSuccessful({ data }) {
        setAddNewHabit(false);
        setNewHabit({ name: "", days: [] });
        setUserHabits([...userHabits, data]);
        setLoading(false);
    }
    function newHabitFail(error) {
        alert(error);
        setLoading(false);
    }
    function handleSave() {
        if (newHabit.name.length >= 3 && newHabit.days.length >= 1) {
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            setLoading(true);
            axios.post(url, newHabit, config).then(newHabitSuccessful).catch(newHabitFail);
        }
    }
    function handleNewHabitData(name, value) {
        setNewHabit({ ...newHabit, [name]: value });
    }
    return (
        <Card visible={addNewHabit}>
            <DataContainer>
                <StyledInput
                    name="name"
                    disabled={loading}
                    type="text"
                    value={newHabit.name}
                    onChange={(e) => handleNewHabitData(e.target.name, e.target.value)}
                    placeHolder="nome do hábito"
                />
                <DaysContainer>
                    {arrayOfDays.map((day, index) => (
                        <Day
                            key={index}
                            disabled={loading}
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
                <StyledButton
                    disabled={loading}
                    invertColor={true}
                    freeButtonSize={true}
                    onClick={() => setAddNewHabit(false)}
                    fontSize={`font-size: 15.976px; line-height: 20px;`}
                >
                    Cancelar
                </StyledButton>
                <StyledButton
                    loading={loading}
                    freeButtonSize={true}
                    onClick={handleSave}
                    fontSize={`font-size: 15.976px; line-height: 20px;`}
                >
                    Salvar
                </StyledButton>
            </ButtonsContainer>
        </Card>
    );
}

const ScaleOutTop = keyframes`
    0% {
    transform: scaleY(1);
    transform-origin: 100% 0%;
    opacity: 1;
    }
    100% {
        transform: scaleY(0);
        transform-origin: 100% 0%;
        opacity: 1;
    }
`;
const ScaleInTop = keyframes`
    0% {
    transform: scaleY(0);
    transform-origin: 100% 0%;
    opacity: 1;
    }
    100% {
        transform: scaleY(1);
        transform-origin: 100% 0%;
        opacity: 1;
    }
`;
const AnimationIn = css`
    animation: ${ScaleInTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
const AnimationOut = css`
    animation: ${ScaleOutTop} 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
`;
const Card = styled.section`
    max-width: 400px;
    width: 100%;
    min-height: 180px;
    background-color: white;
    border-radius: 5px;
    padding: 18px;
    margin: 10px 0 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${({ visible }) => (visible ? AnimationIn : AnimationOut)};
`;
const DataContainer = styled.div``;
const DaysContainer = styled.div`
    max-width: fit-content;
    margin-top: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ButtonsContainer = styled.nav`
    display: flex;
    justify-content: flex-end;
`;
