package com.matchside.websocket.models

import com.matchside.websocket.enums.MessageType
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.util.Date

@Table("MESSAGES")
data class Message(@Id var id: String?, var date: Date? = Date(), val userId: String, val type: MessageType, val content: String?)
