package th.ac.tu.cs.services.model;


import jakarta.persistence.*;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;


@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "studentid")
    private String studentid;

    @Column(name = "password")
    private String password;

    @Column(name = "prefix")
    private String prefix;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "department")
    private String department;

    @Column(name = "imageName")
    private String imageName;

    @Column(name = "imageType")
    private String imageType;

    @Lob
    private byte[] imageData;

    public Student(String studentid, String username, String password, String prefix, String firstname, String lastname,
                   String department) {
        this.prefix = prefix;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.studentid = studentid;
        this.department = department;
    }

    ;

    public Student(String username, String studentid, String password, String prefix, String firstname,
                   String lastname, String department, String imageName, String imageType) {
        this.username = username;
        this.studentid = studentid;
        this.password = password;
        this.prefix = prefix;
        this.firstname = firstname;
        this.lastname = lastname;
        this.department = department;
        this.imageName = imageName;
        this.imageType = imageType;
    }

    public Student() {
    }

    public Student(String username, String password) {
        this.username = username;
        this.password = password;
    }

    ;

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

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public void addPicture(Student student, MultipartFile imageFile) throws IOException{
        try{
            student.setImageName(imageFile.getOriginalFilename());
            student.setImageType(imageFile.getContentType());
            student.setImageData(imageFile.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}


