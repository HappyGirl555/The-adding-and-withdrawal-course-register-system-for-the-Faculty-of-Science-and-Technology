
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ตรวจสอบพารามิเตอร์ error
const error = getQueryParam("error");
if (error === "true") {
    const failDisplay = document.getElementById("error")
    failDisplay.innerHTML = "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
}

