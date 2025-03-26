package th.ac.tu.cs.services.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.DropSubject;
import th.ac.tu.cs.services.model.Request;
//import th.ac.tu.cs.services.model.Subject;
import th.ac.tu.cs.services.repository.AddSubjectRepository;
import th.ac.tu.cs.services.repository.DropSubjectRepository;
//import th.ac.tu.cs.services.repository.JdbcStudentRepository;
//import th.ac.tu.cs.services.repository.JdbcSubjectRepository;
import th.ac.tu.cs.services.repository.RequestRepository;
import th.ac.tu.cs.services.repository.StudentRepository;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class StudentController {

    /*
    @Autowired
    private JdbcStudentRepository studentRepository;
    @Autowired
    private JdbcSubjectRepository subjectRepository;
*/

    private final StudentRepository studentRepository;
    private final  RequestRepository requestRepository;
    private final AddSubjectRepository addSubjectRepository;
    private final  DropSubjectRepository dropSubjectRepository;

    public StudentController(StudentRepository studentRepository,RequestRepository requestRepository,AddSubjectRepository addSubjectRepository,DropSubjectRepository dropSubjectRepository){
        this.studentRepository = studentRepository;
        this.requestRepository = requestRepository;
        this.addSubjectRepository = addSubjectRepository;
        this.dropSubjectRepository = dropSubjectRepository;
    }

    public String requestID() {
        String reqID;
        Long rowCount = requestRepository.count();
        System.out.println(rowCount);
        if (rowCount == 0) {
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

    @PostMapping("/save")
    public ResponseEntity<String> createRequest(@RequestBody Request request) {
        try {

            request.setReqid(requestID());
            request.setTime(time());
            System.out.println("Gooo");
            requestRepository.save(request);
            System.out.println("Goo");
            request.getAddSubjectList().forEach(AddSubject::print);
            if (!request.getAddSubjectList().isEmpty()) {
                System.out.println("Add");
                List <AddSubject> subjects = request.getAddSubjectList();
                subjects.forEach(subject -> {
                    subject.print();
                    subject.setRequest(request);
                    subject.setDate(request.getDate());
                    addSubjectRepository.save(subject);
                });
            } else {
                System.out.println("Dont Add");
            }
            if (!request.getDropSubjectList().isEmpty()) {
                System.out.println("Drop");
                List<DropSubject> subjects =request.getDropSubjectList();
                subjects.forEach(subject -> {
                    subject.print();
                    subject.setRequest(request);
                    subject.setDate(request.getDate());
                    dropSubjectRepository.save(subject);
                });
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

