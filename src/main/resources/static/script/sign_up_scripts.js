//import {studentID} from "./studentID.js"
//export let studentID;


const sign_up_form = document.getElementById("signupForm")

const failRegister = () =>{
        const failDisplay = document.getElementById("error")
        failDisplay.innerHTML = "ลงทะเบียนเข้าสู่ระบบไม่สำเร็จ กรุณากรอกใหม่อีกครั้ง"
}

const emptyInput = () =>{
        const failDisplay = document.getElementById("error")
        failDisplay.innerHTML = "กรุณากรอกข้อมูลให้ครบถ้วน"
}

const dupRegister = () =>{
        const failDisplay = document.getElementById("error")
        failDisplay.innerHTML = "รหัสนักศึกษามีบัญชีในระบบแล้ว"
}

const setError = (elm) => {
    const inputControl = elm.parentElement;
    if(!inputControl.classList.contains('error')){
        inputControl.classList.add('error')
    }
};

const setSuccess = (elm) => {   
   const inputControl = elm.parentElement;
   if(inputControl.classList.contains('error')){
        inputControl.classList.remove('error')
    }
 };


const checkNotEmpty = (elm) => {
    if (elm.value.trim() === ''){
        setError(elm);
        return
    }else{
        setSuccess(elm);
        return
    }
    
};

const notEmpty = () =>{
    checkNotEmpty(document.getElementById("studentID"))
    console.log("1")
    checkNotEmpty(document.getElementById("password-uni"))
    console.log("2")
    checkNotEmpty(document.getElementById("password"))
    console.log("3")
    if(document.querySelectorAll(".error").length==0){
        return true
    }else{
        return false
    }
}
    

sign_up_form.addEventListener("submit", async event => {
     event.preventDefault();
     var studentID = document.getElementById("studentID")
     var password_uni = document.getElementById("password-uni")
     var username = document.getElementById("studentID")
     var password = document.getElementById("password")

     var data = {
        UserName : studentID.value,
        PassWord : password_uni.value
     }
     console.log(data)

     if(!notEmpty()){
        emptyInput()
        Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            text: error.message,
            icon: "error",
            timer: 2500,
            showConfirmButton: false
        });
        return 
     }

     const check_student = await fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Application-Key" :	"TUc5049959a376844e1b9d2b83d52f0714b53c285ee113ecb30748e33decbe4f5e77d54ae334054092069a7eedd00e5ac3"
            },
            body: JSON.stringify(data)
        })

     if (!check_student.ok || password.value.length < 8 || username.value.length < 8){
           console.log("error-check")
           failRegister()
           Swal.fire({
               title: "ลงทะเบียนเข้าสู่ระบบไม่สำเร็จ \n กรุณากรอกใหม่อีกครั้ง",
               text: error.message,
               icon: "error",
               timer: 2500,
               showConfirmButton: false
           });
           throw new Error("Failed Register!!!")
      }

      console.log(studentID.value)

      fetch(`https://restapi.tu.ac.th/api/v2/profile/std/info/?id=${studentID.value}`,
          {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Application-Key" :	"TUc5049959a376844e1b9d2b83d52f0714b53c285ee113ecb30748e33decbe4f5e77d54ae334054092069a7eedd00e5ac3"
          }}).then(response => {
              if(response.ok){
                  return response.json()
              }else{
                  console.log(response)
                  throw new Error("Failed Up data")
              }
          }).then(student => {
           var data_student = student.data
           fetch("http://localhost:4004/student/signup", {
             method: "POST",
             headers: {
             "Content-Type": "application/json"
             },
             body: JSON.stringify(
                { studentid : studentID.value,
                     username : username.value,
                     password : password.value,
                     prefix : (data_student.prefixname === "Miss") ? "นางสาว" : "นาย",
                     firstname : data_student.displayname_th.split(" ")[0],
                     lastname : data_student.displayname_th.split(" ")[1],
                     department : data_student.department
                 })
            }).then(response =>{
                    if(response.ok){
                        Swal.fire({
                        title: "ลงทะเบียนผู้ใช้งานเสร็จสิ้น",
                        icon: "success",
                        draggable: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/';
                            }
                        })
                    return response.text();
                    }else if(response.status == 409){
                        dupRegister()
                        Swal.fire({
                            title: "รหัสนักศึกษามีบัญชีในระบบแล้ว",
                            text: error.message,
                            icon: "error",
                            timer: 2500,
                            showConfirmButton: false
                        });
                        return
                    }else{
                    console.log("ไม่สำเร็จ")
                    }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                    text: error.message,
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false
                });
            });

      }).catch(error =>{
           console.log(error.message)
      })
 });


