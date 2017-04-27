package by.intexsoft.oleg;
     
import by.intexsoft.oleg.model.Forum;
import by.intexsoft.oleg.service.ForumService;
import org.junit.Test;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
      
import static org.junit.Assert.assertNotNull;

/**
 * Test class, use Spring's JUnit facilites
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/jpaContextTest/jpaContext.xml")
public class ForumServiceTest {
    @Autowired 
    private ForumService forumService;
    private Forum forum = new Forum("News forum", "public");

    /**
     * Save entity before run tests
     */
    @Before
    public void createForum() {
        forumService.save(forum);
    }

    /**
     * Delete entity after run tests
     */
    @After
    public void deleteForum() {
      forumService.delete(forum.getId());
    }

    /**
     * Asserts that forumService is not null
     */
    @Test
    public void testIsNullForumService() {
        assertNotNull(forumService);
    }

    /**
     * Asserts that returned instance is not null
     */
    @Test
    public void testFindForum() {
        assertNotNull(forumService.findById(forum.getId()));
    }
}
