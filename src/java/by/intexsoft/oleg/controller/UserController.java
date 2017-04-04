package by.intexsoft.oleg.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping("/get/users")
	private List<User> getUsers() {
		LOGGER.info("Start to load users from database");
		List<User> users = userService.findAll();
		return users;
	}

}
