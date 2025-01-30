package th.ac.tu.cs.services.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.Subject;
import th.ac.tu.cs.services.model.DropSubject;



import java.util.*;


@Repository
public class JdbcSubjectRepository implements SubjectRepository {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addSubject(List <Subject> subjects, String reqID) {
        String sql = " INSERT INTO add_subject_lists (reqid ,subject_code, subject_name, subject_sec, subject_date, subject_credit, subject_teacher, subject_cause, subject_teacher_check) VALUES(?,?,?,?,?,?,?,?,?)";
        try{
            subjects.forEach(subject -> {
                subject.print();
                jdbcTemplate.update(sql, reqID , subject.getSubject_code(), subject.getSubject_name(), subject.getSubject_sec(),
                        subject.getSubject_date(), subject.getSubject_credit(), subject.getSubject_teacher()
                        , subject.getSubject_cause(), subject.getSubject_teacher_check());
            });
        }catch (Exception e) {
            System.out.println("Don't save Subject");
        }
    }

    @Override
    public void dropSubject(List <Subject> subjects, String reqID) {
        String sql = "INSERT INTO drop_subject_lists (reqid ,subject_code, subject_name, subject_sec, subject_date, subject_credit, subject_teacher, subject_cause, subject_teacher_check) VALUES(?,?,?,?,?,?,?,?,?)" ;
        try{
            subjects.forEach(subject -> {
                subject.print();
                jdbcTemplate.update(sql, reqID , subject.getSubject_code(), subject.getSubject_name(), subject.getSubject_sec(),
                        subject.getSubject_date(), subject.getSubject_credit(), subject.getSubject_teacher()
                        , subject.getSubject_cause(), subject.getSubject_teacher_check());
            });
        }catch (Exception e) {
            System.out.println("Don't save Subject");
        }
    }

    @Override
    public List <AddSubject> findRequestAdd(String studentID) {
        try {
            String sql = "SELECT R.date, A.* " +
                    " FROM add_subject_lists AS A" +
                    " JOIN request AS R ON A.reqid = R.reqid" +
                    " WHERE R.studentid = ?;";
            return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(AddSubject.class),studentID);
        } catch (IncorrectResultSizeDataAccessException e) {
            System.err.println("Query returned no results or an unexpected size for studentID: " + studentID);
            return null;
        }
    }

    @Override
    public List <DropSubject> findRequestDrop(String studentID) {
        try {
            String sql = "SELECT R.date, D.* " +
                    " FROM drop_subject_lists AS D" +
                    " JOIN request AS R ON D.reqid = R.reqid" +
                    " WHERE R.studentid = ?;";
            return jdbcTemplate.query(sql,BeanPropertyRowMapper.newInstance(DropSubject.class),studentID);
        } catch (IncorrectResultSizeDataAccessException e) {
            System.err.println("Query returned no results or an unexpected size for studentID: " + studentID);
            return null;
        }
    }


}
