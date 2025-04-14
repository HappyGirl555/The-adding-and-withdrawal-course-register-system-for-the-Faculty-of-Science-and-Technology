const request_descrip_box = document.getElementById("request-descrip")

const dateFormatted = (i) => {
    var date = new Date(i)
    const formattedDate = date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})
    return formattedDate;
}

const checkPhone = (phone) =>{
       if(phone===""){
            return "-";
       }else{
            return phone;
       }
}



const detailRequest = (description,type,id) =>{
            console.log(description)
            console.log(id)
            const request_topic = document.createElement("div");
            let typeSubject
            request_topic.id = "request-topic"
            let subject
            //for topic
            if(type === 'add'){
               typeSubject = description.addSubjectList
               subject = typeSubject.find(subject => subject.addid === id)
               request_topic.innerHTML =
                    `
                        <h1>ลงทะเบียนเพิ่มรายวิชา ${subject.subject_code} ${subject.subject_name}</h1>
                    `
            }else if(type === 'drop'){
                typeSubject = description.dropSubjectList
                subject = typeSubject.find(subject => subject.dropid === id)
                request_topic.innerHTML =
                    `
                        <h1>ลงทะเบียนถอนรายวิชา ${subject.subject_code} ${subject.subject_name}</h1>
                    `
            }
            request_topic.innerHTML += 
            `
                <h2 class="date">ลงทะเบียนเมื่อวันที่ ${dateFormatted(description.date)} เวลา ${description.time.slice(0,5)} น.</h2>
            `
            request_descrip_box.appendChild(request_topic)

            //for description subject
            const content_subject = document.createElement("div");
            content_subject.id="content-subject";
            content_subject.className = "content-subject";
            content_subject.innerHTML =
            `   
                <div style="grid-area:head;">
                   <h2>ข้อมูลรายวิชา</h2>
                </div>
                <div style="grid-area:a;">
                    <p><strong>รหัสวิชา </strong> ${subject.subject_code}</p>
                </div>
                <div style="grid-area:b;">
                    <p><strong>ชื่อรายวิชา </strong> ${subject.subject_name}</p>
                </div>
                <div style="grid-area:c;">
                    <p><strong>Section </strong> ${subject.subject_sec}</p>
                </div>
                <div style="grid-area:d;">
                    <p><strong>หน่วยกิต </strong> ${subject.subject_credit}</p>
                </div>
                <div style="grid-area:e;">
                    <p><strong>วัน/เวลา </strong> ${subject.subject_date}</p>
                </div style="grid-area:f;">
                <div>
                    <p><strong>อาจารย์ผู้สอน </strong> ${subject.subject_teacher}</p>
                </div>
                <div style="grid-area: g;">
                     <p><strong>เหตุผลการลงทะเบียน </strong> ${subject.subject_cause}</p>
                </div>
                <div style="display:flex; gap:5px; margin:0px; grid-area: h;">
                     <p> <strong>สถานะ </strong> <p>
                     <p class="${subject.subject_teacher_check ? 'check-success' : 'check-unsuccess'}">
                        ${subject.subject_teacher_check ? 'เสร็จสิ้น' : 'รอดำเนินการ'} <p>
                </div>
            `
            const hr1 = document.createElement("hr");
            request_descrip_box.appendChild(content_subject)
            request_descrip_box.appendChild(hr1)


            //for student description
            const content_student = document.createElement("div");
            content_student.className = "content-student"
            content_student.innerHTML =
            `
                <div style="grid-area:head1;">
                    <h2>ข้อมูลนักศึกษา</h2>
                </div>
                <div style="grid-area:a;">
                    <p><strong>ชื่อ-นามสกุล </strong> ${description.prefix}${description.firstname} ${description.lastname}</p>
                </div>
                <div style="grid-area:b;">
                    <p><strong>ชั้นปีที่</strong> ${description.year}</p>
                </div>
                <div style="grid-area:c;"> 
                    <p><strong>รหัสนักศึกษา </strong> ${description.studentid}</p>
                </div>
                <div style="grid-area:d;">
                    <p><strong>สาขาวิชา </strong> ${description.department}</p>
                </div>
                <div style="grid-area:e;">
                    <p><strong>อาจารย์ที่ปรึกษา </strong> ${description.advisor}</p>
                </div>
            `
            const hr2 = document.createElement("hr");
            request_descrip_box.appendChild(content_student)
            request_descrip_box.appendChild(hr2)

            //for student address
            const  content_address = document.createElement("div");
            content_address.className = "content-address"
            content_address.innerHTML =`
            <div style="grid-area:head2;">
                    <h2>ที่อยู่นักศึกษา</h2>
                </div>
                <div style="grid-area:f;">
                     <p><strong>บ้านเลขที่ </strong> ${description.address_number}</p>
                </div>
                <div style="grid-area:g;">
                     <p><strong>หมู่ </strong> ${description.moo}</p>
                </div>
                 <div style="grid-area:h;">
                     <p><strong>ตำบล </strong> ${description.tumbol}</p>
                </div>
                <div style="grid-area:i;">
                     <p><strong>อำเภอ </strong> ${description.amphur}</p>
                </div>
                 <div style="grid-area:j;">
                     <p><strong>จังหวัด </strong> ${description.province}</p>
                     
                </div>
                <div style="grid-area:k;">
                     <p><strong>รหัสไปรษณีย์ </strong> ${description.postalcode}</p>
                </div>
                 <div style="grid-area:l;">
                     <p><strong>เบอร์โทรศัพท์มือถือ </strong> ${description.mobile_phone}</p>
                </div>
                <div style="grid-area:m;">
                     <p><strong>เบอร์โทรศัพท์บ้าน </strong> ${checkPhone(description.phone)}</p>
                </div>
            `
            request_descrip_box.appendChild(content_address)
            

}

const currentURLRequest = window.location.pathname
if (currentURLRequest.includes("/request/drop/")){
    const urlParts = currentURLRequest.split("/");
    const reqid = urlParts[urlParts.length - 2];
    const id = urlParts[urlParts.length - 1];
    fetch(`http://localhost:4004/api/request/${reqid}`,
        {
             method: "GET",
             headers: {
            "Content-Type": "application/json",
             }
        })
       .then(response=>response.json())
       .then(description => {
             console.log(description)
             detailRequest(description,"drop",Number(id))
        }).catch(error => {
            console.error('Error:', error);
    })
}

if (currentURLRequest.includes("/request/add/")) {
    const urlParts = currentURLRequest.split("/");
    const reqid = urlParts[urlParts.length - 2];
    const id = urlParts[urlParts.length - 1];
    fetch(`http://localhost:4004/api/request/${reqid}`,
        {
             method: "GET",
             headers: {
            "Content-Type": "application/json",
             }
        })
       .then(response=>response.json())
       .then(description => {
            detailRequest(description,"add",Number(id))
        }).catch(error => {
            console.error('Error:', error);
    })
}

