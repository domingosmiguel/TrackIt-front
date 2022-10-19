import { useParams } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

export default function LoggedPage({ loginData }) {
    const { route } = useParams();
    console.log("🚀 ~ file: LoggedPage.jsx ~ line 8 ~ LoggedPage ~ route", route);
    if (loginData === null) {
        return (
            <>
                <Header isLogged={false} />
                <Footer />
            </>
        );
    }
    return (
        <>
            <Header userImage={loginData.image} />
            <Footer />
        </>
    );
}
