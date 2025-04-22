const scrambledCells = document.querySelectorAll('.scrambled-cell-container');
let minId = Infinity;
let minCell = null;

scrambledCells.forEach(cell => {
    const cellId = parseInt(cell.querySelector('.scrambled-cell').getAttribute('data-scrambled-cell-id').replace('scrambled-cell-', ''));
    if (cellId < minId) {
        minId = cellId;
        minCell = cell;
    }
});

// หาตำแหน่งของ .text ที่อยู่ภายใน .item ตัวแรกสุด
const firstItem = document.querySelector('.exercise-items .item');
const textElement = firstItem.querySelector('.text');

// ลบ scrambled-cell-container อื่น ๆ ที่ไม่ใช่ minCell
scrambledCells.forEach(cell => {
    if (cell !== minCell) {
        cell.remove();
    }
});

// ย้าย minCell ไปอยู่ใต้ .text
firstItem.appendChild(minCell);  // ย้ายไปใต้ .text
