package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.jpa.domain.AbstractPersistable;
import by.intexsoft.oleg.model.Message;

/**
 * Class is entity and specifies the table name where data of this entity is to be persisted
 */
@Entity
@Table(name = "users")
public class User extends AbstractPersistable<Integer> {
	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String name;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "users_messages", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "message_id"))
	private List<Message> messages;

	/**
	*@return list of all user's {@Message}s
	*/
	public List<Message> getMessages() {
		return messages;
	};

	/**
	* Add {@link Message} instance to a list {@link Message}s
	*/
	public void addMessage(Message message) {
		if(messages == null)
			messages = new ArrayList<Message>();
		this.messages.add(message);
	}
	
	private User() {

	}

	/**
	*Constructor provides to assign a parameter to a field
	*/
	public User(String name) {
		this.name = name;
	}
}
