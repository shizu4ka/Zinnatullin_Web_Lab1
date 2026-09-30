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
    if (isNaN(y) || num < -5 || num > 5) {
        event.preventDefault();
        errorSpanY.textContent = 'Please enter a valid number';
        return;
    }

    const r = document.querySelector('input[name="OptionR"]:checked').value;
    const result = IsPointInArea(x, y, r);
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