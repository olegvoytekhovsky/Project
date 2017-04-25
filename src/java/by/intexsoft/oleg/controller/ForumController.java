package by.intexsoft.oleg.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import by.intexsoft.oleg.model.Forum;
import by.intexsoft.oleg.model.Message;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.repository.ForumRepository;
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
	@Autowired
	private ForumRepository forumRepository;
	private static final Logger LOGGER = LoggerFactory.getLogger(ForumController.class);
	private boolean checkInvalidUsers = false;
	private List<User> usersValid = new ArrayList<User>();

    @RequestMapping("/load/forums/public")
    private List<Forum> loadAllForums() {
        LOGGER.info("Start to load public forums");
        return forumService.findAll();
    }
	@RequestMapping("/get/forums/{username}")
	private List<Forum> getForums(@PathVariable String username) {
		LOGGER.info("Start to load user's forums");
		return forumService.findByVisibilityAndUsername("public", username);
	}

	@RequestMapping(value = "/forum/invite/users/{username}", method = RequestMethod.POST)
	private String inviteUsers(@PathVariable String username, @RequestBody String usernames) {
		LOGGER.info("Start to check valid usernames");
		usersValid = new ArrayList<User>();
		boolean namesEquals = false;
        usernames = username + "," + usernames;
		String[] arrUsernames = usernames.split(",");
		List<String> invalidNames = new ArrayList<String>();
		List<User> allUsers = new ArrayList<User>();
		allUsers = userService.findAll();
		for (String name : arrUsernames) {
			for (User user : allUsers) {
                if (name.trim().equals(user.username)) {
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
			usernames = String.join(", ", invalidNames);
			usernames = "Invalid usernames: " + usernames;
			return usernames;
		}
		usernames = "";
		return usernames;
	}

	@RequestMapping(value = "/add/forum", method = RequestMethod.POST)
	private Forum addForum(@RequestBody Forum forum) {
		LOGGER.info("Start to add forum to database");
			for (int index = 0; index < usersValid.size(); index++) 
				forum.addUser(usersValid.get(index));
            forum.visibility = "public";
			forumService.save(forum);
			return forum;
	}

    @RequestMapping(value = "/find/forum/{username}", method = RequestMethod.POST)
    private String findForum(@PathVariable String username, @RequestBody String friendUsername) {
        LOGGER.info("Start to find friendship forum");
        for(Integer id: forumService.findForumId(username)) {
            for(Integer friendId: forumService.findForumId(friendUsername)) {
                if(id.intValue() == friendId.intValue())
                    return id.toString();
            }
        }
        return "No forum's id";
    }

    @RequestMapping("/delete/forum/{id}")
    private int deletePublicForum(@PathVariable int id) {
        LOGGER.info("Start to delete public forum");
        forumService.delete(id);
        return id;
    }
}
