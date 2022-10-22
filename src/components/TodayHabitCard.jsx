import styled from "styled-components";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";

export default function TodayHabitCard({
    children,
    id,
    token,
    done,
    refreshHabits,
    setRefreshHabits,
}) {
    function handleCheckClick() {
        let url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        if (done) {
            url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(url, {}, config)
            .then(() => setRefreshHabits(!refreshHabits))
            .catch((error) => alert(error));
    }
    return (
        <Card>
            <DataContainer>
                <TitleContainer>{children[0]}</TitleContainer>
                <SubTitleContainer>
                    Sequência atual:
                    <CurrentStrikeDays done={done}>
                        {children[1]} dia{children[1] !== 1 ? "s" : ""}
                    </CurrentStrikeDays>
                </SubTitleContainer>
                <SubTitleContainer>
                    Seu record:
                    <LongestStreakDays
                        current={children[1] === children[2] && children[2] > 0 && done}
                    >
                        {children[2]} dia{children[2] !== 1 ? "s" : ""}
                    </LongestStreakDays>
                </SubTitleContainer>
            </DataContainer>
            <CheckButton done={`${done}`} onClick={handleCheckClick} />
        </Card>
    );
}

const Card = styled.section`
    max-width: 400px;
    min-height: 94px;
    background-color: white;
    border-radius: 5px;
    padding: 13px 13px 12px 15px;
    margin: 10px auto 0;

    display: flex;
    justify-content: space-between;
`;
const DataContainer = styled.div``;
const TitleContainer = styled.p``;
const SubTitleContainer = styled.div`
    display: flex;
`;
const CurrentStrikeDays = styled.p`
    color: ${({ done }) => (done ? "var(--green)" : "var(--darkGray)")};
`;
const LongestStreakDays = styled.p`
    color: ${({ current }) => (current ? "var(--green)" : "var(--darkGray)")};
`;

const CheckButton = styled(BsCheckLg)`
    display: flex;
    align-self: center;
    color: white;
    width: 69px;
    height: 69px;
    min-width: 69px;
    background-color: ${({ done }) => (done === "true" ? "var(--green)" : "var(--lightGray)")};
    border-radius: 5px;
    padding: 16.5px 11.5px 17.5px 15.5px;
    cursor: pointer;
    path {
        cursor: pointer;
    }
`;
