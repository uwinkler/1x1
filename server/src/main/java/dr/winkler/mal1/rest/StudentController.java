package dr.winkler.mal1.rest;

import dr.winkler.mal1.dao.CardDAO;
import dr.winkler.mal1.dao.StudentDAO;
import dr.winkler.mal1.dao.TrainingDAO;
import dr.winkler.mal1.entity.Card;
import dr.winkler.mal1.entity.Student;
import dr.winkler.mal1.entity.Training;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentDAO studentDAO;
    private final CardDAO cardDAO;
    private final TrainingDAO trainingDAO;

    @Autowired
    public StudentController(StudentDAO studentDAO, CardDAO cardDAO, TrainingDAO trainingDAO) {
        this.studentDAO = studentDAO;
        this.cardDAO = cardDAO;
        this.trainingDAO = trainingDAO;
    }

    @GetMapping("")
    public List<Student> getStudents() {
        return studentDAO.getAll();
    }

    @GetMapping("/{studentId}/cards")
    public List<Card> getCardsByStudentId(@PathVariable String studentId) {
        return cardDAO.getAllByStudentId(studentId);
    }

    @GetMapping("/{studentId}/trainings")
    public List<Training> getTrainingsByStudentId(@PathVariable String studentId) {
        return trainingDAO.getAllByStudentId(studentId);
    }
}
