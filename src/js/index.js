function updateHours() {
    var currentHours = new Date();
    var hours = String(currentHours.getHours()).length == 1 ? String("0" + currentHours.getHours()) : String(currentHours.getHours());
    var minutes = String(currentHours.getMinutes()).length == 1 ? String("0" + currentHours.getMinutes()) : String(currentHours.getMinutes());
    var seconds = String(currentHours.getSeconds()).length == 1 ? String("0" + currentHours.getSeconds()) : String(currentHours.getSeconds());

    var day = String(currentHours.getDate()).length == 1 ? String("0" + currentHours.getDate()) : String(currentHours.getDate());
    var year = String(currentHours.getFullYear());

    var currentMonth = currentHours.getMonth();
    var month = new Array(12);
    month[0] = 'Janeiro';
    month[1] = 'Fevereiro';
    month[2] = 'Março';
    month[3] = 'Abril';
    month[4] = 'Maio';
    month[5] = 'Junho';
    month[6] = 'Julho';
    month[7] = 'Agosto';
    month[8] = 'Setembro';
    month[9] = 'Outubro';
    month[10] = 'Novembro';
    month[11] = 'Dezembro';
    currentMonth = (month[currentMonth]);

    var dayWeek = currentHours.getDay();
    var week = new Array(6);
    week[0] = 'Domingo';
    week[1] = 'Segunda-Feira';
    week[2] = 'Terça-Feira';
    week[3] = 'Quarta-Feira';
    week[4] = 'Quinta-Feira';
    week[5] = 'Sexta-Feira';
    week[6] = 'Sábado';
    dayWeek = (week[dayWeek]);

    document.getElementById('h').textContent = hours;
    document.getElementById('m').textContent = minutes;
    document.getElementById('s').textContent = seconds;

    document.getElementById('divDate').textContent = dayWeek + ", " + day + " de " + currentMonth + " de " + year;
}

let calendar = document.querySelector('.calendar')

const nomonthmonthes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro ', 'Dezembro']

leap = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

daysFebruary = (year) => {
    return leap(year) ? 29 : 28
}

generate = (month, year) => {
    let calendarDays = calendar.querySelector('.calendarDays')
    let cabecalhocalendar = calendar.querySelector('#year')
    let daysmonth = [31, daysFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    calendarDays.innerHTML = ''

    let data = new Date()
    if (!year) year = data.getFullYear()

    let m = `${nomonthmonthes[month]}`
    selectedMonth.innerHTML = m
    cabecalhocalendar.innerHTML = year

    let first = new Date(year, month, 1)

    for (let i = 0; i <= daysmonth[month] + first.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first.getDay() + 1 === data.getDate() && year === data.getFullYear() && month === data.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendarDays.appendChild(day)

    }
}

let monthList = calendar.querySelector('.monthList')

nomonthmonthes.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        monthList.classList.remove('show')
        m.value = index
        generate(index, cy.value)
    }
    monthList.appendChild(month)
})

let selectedMonth = calendar.querySelector('#selectedMonth')

selectedMonth.onclick = () => {
    monthList.classList.add('show')
}

let data = new Date()

let m = {
    value: data.getMonth()
}
let cy = {
    value: data.getFullYear()
}

generate(m.value, cy.value)

document.querySelector('#lastYear').onclick = () => {
    --cy.value
    generate(m.value, cy.value)
}

document.querySelector('#nextYear').onclick = () => {
    ++cy.value
    generate(m.value, cy.value)
}

window.addEventListener('load', updateHours);
setInterval(updateHours, 1000);