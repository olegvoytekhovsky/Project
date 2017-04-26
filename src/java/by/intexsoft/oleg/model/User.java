package by.intexsoft.oleg.model;

import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;
import java.util.HashSet;
import java.util.Comparator;
import org.springframework.data.jpa.domain.AbstractPersistable;
import by.intexsoft.oleg.model.Message;

/**
 * Class is entity and specifies the table name where data of this entity is to be persisted
 */
@Entity
@Table(name = "users")
public class User implements Comparable<User> {
	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Id
	public String username;
	
	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String password;
    
    /**
     * Specify the details of the column to which a field will be mapped
     */
    @Column
    public String firstname;

    /**
     * Specify the details of the column to which a field will be mapped
     */
    @Column
    public String lastname;

	/**
	 * {@link User}'s {@link Forum}s
	 */
    @JsonIgnore
	@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
	public Set<Forum> forums = new HashSet<Forum>();
	
	/**
	 * {@link User}'s friends
	 */
    @JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_friends", joinColumns = @JoinColumn(name = "username"), inverseJoinColumns = @JoinColumn(name = "username_friend"))
	public Set<User> friends = new HashSet<User>();

    /**
     * Mapped by {@link #friends} as bidirectional relationship
     */
    @JsonIgnore   
	@ManyToMany(mappedBy = "friends", fetch = FetchType.EAGER)
	public Set<User> teammates = new HashSet<User>();

    /**
     * Association mapping to {@link Role}
     */
	@ManyToOne
	@JoinColumn(name = "role_id")
	public Role role;
	
	
	private User() {

	}

	/**
	* Constructor provides to assign a parameter to a field
	*/
	public User(String username) {
		this.username = username;
	}
	
	/**
	*Constructor provides to assign parameters to fields
	*/
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

    /**
     * Overrides for method {@link Collectons#sort()}
     * Lexicographic compares {@link #username} with other {@link User} username
     */
    @Override
    public int compareTo(User otherUser) {
        return username.compareTo(otherUser.username);
    }
}
