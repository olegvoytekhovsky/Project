package by.intexsoft.oleg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import by.intexsoft.oleg.model.Role;
import by.intexsoft.oleg.repository.RoleRepository;
import by.intexsoft.oleg.service.RoleService;

/**
 * Class implements interface {@link RoleService} and class is a service
 */
@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleRepository roleRepository;

	/**
	 * Implementation of method {@link RoleService#findByName()}
	 */
	public Role findByName(String name) {
		return roleRepository.findByName(name);
	}
}    
