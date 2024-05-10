import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";

const SOCKET_URL = "http://localhost:8080/ws";

interface SocketProps {
  subscriptions: Record<string, (message: Stomp.Message) => void>;
  onDisconnect?: () => void;
}

export const useSocket = ({ subscriptions, onDisconnect }: SocketProps) => {
  const [stompClient, setStompClient] = useState<Client>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        setIsConnected(true);
        let username = "";
        while (!username) {
          username = prompt("Enter username")?.trim() ?? "";
        }
        setUserId(username);
        client.send("/app/join", {}, JSON.stringify({ name: username }));
        Object.entries(subscriptions).forEach(([topic, callback]) =>
          client.subscribe(topic, callback)
        );
        client.subscribe("disconnect");
      },
      (err) => {
        console.error(err);
      }
    );

    setStompClient(client);

    return () => {
      try {
        client.disconnect(() => {
          setIsConnected(false);
          if (typeof onDisconnect !== "undefined") onDisconnect();
        });
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  return { client: stompClient, userId, isConnected };
};
