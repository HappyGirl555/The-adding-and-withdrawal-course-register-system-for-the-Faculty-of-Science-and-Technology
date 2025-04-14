


const dateFormatted = (i) => {
    var date = new Date(i)
    const formattedDate = date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})
    return formattedDate;
}

fetch('http://localhost:4004/request',{
    method: "GET",
         headers: {
        "Content-Type": "application/json",
    }
})


const add_box = document.getElementById("add-table-box")
fetch(`http://localhost:4004/api/request/add`,
    {
         method: "GET",
         headers: {
        "Content-Type": "application/json",
         }
    })
   .then(response=>response.json())
   .then(subjects => {
        console.log(subjects);
        if (Object.values(subjects).length !== 0){
            //create drop table
            if (document.getElementById("empty-message")){
                document.getElementById("empty-message").remove()
            }
            const add_table = document.createElement("table");
            add_table.classList.add("order-table");
            add_table.id = "add-table"
            add_table.innerHTML =
            `
                <thead>
                    <tr>
                        <th class="date-con">วัน/เดือน/ปี</th>
                        <th class="scode-con">รหัสวิชา</th>
                        <th class="sname-con">ชื่อวิชา</th>
                        <th class="sec-con">Section</th>
                        <th class="credit-con">หน่วยกิต</th>
                        <th class="teacher-con">ชื่อผู้สอน</th>
                        <th class="status-con">สถานะ</th>
                        <th class="scode-con">รายละเอียด<br>เพิ่มเติม</th>
                    </tr>
                </thead>
                <tbody id="add-content"> </tbody>
            `
            add_box.appendChild(add_table)
            const add_content = document.getElementById("add-content")
            subjects.forEach(subject => {
                const row = document.createElement("tr")
                row.classList.add("content-row")
                row.innerHTML = `
                <td class="center-text">${dateFormatted(subject.date)}</td>
                <td class="center-text">${subject.subject_code}</td>
                <td class="right-text">${subject.subject_name}</td>
                <td class="center-text">${subject.subject_sec}</td>
                <td class="center-text">${subject.subject_credit}</td>
                <td class="center-text">${subject.subject_teacher}</td>
                <td class="center-text ${subject.subject_teacher_check ? 'check-success' : 'check-unsuccess'}">${subject.subject_teacher_check ? 'เสร็จสิ้น' : 'รอดำเนินการ'}</td>
                <td class="center-text"><a href="/request/add/${subject.reqid}/${subject.addid}">เพิ่มเติม</a></td>
                `
                add_content.appendChild(row)
            })
    } else
    {
        if (document.getElementById("add-table")){
            document.getElementById("add-table").remove()
        }
        const text_message = document.createElement("div")
        text_message.classList.add("empty-message")
        text_message.innerHTML = `
            <h3 class="empty-message-text">ไม่มีการเพิ่มรายวิชา</h3>
        `
        add_box.appendChild(text_message);
    }
    }).catch(error => {
        console.error('Error:', error);
    })

const drop_box = document.getElementById("drop-table-box")
fetch(`http://localhost:4004/api/request/drop`,
    {
         method: "GET",
         headers: {
        "Content-Type": "application/json",
         },
    })
   .then(response=>response.json())
   .then(subjects => {
        console.log(subjects);
        if (Object.values(subjects).length !== 0){
            //create drop table
            if (document.getElementById("empty-message")){
                document.getElementById("empty-message").remove()
            }
            const drop_table = document.createElement("table");
            drop_table.classList.add("order-table");
            drop_table.id = "drop-table"
            drop_table.innerHTML =
            `
                <thead>
                    <tr>
                        <th class="date-con">วัน/เดือน/ปี</th>
                        <th class="scode-con">รหัสวิชา</th>
                        <th class="sname-con">ชื่อวิชา</th>
                        <th class="sec-con">Section</th>
                        <th class="credit-con">หน่วยกิต</th>
                        <th class="teacher-con">ชื่อผู้สอน</th>
                        <th class="status-con">สถานะ</th>
                        <th class="scode-con">รายละเอียด<br>เพิ่มเติม</th>
                    </tr>
                 </thead>
                 <tbody id="drop-content"> </tbody>
            `
             drop_box.appendChild(drop_table)
             const drop_content = document.getElementById("drop-content")
             subjects.forEach(subject => {
                const row = document.createElement("tr")
                row.classList.add("content-row")


                row.innerHTML = `
                <td class="center-text">${dateFormatted(subject.date)}</td>
                <td class="center-text">${subject.subject_code}</td>
                <td class="right-text">${subject.subject_name}</td>
                <td class="center-text">${subject.subject_sec}</td>
                <td class="center-text">${subject.subject_credit}</td>
                <td class="center-text">${subject.subject_teacher}</td>
                <td class="center-text ${subject.subject_teacher_check ? 'check-success' : 'check-unsuccess'}">${subject.subject_teacher_check ? 'เสร็จสิ้น' : 'รอดำเนินการ'}</td>
                 <td class="center-text"><a href="/request/drop/${subject.reqid}/${subject.dropid}">เพิ่มเติม</a></td>
                `
                drop_content.appendChild(row)
            })
        } else
        {
            if(document.getElementById("drop-table")){
                document.getElementById("drop-table").remove()
            }
            const text_message = document.createElement("div")
            text_message.classList.add("empty-message")
            text_message.innerHTML = `
                <h3 class="empty-message-text">ไม่มีการถอนรายวิชา</h3>
            `
            drop_box.appendChild(text_message);
        }
    }).catch(error => {
        console.error('Error:', error);
    })
