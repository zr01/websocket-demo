package com.matchside.websocket.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("USERS")
data class User(@Id var id: String?, val name: String)
