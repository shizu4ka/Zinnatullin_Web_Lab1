/*
* math function
when x>=-r & x<=-r/2:
{
    r^2>=y^2+x^2 & y<=0 & x<=-r/2
}
when x>=-r/2 & x<=0:
{
    r^2>=y^2+x^2 & y<=0 & x<=0 & x>=-r/2
    x>=-r/2 & x<=0 & y>=0 & y<=r
}
when x>=0 & x<=r:
{
    y>=x-r & x>0 & y<0 & y>-r
}
*/
const tableBody = document.querySelector("#resultsTable tbody");

function IsPointInArea(x, y, r) {
    if (x >= -r && x <= -r / 2) {
        return r ** 2 >= y ** 2 + x ** 2 && y <= 0;
    } else if (x >= -r / 2 && x <= 0) {
        if (r ** 2 >= y ** 2 + x ** 2 && y <= 0) return true;
        else return y >= 0 && y <= r;
    } else if (x >= 0 && x <= -r) {
        return y >= x - r && y <= 0 && y >= -r;
    } else return false;
}

function draw() {
    const canvas = document.getElementById("areaCanvas");
    const ctx = canvas.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    //стрелки
    ctx.moveTo(width / 2, height / 20);
    ctx.lineTo(width / 2, height * 19 / 20);
    ctx.moveTo(width / 21, height / 2);
    ctx.lineTo(width * 20 / 21, height / 2);

    //черточки на y
    ctx.moveTo(width * 19 / 40, height * 5.5 / 8);
    ctx.lineTo(width * 21 / 40, height * 5.5 / 8);
    ctx.moveTo(width * 19 / 40, height * 7 / 8);
    ctx.lineTo(width * 21 / 40, height * 7 / 8);
    ctx.moveTo(width * 21 / 40, height * 2.5 / 8);
    ctx.lineTo(width * 19 / 40, height * 2.5 / 8);
    ctx.moveTo(width * 21 / 40, height / 8);
    ctx.lineTo(width * 19 / 40, height / 8);

    //черточки на x
    ctx.moveTo(width * 5.5 / 8, height * 19 / 40);
    ctx.lineTo(width * 5.5 / 8, height * 21 / 40);
    ctx.moveTo(width * 7 / 8, height * 19 / 40);
    ctx.lineTo(width * 7 / 8, height * 21 / 40);
    ctx.moveTo(width * 2.5 / 8, height * 21 / 40);
    ctx.lineTo(width * 2.5 / 8, height * 19 / 40);
    ctx.moveTo(width / 8, height * 21 / 40);
    ctx.lineTo(width / 8, height * 19 / 40);

    //прорисовка
    ctx.strokeStyle = "black";
    ctx.stroke();

    //2 четверть
    ctx.fillStyle = "rgba(1, 137, 240 , 0.8)";
    ctx.fillRect(width * 2.5 / 8, height / 8, width * 1.5 / 8, height * 3 / 8);

    //3 четверть
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(width/2,height/2,width*3/8, Math.PI/2,Math.PI, false);
    ctx.fill()
    ctx.closePath();

    //4 четверть
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width*7/8, height / 2);
    ctx.lineTo(width/2, height*7/8);
    ctx.fill()
    ctx.closePath();
    }
draw();

//рисуем точку
function drawPoint(x, y, r) {
    const canvas = document.getElementById("areaCanvasPoints");
    const ctx = canvas.getContext("2d");
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.arc(width/2+x/r*width*3/8, height/2-y/r*height*3/8, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.closePath();
}

//обработка формы
let x = null;
document.getElementById('X').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        x = event.target.textContent;
    }
})
const form = document.querySelector("#formForPoint");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const y = document.getElementById('Y').value.trim();
    //проверка валидации
    const errorSpanY = document.getElementById('YError')
    const errorSpanX = document.getElementById('XError')
    errorSpanX.textContent = " ";
    errorSpanY.textContent = " ";
    if (x === null) {
        event.preventDefault();
        errorSpanX.textContent = 'Please select X';
        return;
    }
    if (!y) {
        event.preventDefault();
        errorSpanY.textContent = 'Please enter a valid number';
        return;
    }
    const num = Number(y.replace(',', '.'))
    if (isNaN(num) || num < -5 || num > 5) {
        event.preventDefault();
        errorSpanY.textContent = 'Please enter a valid number';
        return;
    }

    const r = document.querySelector('input[name="OptionR"]:checked').value;
    const result = IsPointInArea(x, y, r);
    drawPoint(x, y, r);
    const time = Date.now();
    const newPoint = {x: x, y: y, r: r, result: result, time: time};
    addPointToTable(newPoint);
    const savedPoints = JSON.parse(localStorage.getItem("points")) || [];
    savedPoints.push(newPoint);
    localStorage.setItem("points", JSON.stringify(savedPoints));
});

function addPointToTable(point) {
    const dateObject = new Date(point.time);
    const fDate = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(dateObject);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${point.x}</td>
        <td>${point.y}</td>
        <td>${point.r}</td>
        <td>${point.result}</td>
        <td>${fDate}</td>`;
    tableBody.appendChild(row);
}

function loadPoints() {
    const savedPoints = JSON.parse(localStorage.getItem("points")) || [];
    savedPoints.forEach(addPointToTable);
}

loadPoints();

document.getElementById('reset').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    tableBody.innerHTML = "";
})