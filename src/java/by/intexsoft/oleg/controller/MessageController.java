package by.intexsoft.oleg.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.model.Message;
import by.intexsoft.oleg.service.UserService;

/**
 * Class where methods returns domain objects
 */
@RestController
public class MessageController {
	@Autowired
	private UserService userService;
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@RequestMapping("/get/user/message/{id}")
	private List<Message> getUserMessages(@PathVariable int id) {
		LOGGER.info("Start to load user's messages");
		List<Message> messages = userService.findById(id).getMessages();
		return messages;
	}

	@RequestMapping(value = "/save/user/message/{id}", method = RequestMethod.POST)
	private Message saveUsersMessage(@PathVariable int id, @RequestBody Message message) {
		LOGGER.info("Start to save user's message");
		User user = userService.findById(id);
		user.addMessage(message);
		userService.save(user);
		return message;
	}
}
