package th.ac.tu.cs.services.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import th.ac.tu.cs.services.repository.JdbcSubjectRepository;


@RestController
@CrossOrigin
@RequestMapping("/api")

public class SubjectController {
    @Autowired
    JdbcSubjectRepository subjectRepository;


    @GetMapping("/request/add")
    public ResponseEntity<?> getRegisterAddSubject(){
        System.out.println("กำลังดำเนินงานแสดงเพิ่มรายวิชา");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            return ResponseEntity.ok(subjectRepository.findRequestAdd(currentPrincipalName));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }

    @GetMapping("/request/drop")
    public ResponseEntity<?> getRegisterDropSubject(){
        System.out.println("กำลังดำเนินงานแสดงถอนรายวิชา");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            System.out.println(currentPrincipalName);
            return ResponseEntity.ok(subjectRepository.findRequestDrop(currentPrincipalName));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }
}
