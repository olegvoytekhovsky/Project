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
import by.intexsoft.oleg.service.ForumService;
import by.intexsoft.oleg.service.UserService;

/**
 * Class where methods returns domain objects
 */
@RestController
public class ForumController {
	@Autowired
	private ForumService forumService;
	@Autowired
	private UserService userService;
	private static final Logger LOGGER = LoggerFactory.getLogger(ForumController.class);
	private boolean checkInvalidUsers = false;
	private List<User> listValidUsers = new ArrayList<User>();

	@RequestMapping("/get/forums")
	private List<Forum> getForums() {
		LOGGER.info("Start to load all forums");
		return forumService.findAll();
	}

	@RequestMapping(value = "/forum/invite/users", method = RequestMethod.POST)
	private String inviteUsers(@RequestBody String usersNames) {
		LOGGER.info("Start to check valid user name");
		listValidUsers = new ArrayList<User>();
		boolean check = false;
		String[] arrUsersNames = usersNames.split(",");
		List<String> namesInvalidUsers = new ArrayList<String>();
		List<User> listAllUsers = new ArrayList<User>();
		listAllUsers = userService.findAll();
		for (int index = 0; index < arrUsersNames.length; index++) {
			for (int index2 = 0; index2 < listAllUsers.size(); index2++) {
				if (arrUsersNames[index].trim().equals(listAllUsers.get(index2).name)) {
					check = true;
					listValidUsers.add(listAllUsers.get(index2));
					break;
				}
			}
			if (check == false) {
				namesInvalidUsers.add(arrUsersNames[index]);
			}
			check = false;

		}
		if (namesInvalidUsers.size() > 0) {
			usersNames = String.join(", ", namesInvalidUsers);
			usersNames = "Invalid user name: " + usersNames;
			checkInvalidUsers = true;
			return usersNames;

		}
		usersNames = "";
		return usersNames;
	}

	@RequestMapping(value = "/add/forum", method = RequestMethod.POST)
	private Forum addForum(@RequestBody Forum forum) {
		LOGGER.info("Start to add forum to database");
		if (checkInvalidUsers == false) {
			User user = new User();
			for (int index = 0; index < listValidUsers.size(); index++) {
				user = listValidUsers.get(index);
				forum.addUser(user);
				userService.delete(listValidUsers.get(index));
			}
			forumService.save(forum);
			return forum;
		}
		checkInvalidUsers = false;
		return forum;
	}
}
