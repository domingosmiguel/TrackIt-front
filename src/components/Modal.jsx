import styled from "styled-components";
import { use100vh } from "react-div-100vh";
import TodayHabitCard from "./TodayHabitCard";

export default function Modal({ children, showModal, setShowModal, data }) {
    const height = use100vh();
    const customHeight = height ? height - 140 + "px" : "calc(100vh - 140px)";

    return (
        <ModalBackground
            customHeight={customHeight}
            visible={showModal}
            onClick={() => setShowModal(false)}
        >
            <ModalStyle>
                <ModalHeader>{children}</ModalHeader>
                <ModalHeader>Hábitos</ModalHeader>
                {data.map((habit) => (
                    <TodayHabitCard key={habit.id} disabled={true} done={habit.done}>
                        {habit.name}
                    </TodayHabitCard>
                ))}
            </ModalStyle>
        </ModalBackground>
    );
}

const ModalBackground = styled.section`
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
    width: 100vw;
    height: ${({ customHeight }) => `max(${customHeight}, 100%)`};
    padding: 18px;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ModalStyle = styled.section`
    max-width: 436px;
    width: 100%;
    background-color: white;
    padding: 18px;
    border-radius: 10px;

    font-size: 22.976px;
    line-height: 29px;
`;
const ModalHeader = styled.header`
    color: var(--midGray);
    margin-bottom: 5px;
    font-size: 17.976px;
    line-height: 22px;

    :first-child {
        color: var(--darkBlue);
        font-size: 22.976px;
        line-height: 29px;
    }
`;
