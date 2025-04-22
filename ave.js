// ฟังก์ชันจัดเรียงและเติมบล็อกกรณีซ้ำ/ขาดตำแหน่ง
function sortAndFillBlocks(blocks) {
  const groups = blocks.reduce((acc, el) => {
    const id = parseInt(el.dataset.scrambledBlockId.replace('scr-block-', ''), 10);
    acc[id] = acc[id] || [];
    acc[id].push(el);
    return acc;
  }, {});
  const ids = Object.keys(groups).map(n => parseInt(n, 10)).sort((a, b) => a - b);
  const min = ids[0], max = ids[ids.length - 1];
  const actualIds = new Set(ids);
  const result = [], extras = [];

  for (let i = min; i <= max; i++) {
    if (groups[i]) {
      result.push(groups[i].shift());
      while (groups[i].length) extras.push(groups[i].shift());
    }
    if (!actualIds.has(i) && extras.length) {
      result.push(extras.shift());
    }
  }
  return result.concat(extras);
}

// helper รอหา element ตาม selector ภายใน timeout (ms)
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;
    const timer = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        resolve(el);
      } else if ((elapsed += interval) >= timeout) {
        clearInterval(timer);
        reject();
      }
    }, interval);
  });
}

(async () => {
  // 1. เรียง‐เติมบล็อก
  const items = Array.from(document.querySelectorAll('.exercise-items .item'));
  if (!items.length) {
    console.warn('⚠️ ไม่พบ .exercise-items .item ใดๆ');
    return;
  }
  items.forEach(item =>
    item.querySelectorAll('.scrambled-sentence.ui-sortable').forEach(sentenceEl => {
      const blocks = Array.from(sentenceEl.querySelectorAll('.scrambled-block'));
      const ordered = sortAndFillBlocks(blocks);
      sentenceEl.innerHTML = '';
      ordered.forEach(b => sentenceEl.appendChild(b));
    }));
  console.log('✅ เรียงและเติมบล็อกเสร็จเรียบร้อย');

  // 2. รอปุ่ม Correct โผล่ แล้วกด
  try {
    const correctBtn = await waitForElement('.action-exercise-button.correct', 7000);
    correctBtn.click();
    console.log('✅ กดปุ่ม Correction แล้ว');
  } catch {
    console.warn('❌ ไม่พบปุ่ม Correction ภายในเวลา');
    return;
  }

  // 3. หน่วงเวลา 1 วิ ก่อนจะหาและกด Next
  await new Promise(res => setTimeout(res, 1000));

  try {
    const nextBtn = await waitForElement('button[class*="next"]', 7000);
    nextBtn.click();
    console.log('✅ กดปุ่ม Next เรียบร้อย');
  } catch {
    console.warn('❌ ไม่พบปุ่ม Next ภายในเวลา');
  }
})();
