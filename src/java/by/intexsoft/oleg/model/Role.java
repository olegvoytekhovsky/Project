package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 * Class is entity and specifies the table name where data of this entity is to be persisted
 */
@Entity
@Table(name = "roles")
public class Role extends AbstractPersistable<Integer> {

	/**
	 * Specify the details of the column to which a field will be mapped
	 */
	@Column
	public String name;

    private Role() {
    }

    /**
     * Constructor provides to assign a parameter to a field
     */
    public Role(String name) {
        this.name = name;
    }
}
