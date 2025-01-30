package th.ac.tu.cs.services.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import th.ac.tu.cs.services.model.Request;
import th.ac.tu.cs.services.repository.JdbcStudentRepository;
import th.ac.tu.cs.services.repository.JdbcSubjectRepository;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class StudentController {

    @Autowired
    private JdbcStudentRepository studentRepository;
    @Autowired
    private JdbcSubjectRepository subjectRepository;


    @PostMapping("/save")
    public ResponseEntity<String> createRequest(@RequestBody Request request) {
        try {
            String reqid = studentRepository.requestID();
            request.setReqid(reqid);
            String timeReq = studentRepository.time();
            request.setTime(timeReq);
            studentRepository.save(request);
            request.getAddSubjectList().forEach(subject -> {
                subject.print();
            });
            if (!request.getAddSubjectList().isEmpty()) {
                System.out.println("Add");
                subjectRepository.addSubject(request.getAddSubjectList(), reqid);
            } else {
                System.out.println("Dont Add");
            }
            if (!request.getDropSubjectList().isEmpty()) {
                System.out.println("Drop");
                subjectRepository.dropSubject(request.getDropSubjectList(), reqid);
            } else {
                System.out.println("Dont Drop");
            }
            return ResponseEntity.ok("Student Save!");
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving student.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<?> infoStudent() {
        System.out.println("กำลังดำเนินงาน");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            return ResponseEntity.ok(studentRepository.findByUsername(currentPrincipalName));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }


}

