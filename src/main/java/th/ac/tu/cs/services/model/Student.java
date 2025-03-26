package th.ac.tu.cs.services.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name="username")
    private String username;

    @Column(name="studentid")
    private String studentid;

    @Column(name="password")
    private String password;

    @Column(name="prefix")
    private String prefix;

    @Column(name="firstname")
    private String firstname;

    @Column(name="lastname")
    private String lastname;

    @Column(name="department")
    private String department;

    public Student(String studentid,String username, String password ,String prefix, String firstname, String lastname,
                   String department) {
        this.prefix=prefix;
        this.username=username;
        this.password=password;
        this.firstname =firstname;
        this.lastname = lastname;
        this.studentid = studentid;
        this.department = department;
    };

    public Student() {}

    public Student(String username, String password) {
        this.username=username;
        this.password=password;
    };

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}


