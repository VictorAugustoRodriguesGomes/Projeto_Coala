// Método da hora
function atualizarHoras() {
    var horasAtual = new Date();
    var horas = String(horasAtual.getHours()).length == 1 ? String("0" + horasAtual.getHours()) : String(horasAtual.getHours());
    var minutos = String(horasAtual.getMinutes()).length == 1 ? String("0" + horasAtual.getMinutes()) : String(horasAtual.getMinutes());
    var segundos = String(horasAtual.getSeconds()).length == 1 ? String("0" + horasAtual.getSeconds()) : String(horasAtual.getSeconds());

    var dia = String(horasAtual.getDate()).length == 1 ? String("0" + horasAtual.getDate()) : String(horasAtual.getDate());
    var ano = String(horasAtual.getFullYear());

    var mesAtual = horasAtual.getMonth();
    var mes = new Array(12);
    mes[0] = 'Janeiro';
    mes[1] = 'Fevereiro';
    mes[2] = 'Março';
    mes[3] = 'Abril';
    mes[4] = 'Maio';
    mes[5] = 'Junho';
    mes[6] = 'Julho';
    mes[7] = 'Agosto';
    mes[8] = 'Setembro';
    mes[9] = 'Outubro';
    mes[10] = 'Novembro';
    mes[11] = 'Dezembro';
    mesAtual = (mes[mesAtual]);

    var diaSemana = horasAtual.getDay();
    var semana = new Array(6);
    semana[0] = 'Domingo';
    semana[1] = 'Segunda-Feira';
    semana[2] = 'Terça-Feira';
    semana[3] = 'Quarta-Feira';
    semana[4] = 'Quinta-Feira';
    semana[5] = 'Sexta-Feira';
    semana[6] = 'Sábado';
    diaSemana = (semana[diaSemana]);

    document.getElementById('h').textContent = horas;
    document.getElementById('m').textContent = minutos;
    document.getElementById('s').textContent = segundos;

    document.getElementById('divData').textContent = diaSemana + ", " + dia + " de " + mesAtual + " de " + ano;
}

// Método do Calendário

let calendario = document.querySelector('.calendario')

const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro ', 'Dezembro']

bissexto = (ano) => {
    return (ano % 4 === 0 && ano % 100 !== 0 && ano % 400 !== 0) || (ano % 100 === 0 && ano % 400 === 0)
}

diasFevereiro = (ano) => {
    return bissexto(ano) ? 29 : 28
}

gerar = (mes, ano) => {
    let diasCalendario = calendario.querySelector('.diasCalendario')
    let cabecalhoCalendario = calendario.querySelector('#ano')
    let diasMes = [31, diasFevereiro(ano), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    diasCalendario.innerHTML = ''

    let data = new Date()
    if (!ano) ano = data.getFullYear()

    let m = `${nomesMeses[mes]}`
    mesSelecionado.innerHTML = m
    cabecalhoCalendario.innerHTML = ano

    let primeiro = new Date(ano, mes, 1)

    for (let i = 0; i <= diasMes[mes] + primeiro.getDay() - 1; i++) {
        let dia = document.createElement('div')
        if (i >= primeiro.getDay()) {
            dia.classList.add('calendar-day-hover')
            dia.innerHTML = i - primeiro.getDay() + 1
            dia.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - primeiro.getDay() + 1 === data.getDate() && ano === data.getFullYear() && mes === data.getMonth()) {
                dia.classList.add('curr-date')
            }
        }
        diasCalendario.appendChild(dia)
    }
}

let listaMes = calendario.querySelector('.listaMes')

nomesMeses.forEach((e, index) => {
    let mes = document.createElement('div')
    mes.innerHTML = `<div data-month="${index}">${e}</div>`
    mes.querySelector('div').onclick = () => {
        listaMes.classList.remove('show')
        m.value = index
        gerar(index, cy.value)
    }
    listaMes.appendChild(mes)
})

let mesSelecionado = calendario.querySelector('#mesSelecionado')

mesSelecionado.onclick = () => {
    listaMes.classList.add('show')
}

let data = new Date()

let m = { value: data.getMonth() }
let cy = { value: data.getFullYear() }

gerar(m.value, cy.value)

document.querySelector('#anoAnterior').onclick = () => {
    --cy.value
    gerar(m.value, cy.value)
}

document.querySelector('#proximoAno').onclick = () => {
    ++cy.value
    gerar(m.value, cy.value)
}

window.addEventListener('load', atualizarHoras);
setInterval(atualizarHoras, 1000);