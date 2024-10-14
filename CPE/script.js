const MAX_TXT_FILES = 10; // 假設最多有10個文件
const codeDisplay = document.getElementById('codeDisplay');

window.onload = loadFiles; // 當窗口加載時自動加載文件

async function loadFiles() {
    codeDisplay.innerHTML = ''; // 清空之前的內容

    for (let i = 1; i <= MAX_TXT_FILES; i++) {
        const filePath = `files/${i}.txt`;
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('文件未找到');
            const content = await response.text();
            displayContent(content);
        } catch (error) {
            console.error(error);
        }
    }
}

function displayContent(content) {
    const lines = content.split('\n');
    let title = '';
    let codeLines = [];
    
    lines.forEach((line, index) => {
        if (line.startsWith('# Title')) {
            title = line.replace('# Title', '').trim();
        } else if (line.startsWith('# Code')) {
            // 開始收集代碼行
            codeLines = lines.slice(index + 1); // 收集後續行
            return;
        }
    });

    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';

    if (title) {
        const titleElement = document.createElement('h2');
        titleElement.innerText = title;
        codeBlock.appendChild(titleElement);
    }

    const codeWithLineNumbers = codeLines.map((line, idx) => `<span class="line-number">${idx + 1}</span>${line}`).join('<br>');

    codeBlock.innerHTML += codeWithLineNumbers;

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerText = '複製代碼';
    copyButton.onclick = () => copyToClipboard(codeLines.join('\n'));
    codeBlock.appendChild(copyButton);

    codeDisplay.appendChild(codeBlock);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('代碼已複製到剪貼板');
    }).catch(err => {
        console.error('複製失敗:', err);
    });
}
