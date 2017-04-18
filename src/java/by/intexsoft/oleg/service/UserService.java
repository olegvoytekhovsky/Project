package by.intexsoft.oleg.service;

import java.util.List;
import by.intexsoft.oleg.model.User;

/**
 * Declare methods to provide find all, find by id and save {@link User}
 * instances
 */
public interface UserService {
	/**
	 * Find all {@link User}s
	 * 
	 * @return List {@link User}s
	 */
	List<User> findAll();

	/**
	 * Find {@link User} by username
	 * 
	 * @return {@link User}
	 */
	User findByUsername(String username);

	/**
	 * Save {@link User}
	 */
	void save(User user);

	/**
	 * Delete {@link User}
	 */
	void delete(User user);
}
