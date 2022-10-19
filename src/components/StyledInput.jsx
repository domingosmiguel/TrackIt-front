import styled from "styled-components";

export default function StyledInput({ name, type, value, onChange, placeHolder }) {
    return (
        <InputStyle
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
        />
    );
}

const InputStyle = styled.input`
    height: 45px;
    margin: 3px 0;
    cursor: text;
    padding: 8px 11px 11px;
`;
