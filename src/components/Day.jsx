import { useState } from "react";
import styled from "styled-components";

export default function Day({
    children,
    disabled = false,
    name,
    numberOfTheDay,
    daysOfTheWeek,
    handleNewHabitData,
}) {
    const [selected, setSelected] = useState(false);
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
        <DayStyle
            disabled={disabled}
            name={name}
            selected={(selected && disabled) || daysOfTheWeek.indexOf(numberOfTheDay) !== -1}
            onClick={handleClick}
        >
            {children}
        </DayStyle>
    );
}
const DayStyle = styled.div`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1.5px solid var(--midGray);
    color: ${({ selected }) => (selected ? "white" : "var(--midGray)")};
    background-color: ${({ selected }) => (selected ? "var(--midGray)" : "white")};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19.976px;
    line-height: 25px;

    margin-right: 4px;
`;
