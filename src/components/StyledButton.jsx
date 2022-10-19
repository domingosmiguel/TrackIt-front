import styled from "styled-components";

export default function StyledButton({ children, type = "button", onClick }) {
    return (
        <ButtonStyle type={type} onClick={onClick}>
            {children}
        </ButtonStyle>
    );
}

const ButtonStyle = styled.button`
    width: 100%;
    height: 45px;
    margin: 3px 0;
    background-color: var(--blue);
    border: none;
    cursor: pointer;
`;
