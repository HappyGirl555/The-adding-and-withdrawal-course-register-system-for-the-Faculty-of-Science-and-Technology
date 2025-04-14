package th.ac.tu.cs.services.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.DropSubject;
import th.ac.tu.cs.services.model.Request;
//import th.ac.tu.cs.services.model.Subject;
import th.ac.tu.cs.services.model.Student;
import th.ac.tu.cs.services.repository.AddSubjectRepository;
import th.ac.tu.cs.services.repository.DropSubjectRepository;
//import th.ac.tu.cs.services.repository.JdbcStudentRepository;
//import th.ac.tu.cs.services.repository.JdbcSubjectRepository;
import th.ac.tu.cs.services.repository.RequestRepository;
import th.ac.tu.cs.services.repository.StudentRepository;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


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

    @PostMapping(value = "/info/picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePicture(@RequestPart MultipartFile imageFile){
        try{
            System.out.println("กำลังดำเนินงาน");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String currentPrincipalName = authentication.getName();
                System.out.println(currentPrincipalName);
                Optional <Student> db_student = studentRepository.findByUsername(currentPrincipalName);
                Student student;
                if(db_student.isPresent()){
                    student = db_student.get();
                    student.addPicture(student,imageFile);
                    studentRepository.save(student);
                    return ResponseEntity.ok(student);
                }else{
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ไม่พบนักเรียนที่มี username: " + currentPrincipalName);
                }

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
            }
        }catch(Exception e){
            return new ResponseEntity<>("An error occurred while saving student.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }


    @GetMapping("/info/picture")
    public ResponseEntity<?> getPicture() {
        System.out.println("กำลังดำเนินงาน");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            Optional <Student> db_student = studentRepository.findByUsername(currentPrincipalName);
            if(db_student.isPresent()){
                Student student = db_student.get();
                if (student.getImageData() != null){
                    byte[] imageFile = student.getImageData();
                    return ResponseEntity.ok().contentType(MediaType.valueOf(student.getImageType())).body(imageFile);
                }else{
                    return ResponseEntity.ok("User dont have picture");
                }
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}

