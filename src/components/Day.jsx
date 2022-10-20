import { useState } from "react";
import styled from "styled-components";

export default function Day({ children, name, numberOfTheDay, daysOfTheWeek, handleNewHabitData }) {
    const [selected, setSelected] = useState();
    function handleClick() {
        if (selected) {
            daysOfTheWeek.splice(daysOfTheWeek.indexOf(numberOfTheDay), 1);
        } else {
            daysOfTheWeek.push(numberOfTheDay);
        }
        handleNewHabitData(name, daysOfTheWeek);
        setSelected(!selected);
    }
    return (
        <DayStyle name={name} selected={selected} onClick={handleClick}>
            {children}
        </DayStyle>
    );
}
const DayStyle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid var(--midGray);
    color: ${({ selected }) => (selected ? "white" : "var(--midGray)")};
    background-color: ${({ selected }) => (selected ? "var(--midGray)" : "white")};
    display: flex;
    justify-content: center;
    align-items: center;
`;
