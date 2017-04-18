package by.intexsoft.oleg.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import by.intexsoft.oleg.model.User;

/**
 * UserRepository is repository and declare method find all, find by name, save
 * and delete {@link User} entities
 */
public interface UserRepository extends JpaRepository<User, String> {
	/**
	 * Returns all instances of the type {@link User}
	 * 
	 * @return List {@link User}s
	 */
	List<User> findAll();
	
	/**
	 * Returns instance of the type {@link User} by username
	 * 
	 * @return {@link User}
	 */
	@Query("select u from User u where u.username = ?1")
	User findByUsername(String username);

	/**
	 * Save entity of the type {@User}
	 * 
	 * @return saved entity
	 */
	<S extends User> S save(S user);

	/**
	 * Delete entity of the type {@link User}
	 */
	void delete(User user);
}
