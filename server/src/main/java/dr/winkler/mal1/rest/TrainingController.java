package dr.winkler.mal1.rest;

import dr.winkler.mal1.dao.TrainingDAO;
import dr.winkler.mal1.entity.Training;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
public class TrainingController {
    private final TrainingDAO dao;

    @Autowired
    public TrainingController(TrainingDAO dao) {
        this.dao = dao;
    }

    @PostMapping("")
    public Training postTraining(@RequestBody Training next) {
        return dao.save(next);
    }

    @GetMapping("")
    public List<Training> getTrainings() {
        return dao.getAll();
    }
}
