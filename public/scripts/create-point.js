function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }

    })
}

populateUF()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        citySelect.innerHTML ="<option value>Selecione a cidade</option>"

        for( const city of cities) {
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    // Itens de coleta 
    // pegar todos os li's

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for(const item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

    
    const collectedItems =   document.querySelector("input[name=items]")
    let selectedItems = []

    function handleSelectedItem(event) {
        const itemLi = event.target
    
        // adicionar ou remover uma classe com javascript
        itemLi.classList.toggle("selected")

        const itemId = event.target.dataset.id

        
        // Verificar se existe itens selecionados, se sim
        // pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex( item => {
            return item == itemId
        })
    

        

        // Se ja tiver selecionado
        if(alreadySelected != -1) {
            // tirar da seleção
            const filteredItems = selectedItems.filter( item => {
                return item != itemId
            })

            selectedItems = filteredItems
        }  else {
            // Se não estiver selecionado,
            // adicionar a seleção
            selectedItems.push(itemId)
        }


        // atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectedItems
    }

