package th.ac.tu.cs.services.repository;



import th.ac.tu.cs.services.model.Subject;
import th.ac.tu.cs.services.model.AddSubject;
import th.ac.tu.cs.services.model.DropSubject;

import java.util.*;


public interface SubjectRepository {

    void addSubject(List <Subject> subjects, String studentID);
    void dropSubject(List <Subject> subjects, String studentID);
    List <AddSubject> findRequestAdd(String studentId);
    List <DropSubject> findRequestDrop(String studentID);
}
