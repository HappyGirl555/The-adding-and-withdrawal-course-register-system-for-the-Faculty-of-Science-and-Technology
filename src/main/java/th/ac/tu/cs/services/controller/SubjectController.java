package th.ac.tu.cs.services.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import th.ac.tu.cs.services.repository.JdbcSubjectRepository;
import th.ac.tu.cs.services.model.*;
import th.ac.tu.cs.services.repository.AddSubjectRepository;
import th.ac.tu.cs.services.repository.DropSubjectRepository;
import th.ac.tu.cs.services.repository.RequestRepository;

import java.util.List;
import java.util.Optional;
//import th.ac.tu.cs.services.repository.SubjectRepository;


@RestController
@CrossOrigin
@RequestMapping("/api")

public class SubjectController {

    /*
    @Autowired
    JdbcSubjectRepository subjectRepository;
     */

    private final AddSubjectRepository addSubjectRepository;
    private final DropSubjectRepository dropSubjectRepository;
    private  final RequestRepository requestRepository;

    public SubjectController(AddSubjectRepository addSubjectRepository, DropSubjectRepository dropSubjectRepository,RequestRepository requestRepository) {
        this.addSubjectRepository = addSubjectRepository;
        this.dropSubjectRepository = dropSubjectRepository;
        this.requestRepository = requestRepository;
    }

    //@Transactional
    @GetMapping("/request/add")
    public ResponseEntity<?> getRegisterAddSubject(){
        System.out.println("กำลังดำเนินงานแสดงเพิ่มรายวิชา");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            List<AddSubject> add_sub = addSubjectRepository.findbyUsername(currentPrincipalName);
            add_sub.forEach(subject -> {
                subject.setReqid(subject.getRequest().getReqid());
                System.out.println("กรุ้ววว");
                subject.print();
            });
            return ResponseEntity.ok(add_sub);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }

    //@Transactional
    @GetMapping("/request/drop")
    public ResponseEntity<?> getRegisterDropSubject(){
        System.out.println("กำลังดำเนินงานแสดงถอนรายวิชา");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            List<DropSubject> drop_sub = dropSubjectRepository.findbyUsername(currentPrincipalName);
            drop_sub.forEach(subject -> {
                subject.setReqid(subject.getRequest().getReqid());
                System.out.println("กรุ้ววว");
                subject.print();
            });
            return ResponseEntity.ok(drop_sub);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }

    @GetMapping("/request/{reqid}")
    public ResponseEntity<?> getDescriptionRequest(@PathVariable String reqid){
        System.out.println("กำลังดำเนินงานแสดงรายละเอียดรายวิชาที่เพิ่ม");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            Optional <?> descriptionRequest = requestRepository.findById(reqid);
            return ResponseEntity.ok(descriptionRequest);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }
/*
    @GetMapping("/request/drop/{reqid}")
    public ResponseEntity<?> getDescriptionDropRequest(@PathVariable String reqid, @PathVariable Long id){
        System.out.println("กำลังดำเนินงานแสดงรายละเอียดรายวิชาที่ถอน");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            Request dropSubject_description = requestRepository.findRequestAndDropSubject(reqid);
            return ResponseEntity.ok(dropSubject_description);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }

 */
}
