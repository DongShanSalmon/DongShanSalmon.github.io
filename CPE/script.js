async function loadFiles() {
    const container = document.getElementById('container');
    let index = 1;

    while (true) {
        const fileName = `${index}.txt`;
        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error('File not found');
            const text = await response.text();
            displayFileContent(text, container);
            index++;
        } catch (error) {
            break; // 停止加載當檔案不存在
        }
    }
}

function displayFileContent(text, container) {
    const lines = text.split('\n');
    let title = '';
    let code = '';
    let isCodeSection = false;

    lines.forEach(line => {
        if (line.startsWith('# Title')) {
            title = line.replace('# Title ', '').trim();
        } else if (line.startsWith('# Code')) {
            isCodeSection = true;
        } else if (isCodeSection) {
            code += line + '\n';
        }
    });

    const codeBlock = document.createElement('div');
    codeBlock.classList.add('code-block');

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    codeBlock.appendChild(titleElement);

    const codeElement = document.createElement('pre');
    codeElement.classList.add('code');
    code.split('\n').forEach(line => {
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');
        lineElement.textContent = line;
        codeElement.appendChild(lineElement);
    });
    codeBlock.appendChild(codeElement);

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.textContent = '複製';
    copyButton.onclick = () => copyToClipboard(code);
    codeBlock.appendChild(copyButton);

    container.appendChild(codeBlock);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('代碼已複製到剪貼板！');
    });
}

document.addEventListener('DOMContentLoaded', loadFiles);
