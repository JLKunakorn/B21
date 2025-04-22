(function() {
    // ฟังก์ชันสำหรับหน่วงเวลา
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function runAutomation() {
        console.log("เริ่มต้นทำงาน...");

        // 1. ลบ element ที่มี class="exercise-items"
        console.log("กำลังลบ elements ที่มี class 'exercise-items'...");
        const itemsToRemove = document.querySelectorAll('.exercise-items');
        if (itemsToRemove.length > 0) {
            itemsToRemove.forEach(item => item.remove());
            console.log(`ลบไป ${itemsToRemove.length} element(s) สำเร็จ`);
        } else {
            console.log("ไม่พบ element ที่มี class 'exercise-items' ให้ลบ");
        }

        // 2. รอ 0.5 วินาที
        console.log("รอ 0.5 วินาที...");
        await delay(500);

        // 3. คลิก class="btn btn-primary action-exercise-button correct"
        console.log("กำลังค้นหาและคลิกปุ่ม 'correct'...");
        const correctButton = document.querySelector('.btn.btn-primary.action-exercise-button.correct');
        if (correctButton) {
            correctButton.click();
            console.log("คลิกปุ่ม 'correct' สำเร็จ");

            // 4. ตรวจสอบปุ่ม 'next' ทุกๆ 0.5 วินาที เป็นเวลา 3 วินาที
            console.log("เริ่มตรวจสอบปุ่ม 'next' ทุก 0.5 วินาที (เป็นเวลา 3 วินาที)...");
            let foundNextButton = false;
            const maxAttempts = 6; // 3 วินาที / 0.5 วินาทีต่อครั้ง
            // *** ใช้ Selector ที่ตรงกับ HTML ที่ให้มา ***
            const nextButtonSelector = '.btn.btn-primary.action-exercise-button.next.nxt-exercise';

            for (let i = 0; i < maxAttempts; i++) {
                console.log(`ตรวจสอบครั้งที่ ${i + 1} หา: ${nextButtonSelector}`);
                const nextButton = document.querySelector(nextButtonSelector);

                if (nextButton) {
                    console.log("พบปุ่ม 'next'!", nextButton); // Log ตัว element ที่เจอด้วย
                    foundNextButton = true;

                    // 5. ถ้ามี หน่วงเวลา 1.5 วินาที แล้วกด
                    console.log("หน่วงเวลา 1.5 วินาทีก่อนคลิก...");
                    await delay(1000); // หน่วง 1.5 วินาที

                    // ตรวจสอบว่าปุ่มยังอยู่และไม่ได้ disable ก่อนคลิก
                    if (document.querySelector(nextButtonSelector) && !nextButton.disabled) {
                        console.log(">>> กำลังจะคลิกปุ่ม 'next' <<<");
                        nextButton.click();
                        console.log("คลิกปุ่ม 'next' สำเร็จ");
                    } else {
                         console.warn("ปุ่ม 'next' หายไป หรือถูก disable ก่อนที่จะคลิก");
                    }
                    break; // ออกจาก loop เมื่อเจอปุ่มและพยายามคลิกแล้ว
                }
                // รออีก 0.5 วินาทีก่อนตรวจสอบครั้งถัดไป (ยกเว้นครั้งสุดท้าย)
                if (i < maxAttempts - 1) {
                    await delay(500);
                }
            }

            if (!foundNextButton) {
                console.warn(`ไม่พบปุ่ม 'next' (${nextButtonSelector}) ภายใน 3 วินาที`);
            }

        } else {
            console.error("ไม่พบปุ่ม 'correct' (class='btn btn-primary action-exercise-button correct')");
        }

        console.log("ทำงานเสร็จสิ้น");
    }

    // เรียกใช้ฟังก์ชันหลัก
    runAutomation().catch(error => {
        console.error("เกิดข้อผิดพลาดในการทำงาน:", error);
    });

})();
