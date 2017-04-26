package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.jpa.domain.AbstractPersistable;
import by.intexsoft.oleg.model.User;

/**
 * Class is entity and specifies the table name where data of this entity is to
 * be persisted
 */
@Entity
@Table(name = "messages")
public class Message extends AbstractPersistable<Integer> implements Comparable<Message> {
   	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String message;

    /**
     * Association mapping to {@link User}
     */
    @ManyToOne
    @JoinColumn(name = "username")
    public User user;

	private Message() {

	}

	/**
	 * Constructor provides to asign a parameter to a field
	 */
	public Message(String message) {
		this.message = message;
	}

	/**
     * Getter method
	 * @return String {@link #message}
	 */
	public String getMessage() {
		return message;
	}

    /**
     * Overrides for method {@link Collectons#sort()}
     * Compare messages by id
     */
    @Override
    public int compareTo(Message otherMessage) {
        return getId() > otherMessage.getId() ? 1 : getId() == otherMessage.getId() ? 0 : -1;
    }

}
