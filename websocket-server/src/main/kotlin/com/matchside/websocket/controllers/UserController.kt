package com.matchside.websocket.controllers

import com.matchside.websocket.models.User
import com.matchside.websocket.services.UserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {
    @GetMapping
    fun index(): List<User> = userService.getAll()

    @GetMapping("/{id}")
    fun index(@PathVariable("id") id: String): User = userService.getUserById(id)

    @PostMapping
    fun post(@RequestBody user: User) = userService.createUser(user)

    @PutMapping
    fun put(@RequestBody user: User) = userService.updateUser(user)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: String) = userService.deleteUser(id)
}