package th.ac.tu.cs.services.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import th.ac.tu.cs.services.repository.JdbcSubjectRepository;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.DropSubject;
import th.ac.tu.cs.services.repository.AddSubjectRepository;
import th.ac.tu.cs.services.repository.DropSubjectRepository;

import java.util.List;
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

    public SubjectController(AddSubjectRepository addSubjectRepository, DropSubjectRepository dropSubjectRepository) {
        this.addSubjectRepository = addSubjectRepository;
        this.dropSubjectRepository = dropSubjectRepository;
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
            return ResponseEntity.ok(drop_sub);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }
}
