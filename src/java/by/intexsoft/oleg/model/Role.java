package by.intexsoft.oleg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 * class is entity and fit table="roles"
 */
@Entity
@Table(name = "roles")
public class Role extends AbstractPersistable<Integer> {

	/**
	 * name fit column "name" in table
	 */
	@Column
	public String name;
}
