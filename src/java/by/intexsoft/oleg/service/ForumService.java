package by.intexsoft.oleg.service;

import java.util.List;
import by.intexsoft.oleg.model.Forum;

/**
 * Declare methods to provide find all, find by id, save, delete {@link Forum} instances
 */
public interface ForumService {
	/**
	 * Save {@link Forum} instance
	 */
	void save(Forum forum);

	/**
	 * Find {@link Forum} instance by id
	 * 
	 * @return {@link Forum}
	 */
	Forum findById(int id);

	/**
	 * Find all {@link Forum} instances
	 * 
	 * @return List<{@link Forum}>
	 */
	List<Forum> findAll();
}
