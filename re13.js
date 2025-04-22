// ข้อความที่ต้องการเช็ค
let targetWords = ['a little','a few','Few','less','a few','fewer','Little','less'];

// ฟังก์ชั่นเพื่อสุ่มคลิกและเช็คคำ
function checkAndRefresh(index) {
    let items = document.querySelectorAll('.exercise-items .gap-container.form-inline.form-group-sm');  // เลือกทุก item
    if (index >= items.length) return;  // ถ้าเช็คหมดแล้วก็หยุด

    let item = items[index];
    let alertSpan = item.querySelector('.gap.form-control[role="alert"]');
    let addonButtons = item.querySelectorAll('.input-group-addon');  // เลือกทุกปุ่ม input-group-addon

    if (addonButtons.length > 0) {
        let clickInterval = setInterval(() => {
            let randomButton = addonButtons[Math.floor(Math.random() * addonButtons.length)];  // เลือกปุ่มสุ่ม
            randomButton.click();  // คลิกปุ่มสุ่ม
            console.log(`✅ คลิกปุ่มสุ่มใน Item ${index + 1}`);

            if (alertSpan) {
                let currentText = alertSpan.innerText.trim();
                if (currentText === targetWords[index]) {
                    console.log(`✅ ข้อที่ ${index + 1}: คำตรงกับที่กำหนด: "${currentText}"`);
                    clearInterval(clickInterval);  // หยุดการสุ่มคลิกเมื่อคำตรง
                    if (index + 1 < targetWords.length) {
                        checkAndRefresh(index + 1);  // ไปข้อถัดไป
                    } else {
                        // เมื่อเช็คทุกข้อเสร็จสิ้น
                        setTimeout(() => {
                            let correctButton = document.querySelector('.action-exercise-button.correct');
                            correctButton && correctButton.click();  // คลิกปุ่ม correct
                            console.log("✅ กดปุ่ม Correct");

                            setTimeout(() => {
                                let nextButton = document.querySelector('.btn.btn-primary.action-exercise-button.next.nxt-exercise');
                                nextButton && nextButton.click();  // คลิกปุ่ม next
                                console.log("✅ กดปุ่ม Next");
                            }, 1500);  // หน่วงเวลา 1.5 วินาที
                        }, 800);  // หน่วงเวลา 0.8 วินาทีหลังจากการเช็คเสร็จ
                    }
                } else {
                    console.log(`❌ ข้อที่ ${index + 1}: คำไม่ตรงกับที่กำหนด. คำที่พบ: "${currentText}". กำลังสุ่มคลิกใหม่...`);
                }
            }
        }, 100);  // ทำการสุ่มคลิกทุก 100ms เพื่อให้เร็วที่สุด
    } else {
        console.log(`❌ ข้อที่ ${index + 1}: ไม่พบปุ่ม input-group-addon`);
    }
}

// เริ่มต้นที่ข้อแรก
checkAndRefresh(0);
