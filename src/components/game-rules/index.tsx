import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { listSxProps } from "./styles";

const GameRules = ({rules}: {rules: string[]}) => {
    return (
        <List sx={listSxProps}>
        <Typography
          variant="h6"
          sx={{ color: "black" }}
          textAlign="center"
          gutterBottom
        >
          Rules
        </Typography>
        {rules?.map((rule: any, index: number) => (
          <ListItem key={index}>
            <Typography
              variant="body2"
              sx={{ color: "black" }}
              textAlign="left"
            >
              {index + 1} {"."} {rule}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
};

export default GameRules;