package dr.winkler.mal1.dao;

import dr.winkler.mal1.entity.Card;
import dr.winkler.mal1.repository.CardRepository;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CardDAO {
    private final EntityManager entityManager;
    private final CardRepository cardRepository;
    Logger logger = LoggerFactory.getLogger(CardDAO.class);

    public CardDAO(EntityManager entityManager, CardRepository cardRepository) {
        this.entityManager = entityManager;
        this.cardRepository = cardRepository;
    }


    @Transactional
    public void save(Card card) {
        entityManager.persist(card);
        logger.info("Saved " + card);
    }

    public List<Card> getAll() {
        return cardRepository.findAll();
    }

    public List<Card> getAllByStudentId(String studentId) {
        return cardRepository.findByStudentId(studentId);
    }

    public void deleteAll() {
        cardRepository.deleteAllInBatch();
    }

    public Card update(String id, Card next) {
        if (cardRepository.existsById(id)) {
            next.setId(id);
            return cardRepository.save(next);
        } else {
            return null;
        }
    }
}
