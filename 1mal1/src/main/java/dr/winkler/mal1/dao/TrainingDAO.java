package dr.winkler.mal1.dao;

import dr.winkler.mal1.entity.Training;
import dr.winkler.mal1.repository.TrainingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public class TrainingDAO {

    private final TrainingRepository trainingRepository;
    Logger logger = LoggerFactory.getLogger(TrainingDAO.class);

    public TrainingDAO(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    @Transactional
    public Training save(Training training) {
        return trainingRepository.save(training);
    }

    public List<Training> getAll() {
        return trainingRepository.findAll();
    }

    public void deleteAll() {
        trainingRepository.deleteAllInBatch();
    }
}
