package th.ac.tu.cs.services.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.Request;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, String> {

    /*

    @Query("SELECT new th.ac.tu.cs.services.model.DescriptionAddSubject(r.reqid, r.date, r.time,  r.prefix, r.firstname, r.lastname, r.studentid, r.year, " +
            "r.department, r.address_number,  r.moo, r.tumbol, r.amphur, r.province," +
            "r.postalcode, r.mobile_phone, r.phone, r.advisor, a) " +
            "FROM Request r JOIN r.addSubjectList a WHERE r.reqid = :reqid AND a.addid = :id")
    DescriptionAddSubject findRequestAndAddSubject(@Param("reqid") String reqid, @Param("id") Long id);

    @Query("SELECT new th.ac.tu.cs.services.model.DescriptionDropSubject( r.reqid, r.date, r.time, r.prefix, r.firstname, r.lastname, r.studentid, r.year, " +
            "r.department, r.address_number,  r.moo, r.tumbol, r.amphur, r.province, " +
            "r.postalcode, r.mobile_phone, r.phone, r.advisor, d) " +
            "FROM Request r JOIN r.dropSubjectList d WHERE r.reqid = :reqid AND d.dropid = :id")
    DescriptionDropSubject findRequestAndDropSubject(@Param("reqid") String reqid, @Param("id") Long id);*/
}
