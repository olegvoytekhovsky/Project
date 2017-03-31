package by.intexsoft.oleg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import by.intexsoft.oleg.model.Forum;
import by.intexsoft.oleg.repository.ForumRepository;
import by.intexsoft.oleg.service.ForumService;

/**
 * Class implements interface {@link ForumService} and class is a Service with
 * name ("forumService")
 */
@Service("forumService")
public class ForumServiceImpl implements ForumService {
	@Autowired
	private ForumRepository forumRepository;

	/**
	 * Implementation of method {@link ForumService#save()}
	 */
	public void save(Forum forum) {
		forumRepository.save(forum);
	}

	/**
	 * Implementation of method {@link ForumService#findById()}
	 * 
	 * @return {@link Forum} instance
	 */
	public Forum findById(int id) {
		return forumRepository.findById(id);
	}

	/**
	 * Implementation of method {@link ForumService#findAll()}
	 * 
	 * @return List {@link Forum}s
	 */
	public List<Forum> findAll() {
		return forumRepository.findAll();
	}
}
