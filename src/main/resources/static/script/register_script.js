var list_addSubject=[];
var list_dropSubject=[];

var date
var prefix
var firstname
var lastname
var studentYear
var studentid 
var department
var advisor
var address_number
var moo
var tumbol
var amphur
var province
var postalcode
var mobile_phone
var phone

fetch('http://localhost:4004/api/info',
   {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
   }).then(response => {
            console.log("กำลังทำ")
          if(response.ok){
              return response.json()
          }else{
              console.log(response)
              throw new Error("Failed Up data")
          }
    }).then(student => {
           console.log(student)
           document.getElementById('prefix').value = student.prefix
           document.getElementById('firstname').value = student.firstname
           document.getElementById('lastname').value =  student.lastname
           document.getElementById('studentid').value = student.studentid
           document.getElementById('department').value =  student.department
      })


const getDate = () =>{
    var date = new Date()
    return date.toISOString().split('T')[0]
}


function addSubjectInputs() {
    const subAll = document.getElementById("addtable")
    const sub = document.createElement("div");
    const len_div = subAll.querySelectorAll("div").length;
    if (len_div>=10){
        alert("เพิ่มวิชาได้สูงสุด 10 วิชา");
    }else{

       sub.innerHTML =
        `
         <table class = "sub-table">
            <tr id="header_add_table">
                <th class="th_header_subject">วิชาที่</th>
                <th class="th_header_subject_Code">รหัสวิชา</th>
                <th class="th_header_subject_Name">ชื่อวิชา</th>
                <th class="th_header_subject_Section">Section</th>
                <th class="th_header_subject_Date">วัน/เวลา </th>
                <th class="th_header_subject_Credit">หน่วยกิต</th>
                <th class="th_header_subject_Teacher">ชื่อผู้สอน</th>
            </tr>
            <tr id="body_table">
                <th class="th_subject"><p id="No">${len_div+1}</p></th>
                <th class="th_subject"><input id="subject_code${len_div+1}" class="subjectCode" ></th>
                <th class="th_subject"><input id="subject_name${len_div+1}" class="subjectName" ></th>
                <th class="th_subject"><input id="subject_sec${len_div+1}" class="subjectSection"  ></th>
                <th class="th_subject"><input id="subject_date${len_div+1}" class="subjectDate" ></th>
                <th class="th_subject"><input id="subject_credit${len_div+1}" class="subjectCredit" type=number min=1 max=3 ></th>
                <th class="th_subject"><input id="subject_teacher${len_div+1}" class="subjectTeacher" ></th>

            </tr>
        </table>
        <table id="case-table">
                <tr><th>เหตุผลการเพิ่มรายวิชา<span>*</span></th></tr>
                <tr><th><input id="subject_cause${len_div+1}" class="subjectCause"></th></tr>
        </table>
        <br>
        <button onclick="cancleAddSubject(this)" type="button" id="cancle" class="cancle" >ยกเลิก</button>
        `
        sub.classList.add("addtable")
        subAll.appendChild(sub)
    } 
}

function drop_addSubjectInputs() {
    const newtable = document.getElementById("addtable")
    const all_sub = newtable.querySelectorAll("div");
    const len_sub = all_sub.length
    if(len_sub>0){
        newtable.removeChild(all_sub[len_sub-1]);
    }
}    

function cancleAddSubject(button){
    const table = document.getElementById("addtable")
    const all_sub = table.querySelectorAll("div");
    const len_sub = all_sub.length
    const cansub = button.parentElement;
    const index = cansub.querySelector("table").rows[1].cells[0].textContent;
    table.removeChild(all_sub[index-1]);

    if (index != len_sub){
        for (var i = index-1 ; i < all_sub.length ; i++){
            var ctable = table.querySelectorAll("div")[i].querySelector("table");
            ctable.rows[1].cells[0].textContent = (i+1) ;
        }
    }
}



function dropSubjectInputs() {
    const subAll = document.getElementById("droptable")
    const sub = document.createElement("div");
    const len_div = subAll.querySelectorAll("div").length;
    if (len_div>=10){
        alert("เพิ่มวิชาได้สูงสุด 10 วิชา");
    }else{

       sub.innerHTML =
        `
        <table class="sub-table">
            <tr id="header_drop_table">
                <th class="th_header_subject">วิชาที่</th>
                <th class="th_header_subject_Code">รหัสวิชา</th>
                <th class="th_header_subject_Name">ชื่อวิชา</th>
                <th class="th_header_subject_Section">Section</th>
                <th class="th_header_subject_Date">วัน/เวลา </th>
                <th class="th_header_subject_Credit">หน่วยกิต</th>
                <th class="th_header_subject_Teacher">ชื่อผู้สอน</th>
            </tr>
            <tr id="body_table">
                <th class="th_subject"><p id="No">${len_div+1}</p></th>
                <th class="th_subject"><input id="subject_code${len_div+1}" class="subjectCode" ></th>
                <th class="th_subject"><input id="subject_name${len_div+1}" class="subjectName" ></th>
                <th class="th_subject"><input id="subject_sec${len_div+1}" class="subjectSection"  ></th>
                <th class="th_subject"><input id="subject_date${len_div+1}" class="subjectDate" ></th>
                <th class="th_subject"><input id="subject_credit${len_div+1}" class="subjectCredit" type=number min=1 max=3 ></th>
                <th class="th_subject"><input id="subject_teacher${len_div+1}" class="subjectTeacher" ></th>
                
            </tr>
        </table>
        <table id="case-table">
                <tr><th>เหตุผลการถอนรายวิชา<span>*</span></th></tr>
                <tr><th><input id="subject_cause${len_div+1}" class="subjectCause"></th></tr>
        </table>
        <br>
        <button onclick="cancleDropSubject(this)" type="button" id="cancle" class="cancle" >ยกเลิก</button>
        `
        sub.classList.add("droptable")
        subAll.appendChild(sub)
    } 
}

function drop_dropSubjectInputs() {
    const newtable = document.getElementById("droptable")
    const all_sub = newtable.querySelectorAll("div");
    const len_sub = all_sub.length
    if(len_sub>0){
        newtable.removeChild(all_sub[len_sub-1]);
    }
}    

function cancleDropSubject(button){
    const table = document.getElementById("droptable")
    const all_sub = table.querySelectorAll("div");
    const len_sub = all_sub.length
    const cansub = button.parentElement;
    const index = cansub.querySelector("table").rows[1].cells[0].textContent;
    table.removeChild(all_sub[index-1]);

    if (index != len_sub){
        for (var i = index-1 ; i < all_sub.length ; i++){
            var ctable = table.querySelectorAll("div")[i].querySelector("table");
            ctable.rows[1].cells[0].textContent = (i+1) ;
        }
    }
}

const setError = (elm) => {
    const inputControl = elm.parentElement;
    elm.placeholder = "กรุณากรอกข้อมูล"
    inputControl.classList.add('error')
    inputControl.classList.remove('success')
};

const setSuccess = (elm) => {   
   const inputControl = elm.parentElement;
     inputControl.setAttribute("placeholder","")
     inputControl.classList.add('success')
     inputControl.classList.remove('error')
 };


const checkNotEmpty = (elm) => {
    if (elm.value === ''){
        setError(elm);
        return
    }else{
        setSuccess(elm);
        return
    }
    
};

const checkValidNumber = (elm,number) => {
    if (elm.value.trim() === ''){
        if (elm.id !== "phone"){
            setError(elm);
        }
    }else if(elm.value.length !== number || isNaN(elm.value)){
        setError(elm);
    }else{
        setSuccess(elm);
    }
};


const checkSubject = (idTable) => {
    var subjects = idTable.querySelectorAll('div')
    subjects.forEach((subject,index)=>{
        var i = 0
        var subjectCode = subject.querySelector(`#subject_code${index+1}`)
        checkNotEmpty(subjectCode)
        var subjectName = subject.querySelector(`#subject_name${index+1}`)
        checkNotEmpty(subjectName)
        var subjectSection = subject.querySelector(`#subject_sec${index+1}`)
        checkValidNumber(subjectSection,6)
        var subjectDate = subject.querySelector(`#subject_date${index+1}`)
        checkNotEmpty(subjectDate)
        var subjectCredit = subject.querySelector(`#subject_credit${index+1}`)
        checkNotEmpty(subjectCredit)
        var subjectTeacher = subject.querySelector(`#subject_teacher${index+1}`)
        checkNotEmpty(subjectTeacher)
        var subjectCause = subject.querySelector(`#subject_cause${index+1}`)
        checkNotEmpty(subjectCause)
    })

    if(idTable.querySelectorAll(".error").length===0){
        return true
    }else{
        return false
    }
}

const saveSubject = (idTable) => {
    var subjects = []
    var subjectsInput = idTable.querySelectorAll('div')
    subjectsInput.forEach((subject,index)=>{
        subjects.push({
            subject_code : subject.querySelector(`#subject_code${index+1}`).value,
            subject_name : subject.querySelector(`#subject_name${index+1}`).value,
            subject_sec : subject.querySelector(`#subject_sec${index+1}`).value,
            subject_date : subject.querySelector(`#subject_date${index+1}`).value,
            subject_credit: subject.querySelector(`#subject_credit${index+1}`).value,
            subject_teacher : subject.querySelector(`#subject_teacher${index+1}`).value,
            subject_cause :  subject.querySelector(`#subject_cause${index+1}`).value,
            subject_teacher_check : false
        })
    })
    return subjects
}


const validateInfo = () =>{

    var prefix = document.getElementById("prefix");
    checkNotEmpty(prefix)
    var firstname = document.getElementById("firstname");
    checkNotEmpty(firstname)
    var lastname= document.getElementById("lastname");
    checkNotEmpty(lastname)
    var studentid = document.getElementById("studentid");
    checkValidNumber(studentid,10)
    var studentYear = document.getElementById("year");
    checkNotEmpty(studentYear)
    var department = document.getElementById("department");
    checkNotEmpty(department)
    var advisor = document.getElementById("advisor");
    checkNotEmpty(advisor)
    var address_number = document.getElementById("address_number");
    checkNotEmpty(address_number)
    var moo = document.getElementById("moo");
    checkNotEmpty(moo)
    var tumbol = document.getElementById("tumbol");
    checkNotEmpty(tumbol)
    var amphur = document.getElementById("amphur");
    checkNotEmpty(amphur)
    var province = document.getElementById("province");
    checkNotEmpty(province)
    var postalcode = document.getElementById("postalcode");
    checkValidNumber(postalcode,5)
    var mobile_phone = document.getElementById("mobile_phone");
    checkValidNumber(mobile_phone,10)
    var phone = document.getElementById("phone");
    checkValidNumber(phone,10)

    if(document.querySelectorAll(".error").length==0){
        return true
    }else{
        return false
    }
}

const validateSubject = () => {
    var addsubject = document.getElementById("addtable")
    var dropsubject = document.getElementById("droptable")
    if(addsubject.querySelectorAll("div").length === 0 && dropsubject.querySelectorAll("div").length === 0){
        const control_row1 = addtable.parentElement.querySelector("div");
        const errorDisplay1 = control_row1.querySelector(".error_table")
        errorDisplay1.innerHTML = "กรุณากรอกรายละเอียดเพิ่มรายวิชา"
        const control_row2 = droptable.parentElement.querySelector("div");
        const errorDisplay2 = control_row2.querySelector(".error_table")
        errorDisplay2.innerHTML = "กรุณากรอกรายละเอียดถอนรายวิชา"
        return false
    }else if(checkSubject(addsubject) && checkSubject(dropsubject)){
        const control_row1 = addtable.parentElement.querySelector("div");
        const errorDisplay1 = control_row1.querySelector(".error_table")
        errorDisplay1.innerHTML = ""
        const control_row2 = droptable.parentElement.querySelector("div");
        const errorDisplay2 = control_row2.querySelector(".error_table")
        errorDisplay2.innerHTML = ""
        list_addSubject = saveSubject(addsubject)
        list_dropSubject = saveSubject(dropsubject)
        return true
    }else{
            const control_row1 = addtable.parentElement.querySelector("div");
            const errorDisplay1 = control_row1.querySelector(".error_table")
            errorDisplay1.innerHTML = ""
            const control_row2 = droptable.parentElement.querySelector("div");
            const errorDisplay2 = control_row2.querySelector(".error_table")
            errorDisplay2.innerHTML = ""
            return false
    }
}

const validateInput = () =>{
    var i = validateInfo()
    var j = validateSubject()
    return i&&j
}

const saveForm = () =>{
    date = getDate()
    prefix = document.getElementById("prefix").value;
    firstname = document.getElementById("firstname").value;
    lastname= document.getElementById("lastname").value;
    studentid = document.getElementById("studentid").value;
    year = document.getElementById("year").value;
    department = document.getElementById("department").value;
    advisor = document.getElementById("advisor").value;
    address_number = document.getElementById("address_number").value;
    moo = document.getElementById("moo").value;
    tumbol = document.getElementById("tumbol").value;
    amphur = document.getElementById("amphur").value;
    province = document.getElementById("province").value;
    postalcode = document.getElementById("postalcode").value;
    mobile_phone = document.getElementById("mobile_phone").value;
    phone = document.getElementById("phone").value;

    var student ={
        date: date,
        prefix: prefix,
        firstname: firstname,
        lastname:lastname,
        studentid:studentid,
        year:year,
        department: department,
        advisor: advisor,
        address_number: address_number,
        moo: moo,
        tumbol:tumbol,
        amphur: amphur,
        province:province,
        postalcode: postalcode,
        mobile_phone: mobile_phone,
        phone: phone,
        addSubjectList : list_addSubject,
        dropSubjectList : list_dropSubject
    };

    fetch("http://localhost:4004/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    }).then(response => {
         if (response.ok){
            return response.text()
         }else{
              throw new error("Failed Submit!!!")
         }
    }).then(data => {
        Swal.fire({
            title: "ลงทะเบียนเพิ่ม-ถอนสำเร็จ",
            icon: "success",
            timer: 3500
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/request';
            }
        });
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            text: error.message,
            timer: 3500,
            showConfirmButton: false
        });
    });
}


var form = document.getElementById("myform");
form.addEventListener("submit", event => {

    event.preventDefault();

    if(validateInput()){
        saveForm();
    }else{
        Swal.fire({
            title: 'ลงทะเบียนเพิ่ม-ถอนไม่สำเร็จ',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        })
    }
    
});

