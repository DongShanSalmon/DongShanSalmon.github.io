// 這裡可以添加互動功能
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chess-board');

    // 用於生成棋盤格子的代碼
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add((Math.floor(i / 8) + i) % 2 === 0 ? 'light' : 'dark');
        board.appendChild(square);
    }
});
