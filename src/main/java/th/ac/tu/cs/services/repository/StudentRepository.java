package th.ac.tu.cs.services.repository;




import th.ac.tu.cs.services.model.Request;
import th.ac.tu.cs.services.model.Student;




public interface StudentRepository  {

    public void save(Request request);
    public void createStudent(Student student);
    public Student findByUsername(String username);




}