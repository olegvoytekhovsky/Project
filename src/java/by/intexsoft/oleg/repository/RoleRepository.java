package by.intexsoft.oleg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import by.intexsoft.oleg.model.Role;

/**
 * RoleRepository is repository and declare method find {@link Role} entities by name
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

	/**
	 * @return instance of the type {@link Role} by name
	 */
	@Query("select r from Role r where r.name = ?1")
	Role findByName(String name);
}
