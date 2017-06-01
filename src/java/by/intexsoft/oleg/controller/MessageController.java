package by.intexsoft.oleg.controller;

import java.util.List;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import by.intexsoft.oleg.model.Forum;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.model.Message;
import by.intexsoft.oleg.service.ForumService;
import by.intexsoft.oleg.service.UserService;

/**
 * class where methods returns domain objects
 */
@RestController
public class MessageController {
	@Autowired
	private ForumService forumService;	
	@Autowired
	private UserService userService;
	@Autowired
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@RequestMapping(value = "/get/forum/message/{id}")
	private List<Message> getForumMessages(@PathVariable int id) {
		LOGGER.info("Start to load forum's messages");
		List<Message> messages = forumService.findById(id).getMessages();
        Collections.sort(messages);
		return messages;
	}	

	@RequestMapping(value = "/save/forum/message/{id}/{username}", method = RequestMethod.POST)
	private Message saveForumMessage(@PathVariable int id, @PathVariable String username, @RequestBody String mes) {
		LOGGER.info("Start to save forum's message");
		Forum forum = forumService.findById(id);
        Message message = new Message(mes);
        message.user = userService.findByUsername(username);
		forum.addMessage(message);
		forumService.save(forum);
		return message; 
	}
}
