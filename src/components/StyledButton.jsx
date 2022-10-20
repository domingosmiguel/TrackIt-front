import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function StyledButton({ children, disabled, type = "button", onClick }) {
    return (
        <ButtonStyle disabled={disabled} type={type} onClick={onClick}>
            {disabled ? (
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            ) : (
                children
            )}
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
    border-radius: 5px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;
