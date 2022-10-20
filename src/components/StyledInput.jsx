import styled from "styled-components";

export default function StyledInput({
    name,
    // tirar este disabled padrao
    disabled = false,
    type,
    value,
    onChange,
    placeHolder,
}) {
    return (
        <InputStyle
            name={name}
            disabled={disabled}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
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
`;
