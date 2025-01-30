
/*
let student ={
    date: date,
    prefix: prefix,
    studentFirstName: studentFirstName,
    studentLastName:studentLastName,
    studentId:studentId,
    studentYear:studentYear,
    studyField: studyField,
    advisor: advisor,
    addressNumber: addressNumber,
    moo: moo,
    tumbol:tumbol,
    amphur: amphur,
    province:province,
    postalCode: postalCode,
    mobilePhone: mobilePhone,
    phone: phone,
    cause : cause
};

let student_add ={
    studentId: studentId,
    subjectCode: subjectCode,
    subjectName: subjectName,
    subjectData: subjectData,
    subjectCredit: subjectCredit,
    subjectTeacher: subjectTeacher,
    subjectTeacherCheck: subjectTeacherCheck,
};


//data Student
fetch("http://localhost:8080/api/students/save", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("Form").reset();
    })
    .catch(error => {
        console.error("เกิดข้อผิดพลาด: " + error);
        document.getElementById("Form").reset();
    });

    //dat student add
    fetch("http://localhost:8080/api/students/save_drop", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("Form").reset();
        })
        .catch(error => {
            console.error("เกิดข้อผิดพลาด: " + error);
            document.getElementById("Form").reset();
        });

})*/