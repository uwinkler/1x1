package dr.winkler.mal1.entity;

import jakarta.persistence.*;

@Entity
public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Card card;

    private int answer;

    private int timeMs;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public int getTimeMs() {
        return timeMs;
    }

    public void setTimeMs(int timeMs) {
        this.timeMs = timeMs;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Training{" +
                "card=" + card +
                ", passed=" + answer +
                ", timeMs=" + timeMs +
                ", id='" + id + '\'' +
                '}';
    }
}
