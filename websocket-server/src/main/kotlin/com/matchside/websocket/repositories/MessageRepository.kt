package com.matchside.websocket.repositories

import com.matchside.websocket.models.Message
import org.springframework.data.repository.CrudRepository

interface MessageRepository : CrudRepository<Message, String>