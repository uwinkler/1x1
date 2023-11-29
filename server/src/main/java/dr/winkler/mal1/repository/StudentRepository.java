package dr.winkler.mal1.repository;

import dr.winkler.mal1.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
