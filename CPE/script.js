// Maximum number of .txt files to check for
const MAX_TXT_FILES = 10; // Adjust this number to the expected max number of .txt files
const container = document.getElementById('codeblocks-container');

// Function to dynamically create codeblocks
function createCodeBlock(elementId) {
    const codeBlockDiv = document.createElement('div');
    codeBlockDiv.id = elementId;
    codeBlockDiv.className = 'highlight-container';
    codeBlockDiv.textContent = `Loading ${elementId}.txt...`;
    container.appendChild(codeBlockDiv);
}

// Function to fetch a .txt file and display it in a code block with line numbers
function loadTextFile(fileName, elementId) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            let lineNumbers = '';
            let codeContent = '';

            lines.forEach((line, index) => {
                lineNumbers += `<span class="line">${index + 1}</span><br>`;
                codeContent += `<span class="line">${line}</span><br>`;
            });

            const codeBlockHTML = `
                <figure class="highlight c++">
                    <div class="table-container">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="gutter">
                                        <pre>${lineNumbers}</pre>
                                    </td>
                                    <td class="code">
                                        <pre>${codeContent}</pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </figure>
                <div class="copy-btn">
                    <i class="fa fa-clipboard fa-fw" onclick="copyCode('${elementId}')"></i>
                </div>
            `;
            document.getElementById(elementId).innerHTML = codeBlockHTML;
        })
        .catch(error => {
            document.getElementById(elementId).textContent = `Error loading ${fileName}`;
            console.error('Error:', error);
        });
}

// Function to copy code content
function copyCode(elementId) {
    const codeText = document.querySelector(`#${elementId} .code pre`).textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        alert("Code copied to clipboard!");
    });
}

// Function to check and load .txt files sequentially from 1.txt to MAX_TXT_FILES
function loadAllTextFiles() {
    for (let i = 1; i <= MAX_TXT_FILES; i++) {
        const fileName = `${i}.txt`;
        const elementId = `codeblock${i}`;

        // Create a codeblock for each file
        createCodeBlock(elementId);

        // Attempt to load the file
        loadTextFile(fileName, elementId);
    }
}

// Start loading all .txt files
loadAllTextFiles();
