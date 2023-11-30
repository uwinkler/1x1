package dr.winkler.mal1.dao;

import dr.winkler.mal1.entity.Card;
import dr.winkler.mal1.repository.CardRepository;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public class CardDAO {
    private final static Logger logger = LoggerFactory.getLogger(CardDAO.class);
    private final EntityManager entityManager;
    private final CardRepository cardRepository;

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
        logger.warn("Delete all Cards");
        cardRepository.deleteAllInBatch();
    }

    public Card update(String id, Card next) {
        Optional<Card> card = cardRepository.findById(id);
        if (card.isPresent()) {
            Card c = card.get();
            c.setLevel(next.getLevel());
            cardRepository.save(card.get());
            return c;
        } else {
            return null;
        }
    }
}
