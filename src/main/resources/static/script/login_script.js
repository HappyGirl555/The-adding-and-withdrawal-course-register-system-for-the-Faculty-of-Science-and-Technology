function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ตรวจสอบพารามิเตอร์ error
const error = getQueryParam("error");
if (error === "true") {
    Swal.fire({
       title: "ลงทะเบียนเข้าสู่ระบบไม่สำเร็จ",
       text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
       icon: "error",
       timer: 1500,
       showConfirmButton: false
   });

    const failDisplay = document.getElementById("error");
    failDisplay.innerHTML = "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";
}
