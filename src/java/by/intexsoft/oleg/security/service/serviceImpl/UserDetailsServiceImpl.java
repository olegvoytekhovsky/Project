package by.intexsoft.oleg.security.service.serviceImpl;

import org.slf4j.Logger; 
import org.slf4j.LoggerFactory; 
import java.util.Set;
import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import by.intexsoft.oleg.model.User;
import by.intexsoft.oleg.model.Role;
import by.intexsoft.oleg.service.UserService;

/**
 * Override interface method
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserService userService;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
	/**
	 * Locates the user based on the username
	 * 
	 * @return models core user information
	 */
	@Override
	public UserDetails loadUserByUsername(String username) {
		LOGGER.info("Start to load user by username");
        User user = new User(username);
		user = userService.findByUsername(username);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.add(new SimpleGrantedAuthority(user.role.name));
		return new org.springframework.security.core.userdetails.User(user.username, user.password, grantedAuthorities);
	}
}
