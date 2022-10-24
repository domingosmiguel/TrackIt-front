import { Watch } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingPage() {
    return (
        <LoadingMain>
            <Watch
                height="101"
                width="101"
                radius="48"
                color="var(--midGray)"
                ariaLabel="watch-loading"
                visible={true}
            />
        </LoadingMain>
    );
}
const LoadingMain = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
