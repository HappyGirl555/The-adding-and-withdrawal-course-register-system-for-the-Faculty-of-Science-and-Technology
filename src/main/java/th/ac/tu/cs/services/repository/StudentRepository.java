package th.ac.tu.cs.services.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import th.ac.tu.cs.services.model.Request;
import th.ac.tu.cs.services.model.Student;

import java.util.Optional;

@Repository
public interface StudentRepository  extends JpaRepository<Student, String> {
    Optional<Student> findByUsername(String username);


}