// 1. เลือกทุกองค์ประกอบที่มี class="answer-container form-inline form-group-sm"
let answerContainers = document.querySelectorAll('.answer-container.form-inline.form-group-sm');

// 2. ลบทุกตัวที่เกินจากตัวแรก
for (let i = 1; i < answerContainers.length; i++) {
    answerContainers[i].remove();
}

// --- ส่วนที่เพิ่มเข้ามา ---

// 3. หา container อันแรกที่เหลืออยู่ (ใช้ querySelector จะได้ตัวแรกเสมอ)
//    หรือจะใช้ answerContainers[0] ก็ได้ถ้ามั่นใจว่ามีอย่างน้อย 1 ตัวและ NodeList ไม่เปลี่ยนแปลง
let theRemainingContainer = document.querySelector('.answer-container.form-inline.form-group-sm');

// 4. ตรวจสอบว่าเจอ container ที่เหลือหรือไม่ (เผื่อกรณีไม่มี element ตรงเงื่อนไขตั้งแต่แรก)
if (theRemainingContainer) {
    // 5. หา input field ที่ต้องการ *ภายใน* container นั้น
    //    เราใช้ class 'answer' และ 'form-control' ในการระบุ input ที่ต้องการ
    let targetInput = theRemainingContainer.querySelector('input.answer.form-control');

    // 6. ตรวจสอบว่าเจอ input field หรือไม่
    if (targetInput) {
        // 7. กำหนดค่า (value) ให้กับ input field
        targetInput.value = "there are new candidates";
        console.log("กำหนดค่า 'If I had been you' ให้กับ input field สำเร็จ");
    } else {
        // กรณีหา input ไม่เจอภายใน container (อาจเป็นไปได้ถ้าโครงสร้าง HTML ไม่ตรง)
        console.error("ไม่พบ input field ที่มี class 'answer form-control' ภายใน container ที่เหลือ");
    }
} else {
    // กรณีไม่เจอ container ที่ตรงเงื่อนไขเลยตั้งแต่แรก หรือหาไม่เจอหลังการลบ
    console.warn("ไม่พบ container '.answer-container.form-inline.form-group-sm' เหลืออยู่");
}
