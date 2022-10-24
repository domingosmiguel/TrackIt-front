import styled from "styled-components";

export default function StyledInput({
    identifier,
    name,
    disabled,
    type,
    value,
    onChange,
    placeHolder,
}) {
    return (
        <InputStyle
            data-identifier={identifier}
            name={name}
            disabled={disabled}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            required
        />
    );
}

const InputStyle = styled.input`
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    width: 100%;
    height: 45px;
    margin: 3px 0;
    cursor: text;
    padding: 8px 11px 11px;
    border: 2px solid var(--midGray);
    border-radius: 5px;

    font-size: 19.976px;
    line-height: 25px;

    caret-color: transparent;

    &::placeholder {
        color: var(--midGray);
    }

    &:not(:placeholder-shown) {
        color: var(--darkGray);
    }

    &:focus {
        outline-color: var(--darkGray);
        ::placeholder {
            color: transparent;
        }
    }
    &:disabled {
    }
`;
