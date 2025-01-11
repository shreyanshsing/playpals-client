import { SxProps } from "@mui/material";

export const gridSxProps = (color: string): SxProps => {
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: color,
        boxShadow: 2,
        height: 100,
        width: 100,
        cursor: "pointer",
    };
}