package dr.winkler.mal1.rest;

import dr.winkler.mal1.dao.CardDAO;
import dr.winkler.mal1.entity.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final CardDAO cardDAO;

    @Autowired
    public CardController(CardDAO cardDAO) {
        this.cardDAO = cardDAO;
    }

    @PutMapping("/{cardId}")
    public Card update(@PathVariable String cardId, @RequestBody Card next) {
        Card responseCard = cardDAO.update(cardId, next);
        if (responseCard == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return responseCard;
    }
}
