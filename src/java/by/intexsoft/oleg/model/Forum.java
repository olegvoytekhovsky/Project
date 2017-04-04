package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.jpa.domain.AbstractPersistable;
import by.intexsoft.oleg.model.User;

/**
 * Class is entity and specifies the table name where data of this entity is to
 * be persisted
 */
@Entity
@Table(name = "forums")
public class Forum extends AbstractPersistable<Integer> {
	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String title;

	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String description;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "forums_users", joinColumns = @JoinColumn(name = "forum_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> users;

	/**
	 * Add {@link User} instance to a list {@link User}s
	 */
	public void addUser(User user) {
		if(users == null)		
			users = new ArrayList<User>();
		this.users.add(user);
	}

}
