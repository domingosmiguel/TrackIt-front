import styled, { css } from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function StyledButton({
    children,
    disabled = false,
    loading = false,
    invertColor = false,
    type = "button",
    onClick,
    freeButtonSize = false,
    fontSize = `font-size: 20.976px; line-height: 26px;`,
}) {
    return (
        <ButtonStyle
            disabled={disabled || loading}
            type={type}
            onClick={onClick}
            invertColor={invertColor}
            freeButtonSize={freeButtonSize}
            fontSize={fontSize}
        >
            {loading ? (
                <ThreeDots
                    height={freeButtonSize ? "10" : "15"}
                    width={freeButtonSize ? "60" : "70"}
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
const NormalColor = css`
    color: white;
    background-color: var(--blue);
`;
const InvertedColor = css`
    color: var(--blue);
    background-color: white;
`;
const NormalSize = css`
    width: 100%;
    height: 45px;
    margin: 3px 0;
`;
const FreeSize = css`
    height: 35px;
    padding: 0 17px;
`;

const ButtonStyle = styled.button`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    border: none;
    border-radius: 5px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ invertColor }) => (invertColor ? InvertedColor : NormalColor)};
    ${({ freeButtonSize }) => (freeButtonSize ? FreeSize : NormalSize)};
    ${({ fontSize }) => fontSize};
`;
