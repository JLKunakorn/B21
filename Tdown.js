const scrambledCells = document.querySelectorAll('.scrambled-cell-container');
let minId = Infinity;
let minCell = null;

// ค้นหาค่าของ data-scrambled-cell-id ที่น้อยสุด
scrambledCells.forEach(cell => {
    const cellId = parseInt(cell.querySelector('.scrambled-cell').getAttribute('data-scrambled-cell-id').replace('scrambled-cell-', ''));
    if (cellId < minId) {
        minId = cellId;
        minCell = cell;
    }
});

// เลือก .item ตัวแรกสุดที่ไม่ใช่ intro
const firstItem = document.querySelector('.exercise-items .item:not(.intro)');  // กรอง .item ที่ไม่ใช่ .intro
if (firstItem) {
    const textElement = firstItem.querySelector('.text');
    firstItem.insertBefore(minCell, textElement);  // ย้าย minCell ไปข้างบน .text
}

// ลบ scrambled-cell-container อื่น ๆ ที่ไม่ใช่ minCell
scrambledCells.forEach(cell => {
    if (cell !== minCell) {
        cell.remove();
    }
});
