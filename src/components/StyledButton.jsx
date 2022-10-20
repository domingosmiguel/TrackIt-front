import styled from "styled-components";
// tirar disabled padrao
export default function StyledButton({ children, disabled = false, type = "button", onClick }) {
    return (
        <ButtonStyle disabled={disabled} type={type} onClick={onClick}>
            {children}
        </ButtonStyle>
    );
}

export const ButtonStyle = styled.button`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    width: 100%;
    height: 45px;
    margin: 3px 0;
    color: white;
    background-color: var(--blue);
    border: none;
    cursor: pointer;
    :disabled {
        background-color: var(--lightGray);
    }
`;
