// 1. หาทุก item ที่มีอยู่ใน .exercise-items
let items = document.querySelectorAll('.exercise-items .item');

// 2. สำหรับแต่ละ item, จะทำการตรวจสอบว่ามี class "scrambled-sentence ui-sortable" หรือไม่
items.forEach(item => {
    // ค้นหา .scrambled-sentence ภายใน item
    let scrambledSentenceElements = item.querySelectorAll('.scrambled-sentence');

    scrambledSentenceElements.forEach(scrambledSentenceElement => {
        // ตรวจสอบว่า .scrambled-sentence นี้มี class "ui-sortable"
        if (!scrambledSentenceElement.classList.contains('ui-sortable')) {
            return;  // ข้ามไปยัง .scrambled-sentence ถัดไป
        }

        // 3. ดึงคำใน .scrambled-block ภายใน .scrambled-sentence
        let scrambledBlocks = Array.from(scrambledSentenceElement.querySelectorAll('.scrambled-block'));

        // 4. เรียงคำตาม data-scrambled-block-id
        scrambledBlocks.sort((a, b) => {
            let idA = a.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
            let idB = b.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
            return parseInt(idA) - parseInt(idB); // เรียงจากน้อยไปมาก
        });

        // 5. ลบคำที่มีอยู่ใน .scrambled-sentence ก่อน
        scrambledSentenceElement.innerHTML = '';

        // 6. ใส่คำที่เรียงแล้วกลับเข้าไปใน .scrambled-sentence
        scrambledBlocks.forEach((block) => {
            scrambledSentenceElement.appendChild(block);
        });

        console.log("✅ เรียงคำใน .scrambled-sentence เสร็จเรียบร้อย!");
    });
});

// ไม่มีการกดปุ่ม Correction และ Next แล้ว
