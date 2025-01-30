package th.ac.tu.cs.services.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import th.ac.tu.cs.services.model.Request;
import th.ac.tu.cs.services.model.Student;


import java.time.format.DateTimeFormatter;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.util.*;

@Repository
public  class JdbcStudentRepository  implements StudentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public String requestID() {
        String reqID;
        String sql_find = "SELECT COUNT(*) FROM request";
        Integer rowCount = jdbcTemplate.queryForObject(sql_find, Integer.class);
        System.out.println(rowCount);
        if (rowCount == null) {
            reqID = "R000001";
        } else {
            reqID = String.format("R%06d", rowCount + 1);
        }
        System.out.println(reqID);
        return reqID;
    }

    public String time() {
        ZoneId thailandZoneId = ZoneId.of("Asia/Bangkok");
        ZonedDateTime time = ZonedDateTime.now(thailandZoneId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedTime = time.format(formatter);
        System.out.println(formattedTime);
        return formattedTime;
    }

    @Override
    public void save(Request request) {
        try {
            //student.print();

            System.out.println("Parameters: " + Arrays.asList(
                    request.getReqid(), request.getStudentid(), request.getPrefix(), request.getFirstname(), request.getLastname(),
                    request.getYear(), request.getDepartment(), request.getAdvisor(), request.getAddress_number(), request.getMoo(), request.getTumbol(), request.getAmphur(),
                    request.getProvince(), request.getPostalcode(), request.getMobile_phone(), request.getPhone(), request.getDate(), request.getTime()
            ));

            String sql = "INSERT INTO request (reqid, studentid, prefix,  firstname, lastname,  year, department, advisor, address_number, moo, tumbol, amphur, province, postalcode, mobile_phone, phone, date, time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(sql, request.getReqid(), request.getStudentid(), request.getPrefix(), request.getFirstname(), request.getLastname(),
                    request.getYear(), request.getDepartment(), request.getAdvisor(), request.getAddress_number(), request.getMoo(), request.getTumbol(), request.getAmphur(),
                    request.getProvince(), request.getPostalcode(), request.getMobile_phone(), request.getPhone(), request.getDate(), request.getTime());

        } catch (Exception e) {
            System.out.println("Don't save");
        }
    }

    @Override
    public void createStudent(Student student) {
        try {
            String sql = "INSERT INTO student (studentid, username, password, prefix, firstname, lastname, department)"
                    + "VALUES (?,?,?,?,?,?,?)";
            jdbcTemplate.update(sql, student.getStudentid(), student.getUsername(), student.getPassword(), student.getPrefix(), student.getFirstname()
                    , student.getLastname(), student.getDepartment());
        } catch (Exception e) {
            System.out.println("บันทึกไม่สำเร็จ");
        }
    }

    @Override
    public Student findByUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM student WHERE username=?",
                    BeanPropertyRowMapper.newInstance(Student.class), username);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    public Boolean findStudentid(String studentid) {
        String sql_find = "SELECT COUNT(*) FROM student where studentid=?";
        Integer rowCount = jdbcTemplate.queryForObject(sql_find, Integer.class, studentid);
        System.out.println(rowCount);
        return rowCount != null && rowCount > 0;
    }
}