package th.ac.tu.cs.services.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import th.ac.tu.cs.services.model.Student;
//import th.ac.tu.cs.services.repository.JdbcStudentRepository;
import th.ac.tu.cs.services.repository.StudentRepository;


import java.util.Arrays;
import java.util.Optional;


@RestController
public class RegistrationController {


/*
    @Autowired
    private JdbcStudentRepository jdbcStudentRepository;
*/
    private final StudentRepository studentRepository ;

    public RegistrationController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/student/signup")
    public ResponseEntity<String> createStudent(@RequestBody Student student){
        try {

            System.out.println(student.getUsername());
            Optional <Student> db_student = studentRepository.findById(student.getUsername());
            System.out.println("สมัครได้");
            if (db_student.isPresent()){
                System.out.println("มีบัญชีแล้วจ้า");
                return new ResponseEntity<>("ไม่สามารถสร้างบัญชีได้", HttpStatus.CONFLICT);
            }
            System.out.println("สมัครได้");
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            System.out.println("Parameters: " + Arrays.asList(
                    student.getUsername(),student.getFirstname(),
                    student.getLastname(),student.getPrefix(),student.getPassword(),student.getDepartment()
            ));
            studentRepository.save(student);
            return ResponseEntity.ok("สร้างบัญชีสำเร็จ");
        } catch (Exception e) {
            return new ResponseEntity<>("ไม่สามารถสร้างบัญชีได้", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

