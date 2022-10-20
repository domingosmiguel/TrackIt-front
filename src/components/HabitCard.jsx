import styled from "styled-components";
import Day from "./Day";
import Delete from "../images/delete.PNG";

export default function HabitCard({ children }) {
    const arrayOfDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    return (
        <Card>
            <DataContainer>
                <TitleContainer>{children}</TitleContainer>
                <DaysContainer>
                    {arrayOfDays.map((day, index) => (
                        <Day key={index} name="days" numberOfTheDay={index}>
                            {day}
                        </Day>
                    ))}
                </DaysContainer>
            </DataContainer>
            <ExcludeButton src={Delete} />
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
const ExcludeButton = styled.img`
    width: 15px;
    height: 15px;
    margin-right: -5px;
    margin-top: -2px;
`;
