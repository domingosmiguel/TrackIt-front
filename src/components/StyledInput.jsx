import styled from "styled-components";

export default function StyledInput({ type }) {
    return <InputStyle type={type} />;
}

const InputStyle = styled.input`
    height: 45px;
    margin: 3px 0;
    cursor: text;
    padding: 8px 11px 11px;
`;
