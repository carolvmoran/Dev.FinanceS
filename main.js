const Modal = {
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modalOverlay')
            .classList
            .add('active')
    },
    close() {
        // Fechar modal
        // Remover a class active ao modal
        document
            .querySelector('.modalOverlay')
            .classList
            .remove('active')
    }
}
const transations = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021'
    },
]
const Transations = {
    incomes() {
        //Somar as entradas
        let income = 0
        transations.forEach(transation => {
            if(transation.amount > 0) {
                income += transation.amount
            }
        })
        return income
    },
    expenses() {
        //Somar as saídas
        let expense = 0
        transations.forEach(transation => {
            if(transation.amount < 0) {
                expense += transation.amount
            }
        })
        return expense
    },
    total() {
        //Entradas - saídas
        return Transations.incomes() + Transations.expenses()        
    }
}
const DOM = {
    transationsContainer: document.querySelector('#dataTable tbody'),

    addTransations(transation, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransations(transation)

        DOM.transationsContainer.appendChild(tr)
    },

    innerHTMLTransations(transation) {
        const CSSclass = transation.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transation.amount)
        const html = `
        <td class="description">${transation.description}</td>
        <td class=${CSSclass}>${amount}</td>
        <td class="date">${transation.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover Transação">
        </td>
        `
        return html
    },
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transations.incomes())    
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transations.expenses()) 
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transations.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

transations.forEach(function(transation) {
    DOM.addTransations(transation)
})

DOM.updateBalance()