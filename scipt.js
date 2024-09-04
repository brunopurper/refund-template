// Selecionando input do valor da despesa

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Capturando o evento de input para formatar o valor.
amount.oninput = () => {
  // obtém o valor atual do input e remove os caractéres não númericos.
  let value = amount.value.replace(/\D/g, "")

  // Transformar o valor em centavos

  value = Number(value) / 100

// Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR" , {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado.
  return value
}

form.onsubmit = (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  console.log(newExpense)
}