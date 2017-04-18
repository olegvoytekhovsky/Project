package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 * Class is entity and specifies the table name where data of this entity is to
 * be persisted
 */
@Entity
@Table(name = "messages")
public class Message extends AbstractPersistable<Integer> {
   	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String message;

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

}
