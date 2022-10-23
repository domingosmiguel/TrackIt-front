import styled from "styled-components";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";

export default function TodayHabitCard({
    children,
    id,
    disabled = false,
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
        <Card disabled={disabled}>
            <DataContainer>
                <TitleContainer>
                    {typeof children[1] === "number" ? children[0] : children}
                </TitleContainer>
                {typeof children[1] === "number" && (
                    <>
                        <SubTitleContainer>
                            Sequência atual:
                            <DaysCount changeColor={done}>
                                {children[1]} dia{children[1] !== 1 ? "s" : ""}
                            </DaysCount>
                        </SubTitleContainer>
                        <SubTitleContainer>
                            Seu record:
                            <DaysCount
                                changeColor={children[1] === children[2] && children[2] > 0 && done}
                            >
                                {children[2]} dia{children[2] !== 1 ? "s" : ""}
                            </DaysCount>
                        </SubTitleContainer>
                    </>
                )}
            </DataContainer>
            <CheckButton done={`${done}`} onClick={handleCheckClick} />
        </Card>
    );
}

const Card = styled.section`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    max-width: 400px;
    min-height: 94px;
    background-color: white;
    border-radius: 5px;
    padding: 13px 13px 12px 15px;
    margin: 10px auto 0;

    display: flex;
    justify-content: space-between;
`;
const DataContainer = styled.div`
    margin-right: 15px;
`;
const TitleContainer = styled.p`
    font-size: 19.976px;
    line-height: 25px;
    height: fit-content;
    color: var(--darkGray);
    margin-bottom: 7px;

    display: block;
    align-items: normal;
    :only-child {
        display: flex;
        align-items: center;
        height: 100%;
        margin-bottom: 0;
    }
`;
const SubTitleContainer = styled.p`
    display: flex;
    font-size: 13.976px;
    line-height: 17.5px;
    color: var(--darkGray);
`;
const DaysCount = styled.b`
    color: ${({ changeColor }) => (changeColor ? "var(--green)" : "var(--darkGray)")};
    margin-left: 5px;
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
