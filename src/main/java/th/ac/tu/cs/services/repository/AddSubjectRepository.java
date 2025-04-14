package th.ac.tu.cs.services.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.DropSubject;
import th.ac.tu.cs.services.model.Request;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddSubjectRepository extends JpaRepository<AddSubject , Long> {
    @Query("SELECT a FROM AddSubject a JOIN a.request r  WHERE r.studentid = :username")
    List<AddSubject> findbyUsername(@Param("username") String username);
/*
    @Query("SELECT a,r FROM AddSubject a JOIN a.request r WHERE r.reqid = :reqid AND a.addid = :id")
    List <?> findRequestAndAddSubject(@Param("reqid") String reqid, @Param("id") Long id);*/
/*
    @Query("SELECT r.reqid, r.date, r.time,  r.prefix, r.firstname, r.lastname, r.studentid, r.year, " +
            "r.department, r.address_number,  r.moo, r.tumbol, r.amphur, r.province, " +
            "r.postalcode, r.mobile_phone, r.phone, r.advisor, r.addSubjectList " +
            "FROM AddSubject r JOIN r.addSubjectList a WHERE r.reqid = :reqid AND a.addid = :id")
    Request findRequestAndAddSubject(@Param("reqid") String reqid, @Param("id") Long id);*/
}
