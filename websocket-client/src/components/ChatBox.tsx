"use client";
import { useSocket } from "@app/hooks/SocketContext";
import { Message } from "@app/types/Message";
import { User, UserAction } from "@app/types/User";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Card,
  Divider,
  Fab,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import { ChatMessage } from "./ChatMessage";
import { MessageBox } from "./MessageBox";

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAutoScroll, setShowAutoScroll] = useState<boolean>(false);

  const msgListRef = useRef<HTMLDivElement>();

  const socketOptions = {
    subscriptions: {
      "/topic/messages": (message: Stomp.Message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      },
      "/topic/users": (message: Stomp.Message) => {
        const receivedUser = JSON.parse(message.body) as UserAction;
        setMessages((prev) => [
          ...prev,
          { userId: receivedUser.name, type: receivedUser.action },
        ]);
        setUsers((prevUsers) =>
          [...prevUsers, receivedUser].sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
          )
        );
      },
    },
    onDisconnect: () => setUsers([]),
  };

  const { client: stompClient, userId, isConnected } = useSocket(socketOptions);

  const sendMessage = (type: string, msg: string, callback: () => void) => {
    if (!msg.trim()) return;
    const chatMessage: Message = {
      type,
      content: msg,
      userId,
    };

    try {
      stompClient?.send("/app/chat", {}, JSON.stringify(chatMessage));
    } catch (err) {
      console.error(err);
    }
    if (typeof callback !== "undefined") callback();
  };

  function scrollMsgList(behavior: "instant" | "smooth" = "instant") {
    msgListRef.current?.scrollTo({
      top: msgListRef.current.scrollHeight,
      behavior,
    });
  }

  useEffect(() => {
    if (!msgListRef.current || showAutoScroll) return;
    scrollMsgList();
  }, [messages, showAutoScroll]);

  useEffect(() => {
    if (!msgListRef.current) return;
    msgListRef.current.addEventListener("scroll", () => {
      if (!msgListRef.current) return;
      setShowAutoScroll(
        msgListRef.current.scrollTop + msgListRef.current.clientHeight <
          msgListRef.current.scrollHeight
      );
    });
    msgListRef.current?.scrollTop;
  }, [msgListRef]);

  return (
    <Card elevation={1} sx={{ width: 2 / 3, position: "relative" }}>
      {!isConnected && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            userSelect: "none",
          }}
        >
          Disconnected
        </Box>
      )}
      <Typography variant="h4" px={2} py={1}>
        Chat
      </Typography>
      <Box display="flex" gap={1}>
        <Box
          component="section"
          id="messages"
          position="relative"
          width={9 / 12}
        >
          <Box
            id="messages-container"
            ref={msgListRef}
            sx={{
              height: 250,
              overflow: "hidden scroll",
            }}
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                userId={msg.userId}
                content={msg.content}
                type={msg.type}
              />
            ))}
          </Box>
          {showAutoScroll && (
            <Fab
              size="small"
              color="primary"
              aria-label="scroll-to-bottom"
              onClick={() => scrollMsgList("smooth")}
              disableRipple
              sx={{
                position: "absolute",
                top: "auto",
                right: "1rem",
                bottom: "0.5rem",
              }}
            >
              <KeyboardArrowDownIcon />
            </Fab>
          )}
        </Box>
        <Box component="section" id="users" width={3 / 12}>
          <Typography>Currently online</Typography>
          <List>
            {users.map((user, index) => (
              <ListItem key={index}>{user.name}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Divider />
      <MessageBox sendMessage={sendMessage} disabled={!isConnected} />
    </Card>
  );
}
