package th.ac.tu.cs.services.model;

import java.util.*;

public class Request {

    private String date;
    private String prefix;
    private String firstname;
    private String lastname;
    private String studentid;
    private String year;
    private String department;
    private String address_number;
    private String moo;
    private String tumbol;
    private String amphur;
    private String province;
    private String postalcode;
    private String mobile_phone;
    private String phone;
    private String advisor;
    private List <Subject> addSubjectList;
    private List <Subject> dropSubjectList;
    private String time;
    private String reqid;

    public Request(String date, String prefix, String firstname, String lastname, String studentid,
                   String year, String department, String advisor, String address_number, String  moo,
                   String tumbol, String amphur, String province, String postalCode, String mobile_phone,
                   String phone, List<Subject> addSubjectList, List<Subject> dropSubjectList) {
        this.date=date;
        this.prefix=prefix;
        this.firstname =firstname;
        this.lastname = lastname;
        this.studentid = studentid;
        this.year = year;
        this.department = department;
        this.address_number = address_number;
        this.moo=moo;
        this.tumbol=tumbol;
        this.amphur=amphur;
        this.province=province;
        this.postalcode=postalCode;
        this.mobile_phone = mobile_phone;
        this.phone = phone;
        this.advisor = advisor;
        this.addSubjectList = addSubjectList;
        this.dropSubjectList = dropSubjectList;
    };

    public Request() {

    }

    public String getReqid() {
        return reqid;
    }

    public void setReqid(String reqid) {
        this.reqid = reqid;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMobile_phone() {
        return mobile_phone;
    }

    public void setMobile_phone(String mobile_phone) {
        this.mobile_phone = mobile_phone;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getAmphur() {
        return amphur;
    }

    public void setAmphur(String amphur) {
        this.amphur = amphur;
    }

    public String getTumbol() {
        return tumbol;
    }

    public void setTumbol(String tumbol) {
        this.tumbol = tumbol;
    }

    public String getMoo() {
        return moo;
    }

    public void setMoo(String moo) {
        this.moo = moo;
    }

    public String getAddress_number() {
        return address_number;
    }

    public void setAddress_number(String address_number) {
        this.address_number = address_number;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPhone() {
        if (phone == ""){
            return "ไม่ระบุ";
        }
        return phone;
    }

    public void setPhone(String phone) {
            this.phone = phone;
    }

    public String getAdvisor() {
        return advisor;
    }

    public void setAdvisor(String advisor) {
        this.advisor = advisor;
    }

    public List<Subject> getAddSubjectList() {return addSubjectList;}

    public void setAddSubjectList(List<Subject> addSubjectList) {this.addSubjectList = addSubjectList;}

    public List<Subject> getDropSubjectList() {return dropSubjectList;}

    public void setDropSubjectList(List<Subject> dropSubjectList) {this.dropSubjectList = dropSubjectList;}



    public void print() {
        System.out.println(date);
        System.out.println(prefix);
        System.out.println(firstname);
        System.out.println(lastname);
        System.out.println(studentid);
        System.out.println(year);
        System.out.println(department);
        System.out.println(address_number);
        System.out.println(moo);
        System.out.println(tumbol);
        System.out.println(amphur);
        System.out.println(province);
        System.out.println(postalcode);
        System.out.println(mobile_phone);
        System.out.println(phone);
        System.out.println(advisor);
        System.out.println(time);
    }
}
