body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

header {
    text-align: center;
}

.chess-board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 320px;
    height: 320px;
    margin: 20px auto;
}

.square {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
}

.square.light {
    background-color: #eee;
}

.square.dark {
    background-color: #333;
    color: #fff;
}

.instructions {
    margin: 20px auto;
    max-width: 600px;
}

footer {
    text-align: center;
    margin-top: 20px;
}
