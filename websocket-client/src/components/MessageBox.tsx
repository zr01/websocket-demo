import { Box, Button, Card, TextField } from "@mui/material";
import { FC, FormEvent, useRef } from "react";

interface MessageBoxProps {
  sendMessage: (type: string, content: string, callback: () => void) => void;
  disabled?: boolean;
}

export const MessageBox: FC<MessageBoxProps> = ({ disabled, sendMessage }) => {
  const textInputRef = useRef<HTMLInputElement>();

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage("say", `${textInputRef?.current?.value}`, function () {
      if (!textInputRef.current) return;
      textInputRef.current.value = "";
      textInputRef.current.focus();
    });
  }

  return (
    <Card elevation={0}>
      <Box
        component="form"
        onSubmit={handleSend}
        display="flex"
        alignItems="center"
      >
        <TextField
          color="primary"
          inputRef={textInputRef}
          InputProps={{ autoComplete: "off" }}
          disabled={disabled}
          fullWidth
        />
        <Button type="submit" sx={{ alignSelf: "stretch" }} disabled={disabled}>
          Send
        </Button>
      </Box>
    </Card>
  );
};
