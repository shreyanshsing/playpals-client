import newStyled from "@emotion/styled";
import { SxProps } from "@mui/material";

export const HomepageImage = newStyled.img`
    width: 100%;
    height: auto;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const containerSxProps: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    margin: "0px auto",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "2rem",

    "@media (max-width: 768px)": {
        width: "100%",
        height: "100vh",
    }
};