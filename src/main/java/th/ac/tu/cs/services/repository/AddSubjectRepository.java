package th.ac.tu.cs.services.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.AddSubject;


import java.util.List;

@Repository
public interface AddSubjectRepository extends JpaRepository<AddSubject , Long> {
    @Query("SELECT a FROM AddSubject a JOIN a.request r  WHERE r.studentid = :username")
    List<AddSubject> findbyUsername(@Param("username") String username);

}
