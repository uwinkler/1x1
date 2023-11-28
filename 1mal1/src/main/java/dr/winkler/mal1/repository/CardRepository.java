package dr.winkler.mal1.repository;

import dr.winkler.mal1.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, String> {
    List<Card> findByStudentId(String studentId);
}