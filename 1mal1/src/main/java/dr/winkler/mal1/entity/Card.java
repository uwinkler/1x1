package dr.winkler.mal1.entity;

import jakarta.persistence.*;


@Entity
@Table(name="card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @ManyToOne
    private Student student;

    @Column(name="faktor_one")
    private int faktorOne;


    @Column(name="faktor_two")
    private int faktorTwo;

    @Column(name="level")
    private int level;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id='" + id + '\'' +
                ", student=" + student +
                ", faktorOne=" + faktorOne +
                ", faktorTwo=" + faktorTwo +
                ", level=" + level +
                '}';
    }

    public int getFaktorOne() {
        return faktorOne;
    }

    public void setFaktorOne(int faktorOne) {
        this.faktorOne = faktorOne;
    }

    public int getFaktorTwo() {
        return faktorTwo;
    }

    public void setFaktorTwo(int faktorTwo) {
        this.faktorTwo = faktorTwo;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
}
