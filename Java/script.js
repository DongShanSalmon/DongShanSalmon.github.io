async function loadFiles() {
    const container = document.getElementById('container');
    let index = 1;

    while (true) {
        const fileName = `file/${index}.txt`;
        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error('File not found');
            const text = await response.text();
            displayFileContent(text, container);
            index++;
        } catch (error) {
            console.log(`停止加載文件：${fileName}`); // 幫助排查
            break; // 停止加載當檔案不存在
        }
    }
}

function displayFileContent(text, container) {
    const lines = text.split('\n');
    let title = '';
    let code = '';
    let content = '';
    let isCodeSection = false;
    let isContentSection = false;

    lines.forEach(line => {
        if (line.startsWith('# Title')) {
            title = line.replace('# Title ', '').trim();
        } else if (line.startsWith('# Code')) {
            isCodeSection = true;
            isContentSection = false; // 代码部分开始，内容部分结束
        } else if (line.startsWith('# Content')) {
            isContentSection = true;
            isCodeSection = false; // 内容部分开始，代码部分结束
        } else if (isCodeSection) {
            code += line + '\n';
        } else if (isContentSection) {
            content += line + '\n';
        }
    });

    if (title) {
        const codeBlock = document.createElement('div');
        codeBlock.classList.add('code-block');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        codeBlock.appendChild(titleElement);

        if (content) {
            const contentElement = document.createElement('div');
            contentElement.classList.add('content');
            contentElement.textContent = content.trim();
            codeBlock.appendChild(contentElement);
        }

        if (code) {
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
        }

        container.appendChild(codeBlock);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('代碼已複製到剪貼板！');
    });
}

document.addEventListener('DOMContentLoaded', loadFiles);
