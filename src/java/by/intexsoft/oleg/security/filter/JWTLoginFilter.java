package by.intexsoft.oleg.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import by.intexsoft.oleg.security.service.TokenAuthenticationService;
import by.intexsoft.oleg.model.User;
import java.io.IOException;

/**
 * Class intercept POST requests and attempt to authenticate the user. When the
 * user is successfully authenticated, it will return a JWT in the Authorization
 * header of the response
 */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {
	/**	
	 *Abstract processor of browser-based HTTP-based authentication requests
	 */
	public JWTLoginFilter(String url, AuthenticationManager authManager) {
		super(new AntPathRequestMatcher(url));
		setAuthenticationManager(authManager);
	}

	/**
	 * Method retrieve the username and password from the request and verify
	 * that these details match with an existing user
	 */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException, IOException, ServletException {
		User user = new ObjectMapper().readValue(req.getInputStream(), User.class);
		return getAuthenticationManager().authenticate(
				new UsernamePasswordAuthenticationToken(user.username, user.password, Collections.emptyList()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {
		TokenAuthenticationService.addAuthentication(res, auth.getName());
	}
}
