import { useNavigate } from "react-router";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer({ percentage }) {
    const navigate = useNavigate();
    return (
        <FooterContainer>
            <NavContainerFooter>
                <StyledButton
                    invertColor={true}
                    freeButtonSize={true}
                    onClick={() => navigate("/habitos")}
                    fontSize={`font-size: 17.976px; line-height: 22px;`}
                >
                    Hábitos
                </StyledButton>
                <MiddleButtonContainer onClick={() => navigate("/hoje")}>
                    <CircularProgressbar
                        value={percentage}
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "var(--blue)",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                        })}
                    />
                </MiddleButtonContainer>
                <StyledButton
                    invertColor={true}
                    freeButtonSize={true}
                    onClick={() => navigate("/historico")}
                    fontSize={`font-size: 17.976px; line-height: 22px;`}
                >
                    Histórico
                </StyledButton>
            </NavContainerFooter>
        </FooterContainer>
    );
}
const FooterContainer = styled.footer`
    width: 100vw;
    height: 70px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 2;
`;
const NavContainerFooter = styled.nav`
    max-width: 436px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    align-items: center;

    position: relative;

    @media screen and (max-width: 370px) {
        padding: 0 0;
    }
`;
const MiddleButtonContainer = styled.div`
    width: 91px;
    position: absolute;
    left: min(calc((100vw - 91px) / 2), 172.5px);
    bottom: 10px;

    & :nth-child(n) {
        cursor: pointer;
    }
`;
