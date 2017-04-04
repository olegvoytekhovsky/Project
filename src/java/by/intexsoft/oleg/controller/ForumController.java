package by.intexsoft.oleg.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import java.util.ArrayList;
import by.intexsoft.oleg.model.Forum;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.model.Message;
import by.intexsoft.oleg.service.ForumService;
import by.intexsoft.oleg.service.UserService;

/**
 * class where methods returns domain objects
 */
@RestController
public class ForumController {
	@Autowired
	private ForumService forumService;
	@Autowired
	private UserService userService;
	private static final Logger LOGGER = LoggerFactory.getLogger(ForumController.class);
	private boolean checkInvalidUsers = false;
	private List<User> usersValid = new ArrayList<User>();

	@RequestMapping("/get/forums")
	private List<Forum> getForums() {
		LOGGER.info("Start to load all forums");
		return forumService.findAll();
	}

	@RequestMapping(value = "/forum/invite/users", method = RequestMethod.POST)
	private String inviteUsers(@RequestBody String userNames) {
		LOGGER.info("Start to check valid user name");
		usersValid = new ArrayList<User>();
		boolean namesEquals = false;
		String[] arrUserNames = userNames.split(",");
		List<String> invalidNames = new ArrayList<String>();
		List<User> allUsers = new ArrayList<User>();
		allUsers = userService.findAll();
		for (String name : arrUserNames) {
			for (User user : allUsers) {
				if (name.trim().equals(user.name)) {
					usersValid.add(user);
					namesEquals = true;
					break;
				}
			}
			if (namesEquals == false) {
				invalidNames.add(name);
			}
			namesEquals = false;
		}
		if (invalidNames.size() > 0) {
			userNames = String.join(", ", invalidNames);
			userNames = "Invalid user names: " + userNames;
			checkInvalidUsers = true;
			return userNames;
		}
		userNames = "";
		return userNames;
	}

	@RequestMapping(value = "/add/forum", method = RequestMethod.POST)
	private Forum addForum(@RequestBody Forum forum) {
		LOGGER.info("Start to add forum to database");
		if (checkInvalidUsers == false) {
			List<Message> messages = new ArrayList<Message>();
			for (int index = 0; index < usersValid.size(); index++) {
				User user = new User(usersValid.get(index).name);
				for (Message message : usersValid.get(index).getMessages()) {
					user.addMessage(new Message(message.getMessage()));
				}
				forum.addUser(user);
				userService.delete(usersValid.get(index));
				if (index == usersValid.size() - 1) {
					forumService.save(forum);
					return forum;
				}
			}
		}
		checkInvalidUsers = false;
		return forum;
	}
}
