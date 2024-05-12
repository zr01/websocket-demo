package com.matchside.websocket.controllers

import com.matchside.websocket.models.Message
import com.matchside.websocket.models.User
import com.matchside.websocket.models.UserActionDto
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class ChatController {
    @MessageMapping("/join")
    @SendTo("/topic/users")
    fun joinChannel(@Payload user: User): UserActionDto {
        print(user)
        return UserActionDto(user, "joined")
    }

    @MessageMapping("/left")
    @SendTo("/topic/users")
    fun leftChannel(@Payload user: User): UserActionDto {
        print(user)
        return UserActionDto(user, "left")
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    fun sendMessage(@Payload chatMessage: Message): Message {
        print(chatMessage);
        return chatMessage;
    }
}