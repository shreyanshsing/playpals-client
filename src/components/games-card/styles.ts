import { SxProps } from "@mui/material";

export const cardContainerSxProps: SxProps = {
    margin: "1rem",
    ':hover': {
        transform: "scale(1.02)",
        transition: "transform 0.5s",
    },
};

export const imageContainerSxProps = (imagePath: string) => {
    return {
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "150px",
        width: "100%",
    }
}

export const cardContentSxProps: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
};

export const ratingSxProps: SxProps = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    padding: "1rem",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
};