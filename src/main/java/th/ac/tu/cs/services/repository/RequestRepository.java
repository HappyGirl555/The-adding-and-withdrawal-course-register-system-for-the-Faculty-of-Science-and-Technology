package th.ac.tu.cs.services.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, String> {

}
