package com.matchside.websocket.services

import com.matchside.websocket.models.Message
import com.matchside.websocket.repositories.MessageRepository
import org.apache.coyote.BadRequestException
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class MessageService(private val messageRepository: MessageRepository) {
    fun getAll(): List<Message> = messageRepository.findAll().toList()

    fun getMessageById(id: String): Message {
        return messageRepository.findByIdOrNull(id) ?: throw NotFoundException()
    }

    fun createMessage(message: Message) {
        if (message.id != null) throw BadRequestException("ID must be assigned by database")
        messageRepository.save(message)
    }

    fun updateMessage(message: Message) {
        if (message.id == null) throw BadRequestException("ID has not been provided")
        messageRepository.findByIdOrNull(message.id!!) ?: throw NotFoundException()
        messageRepository.save(message)
    }

    fun deleteMessage(id: String) = messageRepository.deleteById(id)
}