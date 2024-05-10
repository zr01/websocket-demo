package com.matchside.websocket.repositories

import com.matchside.websocket.models.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, String>;