document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // 防止表單的默認提交行為

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('請選擇一個檔案');
        return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
        const content = btoa(reader.result); // 將檔案內容轉為 base64

        // 假設你有一個伺服器 API 用於觸發 GitHub Actions
        const url = 'YOUR_SERVER_URL/upload'; // 替換為你的伺服器 API

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name, // 傳送檔案名稱
                    content: content,
                }),
            });

            if (response.ok) {
                document.getElementById('message').textContent = '檔案上傳成功！';
            } else {
                const errorData = await response.json();
                document.getElementById('message').textContent = `上傳失敗：${errorData.message}`;
            }
        } catch (error) {
            document.getElementById('message').textContent = `發生錯誤：${error.message}`;
        }
    };

    reader.readAsBinaryString(file); // 讀取檔案
});
