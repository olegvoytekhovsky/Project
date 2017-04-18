package by.intexsoft.oleg.controller;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.service.UserService;

/**
 * class where method returns domain object
 */
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@RequestMapping("/get/friends/{username}")
	private Set<User> getUsers(@PathVariable String username) {
		LOGGER.info("Start to load friends from database");
        User user = userService.findByUsername(username);
        user.friends.addAll(user.teammates);
        return user.friends;
    }

    @RequestMapping("/load/user/{username}")
    private User loadUser(@PathVariable String username) {
        LOGGER.info("Start to load user");
        return userService.findByUsername(username);
    }

    @RequestMapping("/find/user/{username}")
    private String findUser(@PathVariable String username) {
        LOGGER.info("Start to find user");
        User user = userService.findByUsername(username);
        if(user == null) 
            return username + " not found";
        return user.username;
    }    

    @RequestMapping("/create/user") 
    private String createUser(@RequestBody User user) {
        LOGGER.info("Start to create user");
        if(userService.findByUsername(user.username) != null)
            return "Busy";
        userService.save(user);
        return "Saved";
    }

}
