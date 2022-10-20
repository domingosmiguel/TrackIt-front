import styled from "styled-components";
import Day from "./Day";
import Delete from "../images/delete.PNG";
import axios from "axios";

export default function HabitCard({ children, id, days, token, userHabits, setUserHabits }) {
    const arrayOfDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    function deletionSuccess() {
        const newHabitsList = userHabits.filter((habit) => habit.id !== id);
        setUserHabits([...newHabitsList]);
    }
    function handleDeletion() {
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .delete(url, config)
            .then(deletionSuccess)
            .catch((error) => alert(error));
    }
    function handleDeletionClick() {
        if (window.confirm("sure you wanna delete this habit track?")) {
            handleDeletion();
        }
    }
    return (
        <Card>
            <DataContainer>
                <TitleContainer>{children}</TitleContainer>
                <DaysContainer>
                    {arrayOfDays.map((day, index) => (
                        <Day
                            key={index}
                            disabled={true}
                            numberOfTheDay={index}
                            daysOfTheWeek={days}
                        >
                            {day}
                        </Day>
                    ))}
                </DaysContainer>
            </DataContainer>
            <DeleteButton src={Delete} onClick={handleDeletionClick} />
        </Card>
    );
}

const Card = styled.section`
    max-width: 354px;
    height: 91px;
    background-color: white;
    border-radius: 5px;
    padding: 14px;
    margin: 10px auto 0;

    display: flex;
    justify-content: space-between;
`;
const TitleContainer = styled.p``;
const DataContainer = styled.div``;
const DaysContainer = styled.div`
    max-width: 234px;
    margin-top: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const DeleteButton = styled.img`
    width: 15px;
    height: 15px;
    margin-right: -5px;
    margin-top: -2px;
    cursor: pointer;
`;
