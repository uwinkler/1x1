package dr.winkler.mal1.repository;

import dr.winkler.mal1.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRepository extends JpaRepository<Training, String> {
}
