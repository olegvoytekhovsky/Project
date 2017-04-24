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
import java.util.Set;
import java.util.HashSet;
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
    public String visibility;

	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String description;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "forums_users", joinColumns = @JoinColumn(name = "forum_id"), inverseJoinColumns = @JoinColumn(name = "username"))
	private Set<User> users;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "forums_messages", joinColumns = @JoinColumn(name = "forum_id"), inverseJoinColumns = @JoinColumn(name = "message_id"))
	private List<Message> messages;

    /**
     * Constructor provides to assign parameters to fields
     */
    public Forum(String title, String visibility) {
        this.title = title;
        this.visibility = visibility;
    }

    private Forum() {
    }

	/**
	 * Add {@link User} instance to a set of {@link User}s
	 */
	public void addUser(User user) {
		if(users == null)		
			users = new HashSet<User>();
		this.users.add(user);
	}

	/**
	 * Add {@link Message} instance to list of {@link Message}s
	 */
	public void addMessage(Message message) {
		if(messages == null)
			messages = new ArrayList<Message>();
		this.messages.add(message);
	}

	/**
     * Getter method
	 * @return list of all forum's {@Message}s
	 */
	public List<Message> getMessages() {
		return messages;
	};
}
