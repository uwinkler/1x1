package dr.winkler.mal1.dao;

import dr.winkler.mal1.entity.Training;
import dr.winkler.mal1.repository.TrainingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Repository
public class TrainingDAO {
    private final static Logger logger = LoggerFactory.getLogger(TrainingDAO.class);

    private final TrainingRepository trainingRepository;

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

    public List<Training> getAllByStudentId(String id) {
        // TODO: use some db joins here OR some Spring magic
        List<Training> trainings = trainingRepository
                .findAll()
                .stream()
                .filter(training -> training.getCard().getStudent().getId() == id)
                .collect(Collectors.toList());
        return trainings;
    }

    public void deleteAll() {
        logger.warn("Delete all Trainings");
        trainingRepository.deleteAllInBatch();
    }
}
