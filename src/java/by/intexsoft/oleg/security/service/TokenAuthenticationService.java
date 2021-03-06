package by.intexsoft.oleg.security.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import java.util.Set;
import java.util.List;


/**
 * Class for creation and verification tokens
 */
public class TokenAuthenticationService {
	private static final long EXPIRATIONTIME = 432_000_000;
	private static final String SECRET = "29b4b88d8456e2c11947c50ffff16623294a26869172e8d2f561d64c4bc58821";
	private static final String TOKEN_PREFIX = "Bearer";
	private static final String HEADER_STRING = "Authorization";

	/**
	* Create token
	*/
	public static void addAuthentication(HttpServletResponse res, Authentication auth) {
		Claims claims = Jwts.claims().setSubject(auth.getName());
        Set<String> authorities = AuthorityUtils.authorityListToSet(auth.getAuthorities());
        claims.put("scopes", authorities);
        String JWT = Jwts.builder().setClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();
		res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
	}

	/**
	* Get token from request
	*/
	public static Authentication getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		if (token != null) {
			String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replaceAll(TOKEN_PREFIX, ""))
					.getBody().getSubject();
            List authorities = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replaceAll(TOKEN_PREFIX, ""))
                .getBody().get("scopes", List.class);
            for(int index = 0; index < authorities.size(); index++) {
                System.out.println("Bbbbbbbbbbbb get Authentication" + authorities.get(index));
            }
			return user != null ? new UsernamePasswordAuthenticationToken(user, null, AuthorityUtils.commaSeparatedStringToAuthorityList(String.join(",",authorities))) : null;
		}
		return null;
	}
}
