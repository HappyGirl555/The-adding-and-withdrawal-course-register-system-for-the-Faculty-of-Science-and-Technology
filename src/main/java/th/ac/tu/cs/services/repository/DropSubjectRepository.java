package th.ac.tu.cs.services.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.DropSubject;

import java.util.List;
import java.util.Optional;

@Repository
public interface DropSubjectRepository extends JpaRepository<DropSubject, Long> {

    @Query("SELECT d FROM DropSubject d JOIN d.request r WHERE r.studentid  = :username")
    List<DropSubject> findbyUsername(@Param("username") String username);
}
