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

            // 檢查第一行是否為空
            let firstLineProcessed = false;

            lines.forEach((line, index) => {
                if (index === 0 && line.trim() === '') {
                    // 第一行是空行，直接跳過
                    return;
                }

                // 正常處理其他行
                lineNumbers += `<span class="line">${index + 1}</span><br>`;
                codeContent += `<span class="line">${line}</span><br>`;
                firstLineProcessed = true;
            });

            const codeBlockHTML = 
                `<figure class="highlight c++">
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
                </div>`;
                
            document.getElementById(elementId).innerHTML = codeBlockHTML;
        })
        .catch(error => {
            document.getElementById(elementId).textContent = `Error loading ${fileName}`;
            console.error('Error:', error);
        });
}
