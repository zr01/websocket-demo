package com.matchside.websocket.controllers

import com.matchside.websocket.models.Message
import com.matchside.websocket.services.MessageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/messages")
class MessageController(private val messageService: MessageService) {
    @GetMapping
    fun index(): List<Message> = messageService.getAll()

    @GetMapping("/{id}")
    fun index(@PathVariable("id") id: String): Message = messageService.getMessageById(id)

    @PostMapping
    fun post(@RequestBody message: Message) = messageService.createMessage(message)

    @PutMapping
    fun put(@RequestBody message: Message) = messageService.updateMessage(message)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: String) = messageService.deleteMessage(id)
}