package by.intexsoft.oleg.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import by.intexsoft.oleg.model.Forum;

/**
 * ForumRepository is repository and declare method find all, find by id and
 * save {@link Forum} entities
 */
public interface ForumRepository extends JpaRepository<Forum, Integer> {
	/**
	 * Save entity of the type {@Forum}
	 * 
	 * @return saved entity
	 */
	<S extends Forum> S save(S forum);

	/**
	 * Returns instance of the type {@link Forum} by title
	 * 
	 * @return {@link Forum} instance
	 */
	@Query("select u from Forum u where u.title = ?1")
	Forum findByTitle(String title);
	
	/**
	 * Returns instance of the type {@link Forum} by id
	 * 
	 * @return {@link Forum} instance
	 */
	@Query("select u from Forum u where u.id = ?1")
	Forum findById(int id);

	/**
	 * Returns all instances of the type {@link Forum}
	 * 
	 * @return List {@link Forum}s
	 */
	List<Forum> findAll();

}
