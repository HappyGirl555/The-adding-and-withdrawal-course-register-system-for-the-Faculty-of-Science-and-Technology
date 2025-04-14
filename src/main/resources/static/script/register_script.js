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
           document.getElementById('prefix').textContent = student.prefix
           document.getElementById('firstname').textContent = student.firstname
           document.getElementById('lastname').textContent=  student.lastname
           document.getElementById('studentid').textContent = student.studentid
           document.getElementById('department').textContent =  student.department
           document.getElementById('year').textContent =  68 - parseInt(student.studentid.slice(0,2))
      })


const getDate = () =>{
    var date = new Date()
    return date.toISOString().split('T')[0]
}

function addSubjectInputs() {
    const subAll = document.getElementById("addtable")
    const sub = document.createElement("div");
    sub.classList.add("sub-div")
    const len_div = subAll.querySelectorAll(".sub-div").length;
    if (len_div>=10){
        alert("เพิ่มวิชาได้สูงสุด 10 วิชา");
    }else{

       sub.innerHTML =
        `
        <div>
            <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px">
                <p style="color:purple text-decorat" class="num_sub"><strong>เพิ่มรายวิชาที่ ${len_div+1}</strong></p>
                <p><strong>รหัสวิชา</strong></p>
                <input id="subject_code${len_div+1}" style="width:100px; height:30px; border: 0px;  padding: 1px 5px 1px 5px;">
                <p><strong>ชื่อวิชา</strong></p>
                <input id="subject_name${len_div+1}"style="width:250px; height:30px; border: 0px;  padding: 1px 5px 1px 5px;">
            </div>
            <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px" > 
                <p><strong>Section</strong></p>
                <input id="subject_sec${len_div+1}" style="width:150px; height:30px; border: 0px; padding: 1px 5px 1px 5px;" >          
                <p><strong>วัน/เวลา</strong></p>
                <input id="subject_date${len_div+1}" style="width:170px; height:30px; border: 0px; padding: 1px 5px 1px 5px;">
                    
            </div>
            <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px">
                <p><strong>หน่วยกิต </strong></p>
                <input id="subject_credit${len_div+1}"type=number min=1 max=3 style="width:100px; height:30px; border: 0px; padding: 1px 5px 1px 5px;"> 
                <p><strong>ชื่อผู้สอน</strong></p>
                <input id="subject_teacher${len_div+1}" style="width:270px; height:30px; border: 0px; padding: 1px 5px 1px 5px;">
            </div>    
            <div style="text-align:left;">
                <p><strong>เหตุผลการเพิ่มรายวิชา </strong></p>
                <input id="subject_cause${len_div+1}" style="width:100%; height:50px; border: 0px;padding: 1px 5px 1px 5px;">
            </div>
        </div>                  
        <div style="text-align:right; margin-top: 5px">
            <button onclick="cancleAddSubject(this)" type="button" id="cancle" class="cancle" >ยกเลิก</button>
        </div>
        `
        sub.id = `sub-addtable${len_div + 1}`;
        subAll.appendChild(sub)
    } 
}


function drop_addSubjectInputs() {
    const newtable = document.getElementById("addtable")
    const all_sub = newtable.querySelectorAll(".sub-div");
    const len_sub = all_sub.length
    if(len_sub>0){
        newtable.removeChild(all_sub[len_sub-1]);
    }
}    

function cancleAddSubject(button){
    const table = document.getElementById("addtable")
    const all_sub = table.querySelectorAll(".sub-div");
    const len_sub = all_sub.length
    const cansub = button.parentElement.parentElement;
    const index = parseInt(cansub.id.slice(12));
    table.removeChild(all_sub[index-1]);

    if (index != len_sub){
        for (var i = index-1 ; i < table.querySelectorAll(".sub-div").length ; i++){
            var ctable = table.querySelectorAll(".sub-div")[i];
            ctable.querySelector(".num_sub").innerHTML = `<strong>เพิ่มรายวิชาที่ ${i + 1}</strong>`;
            ctable.id = `sub-addtable${i + 1}`;
            ctable.querySelector(`#subject_code${i+2}`).id = `subject_code${i+1}`
            ctable.querySelector(`#subject_name${i+2}`).id = `subject_name${i+1}`
            ctable.querySelector(`#subject_sec${i+2}`).id = `subject_sec${i+1}`
            ctable.querySelector(`#subject_date${i+2}`).id = `subject_date${i+1}`
            ctable.querySelector(`#subject_credit${i+2}`).id = `subject_credit${i+1}`
            ctable.querySelector(`#subject_teacher${i+2}`).id = `subject_teacher${i+1}`
            ctable.querySelector(`#subject_cause${i+2}`).id = `subject_cause${i+1}`
        }
    }
}

function dropSubjectInputs() {
    const subAll = document.getElementById("droptable")
    const sub = document.createElement("div");
    sub.classList.add("sub-div")
    const len_div = subAll.querySelectorAll(".sub-div").length;
    if (len_div>=10){
        alert("เพิ่มวิชาได้สูงสุด 10 วิชา");
    }else{

        sub.innerHTML =
         `
         <div>
             <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px">
                 <p style="color:purple text-decorat" class="num_sub"><strong>ถอนรายวิชาที่ ${len_div+1}</strong></p>
                 <p><strong>รหัสวิชา</strong></p>
                 <input id="subject_code${len_div+1}" style="width:100px; height:30px; border: 0px;  padding: 1px 5px 1px 5px;">
                 <p><strong>ชื่อวิชา</strong></p>
                 <input id="subject_name${len_div+1}"style="width:250px; height:30px; border: 0px;  padding: 1px 5px 1px 5px;">
             </div>
             <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px" > 
                 <p><strong>Section</strong></p>
                 <input id="subject_sec${len_div+1}" style="width:150px; height:30px; border: 0px; padding: 1px 5px 1px 5px;" >          
                 <p><strong>วัน/เวลา</strong></p>
                 <input id="subject_date${len_div+1}" style="width:170px; height:30px; border: 0px; padding: 1px 5px 1px 5px;">
                     
             </div>
             <div style="display: flex; justify-content:flex-start; align-items:center; gap:10px">
                 <p><strong>หน่วยกิต </strong></p>
                 <input id="subject_credit${len_div+1}"type=number min=1 max=3 style="width:100px; height:30px; border: 0px; padding: 1px 5px 1px 5px;"> 
                 <p><strong>ชื่อผู้สอน</strong></p>
                 <input id="subject_teacher${len_div+1}" style="width:270px; height:30px; border: 0px; padding: 1px 5px 1px 5px;">
             </div>    
             <div style="text-align:left;">
                 <p><strong>เหตุผลการเพิ่มรายวิชา </strong></p>
                 <input id="subject_cause${len_div+1}" style="width:100%; height:50px; border: 0px;padding: 1px 5px 1px 5px;">
             </div>
         </div>                  
         <div style="text-align:right; margin-top: 5px">
             <button onclick="cancleDropSubject(this)" type="button" id="cancle" class="cancle" >ยกเลิก</button>
         </div>
         `
         sub.id = `sub-droptable${len_div + 1}`;
         subAll.appendChild(sub)
     } 
 }


function drop_dropSubjectInputs() {
    const newtable = document.getElementById("droptable")
    const all_sub = newtable.querySelectorAll(".sub-div");
    const len_sub = all_sub.length
    if(len_sub>0){
        newtable.removeChild(all_sub[len_sub-1]);
    }
}    

function cancleDropSubject(button){
    const table = document.getElementById("droptable")
    const all_sub = table.querySelectorAll(".sub-div");
    const len_sub = all_sub.length
    const cansub = button.parentElement.parentElement;
    const index = parseInt(cansub.id.slice(13));
    table.removeChild(all_sub[index-1]);
    
    if (index != len_sub){
        for (var i = index-1 ; i < table.querySelectorAll(".sub-div").length ; i++){
            var ctable = table.querySelectorAll(".sub-div")[i];
            ctable.querySelector(".num_sub").innerHTML = `<strong>ถอนรายวิชาที่ ${i + 1}</strong>`;
            ctable.id = `sub-droptable${i + 1}`; 
            ctable.querySelector(`#subject_code${i+2}`).id = `subject_code${i+1}`
            ctable.querySelector(`#subject_name${i+2}`).id = `subject_name${i+1}`
            ctable.querySelector(`#subject_sec${i+2}`).id = `subject_sec${i+1}`
            ctable.querySelector(`#subject_date${i+2}`).id = `subject_date${i+1}`
            ctable.querySelector(`#subject_credit${i+2}`).id = `subject_credit${i+1}`
            ctable.querySelector(`#subject_teacher${i+2}`).id = `subject_teacher${i+1}`
            ctable.querySelector(`#subject_cause${i+2}`).id = `subject_cause${i+1}`
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
    var subjects = idTable.querySelectorAll('.sub-div')
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
    var subjectsInput = idTable.querySelectorAll('.sub-div')
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
    var check_add = checkSubject(addsubject)
    var check_drop =checkSubject(dropsubject)
    if(addsubject.querySelectorAll(".sub-div").length === 0 && dropsubject.querySelectorAll(".sub-div").length === 0){
        const control_row1 = addtable.parentElement.querySelector("div");
        const errorDisplay1 = control_row1.querySelector(".error_table")
        errorDisplay1.innerHTML = "กรุณากรอกรายละเอียดเพิ่มรายวิชา"
        const control_row2 = droptable.parentElement.querySelector("div");
        const errorDisplay2 = control_row2.querySelector(".error_table")
        errorDisplay2.innerHTML = "กรุณากรอกรายละเอียดถอนรายวิชา"
        return false
    }else if(check_add && check_drop){
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
    prefix = document.getElementById("prefix").innerText;
    firstname = document.getElementById("firstname").innerText;
    lastname= document.getElementById("lastname").innerText;
    studentid = document.getElementById("studentid").innerText;
    year = document.getElementById("year").innerText;
    department = document.getElementById("department").innerText;
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

