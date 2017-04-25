package by.intexsoft.oleg.service;

import by.intexsoft.oleg.model.Role;

/**
 * Declare methods to provide find {@link Role} instance by name
 */
public interface RoleService {
	/**
	 * Find {@link Role} instance by name
	 * 
	 * @return {@link Role}
	 */
	Role findByName(String name);
}
