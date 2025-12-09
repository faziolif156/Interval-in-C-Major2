const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const spinBtn = document.getElementById('spin-btn');
const statusMsg = document.getElementById('status-message');

let isSpinning = false;

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reelElement, duration, targetSymbol) {
    return new Promise(resolve => {
        reelElement.classList.add('spinning');
        const symbolElement = reelElement.querySelector('.symbol');

        // Visual spinning effect
        const interval = setInterval(() => {
            symbolElement.textContent = getRandomSymbol();
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            reelElement.classList.remove('spinning');
            symbolElement.textContent = targetSymbol;
            resolve(targetSymbol);
        }, duration);
    });
}

spinBtn.addEventListener('click', async () => {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;
    statusMsg.textContent = "Spinning...";
    statusMsg.className = "status";

    // Determine results explicitly to ensure no doubles
    const result1 = getRandomSymbol();
    let result2 = getRandomSymbol();

    // REROLL until distinct
    while (result2 === result1) {
        result2 = getRandomSymbol();
    }

    // Spin both reels with specific targets
    const p1 = spinReel(reel1, 1500, result1);
    const p2 = spinReel(reel2, 2000, result2);

    await Promise.all([p1, p2]);

    isSpinning = false;
    spinBtn.disabled = false;

    statusMsg.textContent = "Try Again!";
});
