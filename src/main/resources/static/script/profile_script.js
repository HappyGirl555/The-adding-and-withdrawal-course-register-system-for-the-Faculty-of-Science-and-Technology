const profileImage = document.getElementById("profile-image");
const imageInput = document.getElementById("image-input");

async function fetchUserData() {
    const response = await fetch('http://localhost:4004/api/info',
        {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
        })

    if(!response.ok){
        throw new Error("Failed Up data")
    }

    const student = await response.json();
    const info_box =document.getElementById('info-describe');
    info_box.innerHTML =`
            <div style="margin:0px 0px 20px 0px;">
                <h2>ชื่อ-นามสกุล : ${student.prefix}${student.firstname} ${student.lastname}</h2>
            </div>
            <div style="margin:0px 0px 20px 0px;">
                <h2 style="margin:0;">รหัสนักศึกษา : ${student.studentid}</h2>
            </div>
            <div style="display:flex;">
                <h2 style="margin:0;">ชั้นปีที่ : ${68 - parseInt(student.studentid.slice(0,2))} &nbsp; </h2>
                <h2 style="margin:0;">สาขาวิชา : ${student.department}</h2>
            </div>
    `

    const response_profile = await fetch('http://localhost:4004/api/info/picture',
        {
             method: "GET",
        })

    if(!response_profile.ok){
            throw new Error("Failed Up data")
    }

    const contentType = response_profile.headers.get("Content-Type");
    if (contentType && contentType.startsWith("image/")) {
        console.log("goo")
        const imagefile = await response_profile.blob();
        console.log(imagefile)
        const imageUrl = URL.createObjectURL(imagefile);
        profileImage.src = imageUrl;
    }else{
        profileImage.src = '/picture/user.png';
    }

        
}

fetchUserData()

profileImage.addEventListener('click', ()=>{
        imageInput.click();
    })

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        const formData = new FormData();
        formData.append("imageFile", file);
        reader.onload = (e) => {
            profileImage.src = e.target.result;
            profile.src = e.target.result;
            fetch('http://localhost:4004/api/info/picture',
                {
                    method: "POST",
                    body: formData
            }).then(response => {
                if(response.ok){
                    return response.json()
                }else{
                    console.log(response)
                    throw new Error("Failed Up data")
                }
            })
        };
        reader.readAsDataURL(file);
    }
});
/*
fetch('http://localhost:4004/api/info/picture',
    {
         method: "POST",
         headers:{
             "Content-Type": "application/json"
         }
 }).then(response => {
       if(response.ok){
           return response.json()
       }else{
           console.log(response)
           throw new Error("Failed Up data")
       }
 }).then(student => {
        
    
 })*/