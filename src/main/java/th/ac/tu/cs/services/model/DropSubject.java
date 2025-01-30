package th.ac.tu.cs.services.model;

public class DropSubject {

    private String date;
    private String reqid;
    private String subject_code;
    private String subject_name;
    private String subject_sec;
    private String subject_date;
    private String subject_credit;
    private String subject_teacher;
    private String subject_cause;
    private Boolean subject_teacher_check;

    public DropSubject() {

    }

    public DropSubject(String date, String dateReg, String reqid, String subject_code, String subject_name, String subject_sec, String subject_date, String subject_credit,
                       String subject_teacher, String subject_cause, Boolean subject_teacher_check){

        this.date = date;
        this.reqid = reqid;
        this.subject_code=subject_code;
        this.subject_name=subject_name;
        this.subject_sec=subject_sec;
        this.subject_date=subject_date;
        this.subject_credit=subject_credit;
        this.subject_teacher=subject_teacher;
        this.subject_cause = subject_cause;
        this.subject_teacher_check=subject_teacher_check;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getReqid() {
        return reqid;
    }

    public void setReqid(String reqid) {
        this.reqid = reqid;
    }

    public String getSubject_code() {
        return subject_code;
    }

    public void setSubject_code(String subject_code) {
        this.subject_code = subject_code;
    }

    public String getSubject_name() {
        return subject_name;
    }

    public void setSubject_name(String subject_name) {
        this.subject_name = subject_name;
    }

    public String getSubject_sec() {
        return subject_sec;
    }

    public void setSubject_sec(String subject_sec) {
        this.subject_sec = subject_sec;
    }

    public String getSubject_date() {
        return subject_date;
    }

    public void setSubject_date(String subject_date) {
        this.subject_date = subject_date;
    }

    public String getSubject_credit() {
        return subject_credit;
    }

    public void setSubject_credit(String subject_credit) {
        this.subject_credit = subject_credit;
    }

    public String getSubject_teacher() {
        return subject_teacher;
    }

    public void setSubject_teacher(String subject_teacher) {
        this.subject_teacher = subject_teacher;
    }

    public String getSubject_cause() {
        return subject_cause;
    }

    public void setSubject_cause(String subject_cause) {
        this.subject_cause = subject_cause;
    }

    public Boolean getSubject_teacher_check() {
        return subject_teacher_check;
    }

    public void setSubject_teacher_check(Boolean subject_teacher_check) {
        this.subject_teacher_check = subject_teacher_check;
    }

    public void print() {
        System.out.println(reqid);
        System.out.println(subject_name);
        System.out.println(subject_sec);
        System.out.println(subject_code);
        System.out.println(subject_date);
        System.out.println(subject_credit);
        System.out.println(subject_teacher);
        System.out.println(subject_cause);
        System.out.println(subject_teacher_check);
    }

}
