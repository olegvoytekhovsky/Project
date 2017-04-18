package by.intexsoft.oleg.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.repository.UserRepository;
import by.intexsoft.oleg.service.UserService;

/**
 * Class implements interface {@link UserService} and class is a Service with
 * name ("userService")
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	/**
	 * Implementation of method {@link UserService#findAll()}
	 * 
	 * @return List {@link User}s
	 */
	public List<User> findAll() {
		return userRepository.findAll();
	}

	/**
	 * Implementation of method {@link UserService#findByUsername()}
	 * 
	 * @return {@link User} instance
	 */
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	/**
	 * Implementation of method {@link UserService#save()}
	 */
	public void save(User user) {
		userRepository.save(user);
	}

	/**
	 * Implementation of method {@link UserService#delete()}
	 */
	public void delete(User user) {
		userRepository.delete(user);
	}

}
