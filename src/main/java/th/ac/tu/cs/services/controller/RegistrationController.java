package th.ac.tu.cs.services.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import th.ac.tu.cs.services.model.Student;
import th.ac.tu.cs.services.repository.JdbcStudentRepository;



import java.util.Arrays;


@RestController
public class RegistrationController {



    @Autowired
    private JdbcStudentRepository jdbcStudentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/student/signup")
    public ResponseEntity<String> createStudent(@RequestBody Student student){
        try {
            String studentid = student.getStudentid();
            System.out.println(student.getStudentid());
            if (jdbcStudentRepository.findStudentid(studentid)){
                System.out.println("มีบัญชีแล้วจ้า");
                return new ResponseEntity<>("ไม่สามารถสร้างบัญชีได้", HttpStatus.CONFLICT);
            }
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            System.out.println("Parameters: " + Arrays.asList(
                    student.getStudentid(),student.getFirstname(),
                    student.getLastname(),student.getPrefix(),student.getUsername(),student.getPassword(),student.getDepartment()
            ));
            jdbcStudentRepository.createStudent(student);
            return ResponseEntity.ok("สร้างบัญชีสำเร็จ");
        } catch (Exception e) {
            return new ResponseEntity<>("ไม่สามารถสร้างบัญชีได้", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

