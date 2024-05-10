import { Message } from "@app/types/Message";
import { Avatar, Box, Typography } from "@mui/material";
import { FC } from "react";

const actionTypes = ["joined", "left"];

export const ChatMessage: FC<Message> = ({ userId, type, content = "" }) => {
  return (
    <Box display="flex" gap={2} alignItems="center" padding={2}>
      {actionTypes.some((x: string) => x === type) ? (
        <Typography>
          {userId} {type}
        </Typography>
      ) : (
        <>
          <Avatar>{userId[0]}</Avatar>
          <Typography>{content}</Typography>
        </>
      )}
    </Box>
  );
};
