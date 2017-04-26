package by.intexsoft.oleg;
      
import by.intexsoft.oleg.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
      
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/jpaContext.xml")
public class UserTest {
     
    private UserService userService;

    @Test
    public void testIsNullUserService() {
       assertNotNull(userService); 
    }
}
