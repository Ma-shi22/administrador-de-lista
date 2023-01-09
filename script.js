const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sGroup = document.querySelector('#m-group')
const sYear = document.querySelector('#m-year')
const btnGuardar = document.querySelector('#btnGuardar')

//cargar itens del formulario y id p/ hacer ación de edición
let itens
let id
// abrir modal
    function openModal(edit = false, index = 0) {
    modal.classList.add('active')

// cada click fuera renove el modal  display=none y no visible en tela
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        }
    }

    if (edit) {
        sName.value = itens[index].name
        sGroup.value = itens[index].group
        sYear.value = itens[index].year
        id = index
    } else {
        sName.value = ''
        sGroup.value = ''
        sYear.value = ''
    }
    
    }
//editar item
    function editItem(index) {

    openModal(true, index)
    }
//delete item
    function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
    }
//insertar item criar elemento
    function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.group}</td>
        <td>${item.year}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
    }
//boton guardar
    btnGuardar.onclick = e => {
    
    if (sName.value == '' || sGroup.value == '' || sYear.value == '') {
        return
    }

    e.preventDefault();


    if (id !== undefined) {
        itens[id].name = sName.value
        itens[id].group = sGroup.value
        itens[id].year = sYear.value
    } else {
        itens.push({'name': sName.value, 'group': sGroup.value, 'year': sYear.value})
    }

    setItensBD()
//remover itensBD
    modal.classList.remove('active')
    loadItens()
    id = undefined
    }
//mostrar al cargar pagina itensBD
    function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

    }
//funcion para llamar BD , caso no tenga nada llamar array vacio
    const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
//    
    const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

    loadItens()