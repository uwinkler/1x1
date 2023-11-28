package dr.winkler.mal1.dao;

import dr.winkler.mal1.entity.Student;
import dr.winkler.mal1.repository.StudentRepository;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public class StudentDAO {

    Logger logger = LoggerFactory.getLogger(StudentDAO.class);


    private final EntityManager entityManager;
    private final StudentRepository studentRepository;

    public StudentDAO(EntityManager entityManager, StudentRepository studentRepository) {
        this.entityManager = entityManager;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public void save(Student student) {
        entityManager.persist(student);
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public void deleteAll() {
        studentRepository.deleteAllInBatch();
    }
}
