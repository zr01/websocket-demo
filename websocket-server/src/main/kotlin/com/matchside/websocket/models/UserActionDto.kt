package com.matchside.websocket.models

import java.util.*

class UserActionDto(user: User, val action: String) {
    val id: String = user.id ?: UUID.randomUUID().toString()
    val name: String = user.name
}
