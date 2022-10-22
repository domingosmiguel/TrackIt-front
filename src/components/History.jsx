import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoginContext from "./LoginContext";
import dayjs from "dayjs";
import Calendar from "react-calendar";

export default function History() {
    const [selectDate, setSelectDate] = useState();
    const [historyData, setHistoryData] = useState(null);
    console.log("🚀 ~ file: History.jsx ~ line 11 ~ History ~ historyData", historyData);
    const {
        loginData: { token },
    } = useContext(LoginContext);

    useEffect(() => {
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(url, config)
            .then((response) => setHistoryData(response.data))
            .catch((error) => alert(error));
    }, []);
    if (historyData === null) {
        return;
    }

    function highlightDays(activeStartDate, date) {
        const dateIndex = historyData.findIndex(
            (data) => data.day === dayjs(date).format("DD/MM/YYYY")
        );
        if (dateIndex !== -1) {
            const totalHabits = historyData[dateIndex].habits.length;
            const completedHabits = historyData[dateIndex].habits.reduce(
                (acc, cur) => (cur.done ? ++acc : acc),
                0
            );
            if (completedHabits / totalHabits === 1) {
                return "green";
            }
            return "red";
        }
        // return `${date}` === `${selectDate}` && "teste";
    }
    function handleClickDay(value, event) {
        console.log("clicou");
    }
    return (
        <HabitsMain>
            <HabitsHeader>Histórico</HabitsHeader>
            <HabitsHeader>Calendário</HabitsHeader>
            <StyledCalendar
                value={selectDate}
                onChange={setSelectDate}
                formatDay={(locale, date) => dayjs(date).format("DD")}
                tileClassName={({ activeStartDate, date }) => highlightDays(activeStartDate, date)}
                onClickDay={(value, event) => handleClickDay(value, event)}
            />
        </HabitsMain>
    );
}
const HabitsMain = styled.main`
    width: 100%;
    position: absolute;
    padding: 0 18px;
`;
const HabitsHeader = styled.section`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
`;
const StyledCalendar = styled(Calendar)`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    & .red {
        &:enabled {
            background: red;
            clip-path: circle(32%);
        }
    }
    & .green {
        &:enabled {
            background: green;
            clip-path: circle(32%);
        }
    }
`;
