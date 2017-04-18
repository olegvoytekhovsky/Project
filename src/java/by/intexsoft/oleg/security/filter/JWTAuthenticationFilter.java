package by.intexsoft.oleg.security.filter;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.security.core.Authentication;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import by.intexsoft.oleg.security.service.TokenAuthenticationService;
import java.io.IOException;

/**
 * Class is intercept all requests to validate the presence of the JWT
 */
public class JWTAuthenticationFilter extends GenericFilterBean {
	/**
	 * Intercept all requests to validate the presence of the JWT
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		Authentication authentication = TokenAuthenticationService.getAuthentication((HttpServletRequest) request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);
	}

}
