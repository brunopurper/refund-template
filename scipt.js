// Selecionando input do valor da despesa

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// Seleciona os elementos da lista

const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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
  expenseAdd(newExpense)
}
// Adiciona novos elementos na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar na lista.

    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Cria o ícone da categoiria

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `/img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")


    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", `/img/remove.svg`)
    removeIcon.setAttribute("alt", "Remover")





    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    expenseList.append(expenseItem)

    expenseInfo.append(expenseName, expenseCategory)




    // Atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

// Atualizar os totais

function updateTotals() {
  try {
    const items = expenseList.children
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"} `

    let total = 0;
// Percorre cada li da lista ul
    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      value = parseFloat(value)


      if(isNaN(value)) {
        return alert("Não foi possível calcular o total, o valor não parece ser o número")
      }

      total += Number(value)
    }
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    expensesTotal.innerHTML = ""
    expensesTotal.append(symbolBRL, total)

  }catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

expenseList.addEventListener("click", function (event) {
  if(event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense")
    item.remove()
  }
  updateTotals()
})