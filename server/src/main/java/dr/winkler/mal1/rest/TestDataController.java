package dr.winkler.mal1.rest;

import dr.winkler.mal1.dao.CardDAO;
import dr.winkler.mal1.dao.StudentDAO;
import dr.winkler.mal1.dao.TrainingDAO;
import dr.winkler.mal1.entity.Card;
import dr.winkler.mal1.entity.Student;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestDataController {
    private static final Logger logger = LoggerFactory.getLogger(TestDataController.class);
    private final EntityManager entityManager;
    private final CardDAO cardDAO;
    private final StudentDAO studentDAO;
    private final TrainingDAO trainingDAO;

    @Autowired
    public TestDataController(CardDAO cardDAO, StudentDAO studentDAO, TrainingDAO trainingDAO, EntityManager entityManager) {
        this.cardDAO = cardDAO;
        this.studentDAO = studentDAO;
        this.entityManager = entityManager;
        this.trainingDAO = trainingDAO;
    }

    @GetMapping("/reset")
    @Transactional
    public String reset() {
        clearTables();

        // Mara + Jakob
        Student mara = new Student();
        mara.setName("Mara");
        mara.setImgUrl("/assets/mara.jpg");

        Student jakob = new Student();
        jakob.setName("Jakob");
        jakob.setImgUrl("/assets/jakob.jpg");
        
        studentDAO.save(mara);
        studentDAO.save(jakob);

        // Cards
        insertCards(mara);
        insertCards(jakob);

        return "Done";
    }

    private void clearTables() {
        cardDAO.deleteAll();
        studentDAO.deleteAll();
        trainingDAO.deleteAll();
    }

    public void insertCards(Student student) {
        for (int i = 1; i <= 10; i++) {
            for (int j = 1; j <= 10; j++) {
                Card card = new Card();
                card.setStudent(student);
                card.setFaktorOne(i);
                card.setFaktorTwo(j);
                card.setLevel(1);
                entityManager.persist(card);
            }
        }
        entityManager.flush();
        entityManager.clear();
    }
}
