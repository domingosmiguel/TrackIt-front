import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";

const TODAY = dayjs(new Date()).format("DD/MM/YYYY");

export default function History({ token }) {
    const [selectDayData, setSelectDayData] = useState();
    const [historyData, setHistoryData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (token) {
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
                .catch((error) => alert(error.response.data.message));
        }
    }, [token]);
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
        event.preventDefault();
        const day = dayjs(value).locale("pt-br");
        const clickedDay = day.format("DD/MM/YYYY");
        const dayIndex = historyData.findIndex((data) => data.day === clickedDay);
        if (dayIndex !== -1) {
            const weekday = day.format("dddd").split("-")[0];
            const weekdayUppercase = weekday[0].toUpperCase() + weekday.substring(1);
            const month = day.format("MMMM");
            const monthUppercase = month[0].toUpperCase() + month.substring(1);
            setSelectDayData({
                habits: historyData[dayIndex].habits,
                day: `${weekdayUppercase + day.format(", D")} de ${monthUppercase} de ${day.format(
                    "YYYY"
                )}`,
            });
            setShowDetails(true);
        }
    }
    return (
        <HabitsMain>
            <HabitsHeader>Histórico</HabitsHeader>
            <StyledCalendar
                locale="pt-br"
                calendarType="US"
                formatDay={(locale, date) => dayjs(date).format("DD")}
                tileClassName={({ activeStartDate, date }) => highlightDays(activeStartDate, date)}
                onClickDay={(value, event) => handleClickDay(value, event)}
            />
            {selectDayData && (
                <Modal
                    showModal={showDetails}
                    setShowModal={setShowDetails}
                    data={selectDayData.habits}
                >
                    {selectDayData.day}
                </Modal>
            )}
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
