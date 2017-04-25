package by.intexsoft.oleg.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import by.intexsoft.oleg.model.Forum;

/**
 * ForumRepository is repository and declare methods find all, find by id, find by title and
 * save, delete {@link Forum} entities
 */
public interface ForumRepository extends JpaRepository<Forum, Integer> {
	/**
	 * Save entity of the type {@Forum}
	 * 
	 * @return saved entity
	 */
	<S extends Forum> S save(S forum);

	/**
	 * @return instance of the type {@link Forum} by title
	 */
	@Query("select u from Forum u where u.title = ?1")
	Forum findByTitle(String title);
	
	/**
	 * @return instance of the type {@link Forum} by id
	 */
	@Query("select u from Forum u where u.id = ?1")
	Forum findById(int id);

    /**
     * Find id all private user's forums
     *
     * @return list of {@link Forum}'s id
     */
    @Query("select f.id from Forum f join f.users u where f.visibility = 'private' and u.username = ?1")
    List<Integer> findForumId(String username);

    /**
     * Find list<{@link Forum}> by visibility and username 
     */
    @Query("select f from Forum f join f.users u where f.visibility = ?1 and u.username = ?2")
    List<Forum> findByVisibilityAndUsername(String visibility, String username);

	/**
	 * Returns all instances with visibility public of the type {@link Forum}
	 * 
	 * @return List {@link Forum}s
	 */
    @Query("select f from Forum f where f.visibility = 'public'")
	List<Forum> findAll();

    /**
     *  Delete {@link Forum} by id
     */
    void delete(int id);

}
