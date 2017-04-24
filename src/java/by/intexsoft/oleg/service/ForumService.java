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
     * Delete {@link Forum} instance by id
     */
    void delete(int id);

	/**
	 * Find {@link Forum} instance by id
	 * 
	 * @return {@link Forum}
	 */
	Forum findById(int id);

	/**
	 * Find {@link Forum} instance by title
	 * 
	 * @return {@link Forum}
	 */
	Forum findByTitle(String title);

    /**
     * Find {@link Forum}'s id by username
     */
    List<Integer> findForumId(String username);

    /**
     * Find List<{@link Forum}> by visibility and username
     */
    List<Forum> findByVisibilityAndUsername(String visibility, String username);

	/**
	 * Find all {@link Forum} instances with visibility public
	 * 
	 * @return List<{@link Forum}>
	 */
	List<Forum> findAll();
}
