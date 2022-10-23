import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import LoadingPage from "./LoadingPage";

const TODAY = dayjs(new Date()).format("DD/MM/YYYY");

export default function History({ token }) {
    const [selectDate, setSelectDate] = useState();
    const [historyData, setHistoryData] = useState(null);

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
        return <LoadingPage />;
    }

    function highlightDays(activeStartDate, date) {
        const calendarDay = dayjs(date).format("DD/MM/YYYY");

        if (calendarDay !== TODAY) {
            const dateIndex = historyData.findIndex((data) => data.day === calendarDay);
            if (dateIndex !== -1) {
                const totalHabits = historyData[dateIndex].habits.length;
                const completedHabits = historyData[dateIndex].habits.reduce(
                    (acc, cur) => (cur.done ? ++acc : acc),
                    0
                );
                if (completedHabits / totalHabits === 1) {
                    return "green all";
                }
                return "red all";
            }
            return "all";
        }
        return "all";
    }
    function handleClickDay(value, event) {
        console.log("clicou");
    }
    return (
        <HabitsMain>
            <HabitsHeader>Histórico</HabitsHeader>
            <StyledCalendar
                value={selectDate}
                onChange={setSelectDate}
                locale="pt-br"
                calendarType="US"
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
    padding: 0 18px 31px;
`;
const HabitsHeader = styled.section`
    max-width: 400px;
    width: 100%;
    height: 68px;
    margin: 0 auto;
    padding-bottom: 11px;
    display: flex;
    align-items: flex-end;

    font-size: 22.976px;
    line-height: 29px;
    color: var(--darkBlue);
`;
const StyledCalendar = styled(Calendar)`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    border: none;
    border-radius: 10px;
    & .red {
        &:enabled {
            background: var(--calendarRed);
            clip-path: circle(32%);
        }
    }
    & .green {
        &:enabled {
            background: var(--calendarGreen);
            clip-path: circle(32%);
        }
    }
    & .all {
        &:enabled {
            width: 100%;
            aspect-ratio: 1 / 1.087;
        }
    }
`;
