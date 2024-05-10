package com.matchside.websocket.services

import com.matchside.websocket.models.User
import com.matchside.websocket.repositories.UserRepository
import org.apache.coyote.BadRequestException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService(@Autowired private val userRepository: UserRepository) {
    fun getAll(): List<User> = userRepository.findAll().toList()

    fun getUserById(id: String): User {
        return userRepository.findByIdOrNull(id) ?: throw NotFoundException()
    }

    fun createUser(user: User) {
        if (user.id != null) throw BadRequestException("ID must be assigned by database")
        userRepository.save(user)
    }

    fun updateUser(user: User) {
        if (user.id == null) throw BadRequestException("ID has not been provided")
        userRepository.findByIdOrNull(user.id!!) ?: throw NotFoundException()
        userRepository.save(user)
    }

    fun deleteUser(id: String) = userRepository.deleteById(id)
}