import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import { gridSxProps } from "./styles";

const TicTacGrid = ({mark, gridSymbolAndColors}: {mark: (index: number) => void, gridSymbolAndColors: {symbol: string, color: string}[]}) => {
    return (
        <Container>
            <Grid2 container spacing={2} mt={5} mb={5}>
                {[...Array(9)].map((_, index) => (
                    <Grid2 key={index} size={4}>
                        <Box sx={gridSxProps(gridSymbolAndColors[index].color)} onClick={() => mark(index)}>
                            <Typography variant="h2" sx={{color: "black"}}>
                                {gridSymbolAndColors[index].symbol}
                            </Typography>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    )
}

export default TicTacGrid;