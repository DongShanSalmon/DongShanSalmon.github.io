function showMessage() {
    alert('歡迎來到我的網站！');
}

function toggleSidebar(show) {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.left = show ? "0px" : "-250px"; // 顯示或隱藏
}

function closeSidebar() {
    toggleSidebar(false); // 關閉側邊菜單
}

window.onload = function() {
    const hoverArea = document.querySelector('.hover-area');
    const sidebar = document.getElementById("mySidebar");

    hoverArea.addEventListener('mouseenter', function() {
        toggleSidebar(true);
    });

    sidebar.addEventListener('mouseleave', function() {
        toggleSidebar(false);
    });

    // 為關閉按鈕添加事件
    const closeButton = document.getElementById('closeButton'); // 獲取關閉按鈕
    closeButton.addEventListener('click', function(event) {
        event.preventDefault(); // 防止按鈕的默認行為
        closeSidebar(); // 關閉側邊菜單
    });
};
