console.log("🚀 [Drag] เริ่มต้นการทำงาน...");

// ค้นหา `.drag-drop-placeholder.ui-droppable` ตัวแรกที่อยู่ใน `.exercise-items`
let targetElement = document.querySelector('.exercise-items .drag-drop-placeholder.ui-droppable');

if (targetElement) {
    targetElement.click();
    console.log("✅ [Drag] คลิกสำเร็จที่ .drag-drop-placeholder.ui-droppable");
} else {
    console.log("❌ [Drag] ไม่พบ .drag-drop-placeholder.ui-droppable");
}

// หน่วงเวลา 0.5 วิ หลังจากกด placeholder
setTimeout(() => {
    console.log("🚀 [Drag] เริ่มต้นคลิกตามลำดับจากน้อยไปมาก...");

    // หาวัตถุเป้าหมายทั้งหมดใน .draggable-container
    let draggableElements = Array.from(document.querySelectorAll('.draggable-container .drag-drop.ui-state-default.ui-draggable.ui-draggable-handle.ui-droppable'));

    // เรียงลำดับจากตัวเลขน้อยไปมาก ตามค่า data-drag-drop-id
    draggableElements.sort((a, b) => {
        let idA = parseInt(a.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
        let idB = parseInt(b.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
        return idA - idB;
    });

    // คลิกตามลำดับ พร้อมหน่วง 10ms ต่อแต่ละคลิก
    draggableElements.forEach((element, index) => {
        setTimeout(() => {
            element.click();
            console.log(`✅ [Drag] คลิกที่ ${element.getAttribute('data-drag-drop-id')}`);
        }, index * 10);
    });

    console.log("🎯 [Drag] คลิก Drag-Drop เสร็จแล้ว!");

    // หน่วงเวลา 500ms หลังจากคลิก drag-drop ทั้งหมด แล้วกด Correction
    setTimeout(() => {
        console.log("🚀 [Drag] กำลังกด Correction...");

        let correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Drag] กด Correction สำเร็จ");
        } else {
            console.log("❌ [Drag] ไม่พบปุ่ม Correction!");
        }

        // หน่วงเวลา 1 วินาทีแล้วกด Next
        setTimeout(() => {
            console.log("🚀 [Drag] กำลังกด Next...");

            let nextButton = document.querySelector('.btn.btn-primary.action-exercise-button.next.nxt-exercise');
            if (nextButton && nextButton.offsetHeight > 0 && nextButton.offsetWidth > 0) {
                nextButton.click();
                console.log("✅ [Drag] กด Next สำเร็จ");
            } else {
                console.log("❌ [Drag] ไม่พบปุ่ม Next!");
            }

            console.log("🎉 [Drag] เสร็จสิ้นการทำงาน!");
        }, 1000); // หน่วงเวลา 1 วินาทีหลัง Correction
    }, draggableElements.length * 10 + 500); // หน่วง 500ms หลังจาก drag-drop เสร็จ
}, 500); // หน่วงเวลา 0.5 วิ หลังจากกด placeholder
