let goodsId
let ChangeElement

fetch('http://localhost:5000/my-bag')
.then((res) => res.json())
.then((data) => {
    localStorage.setItem('goods', JSON.stringify(data))
});

document.getElementById('bagGoods').innerText = JSON.parse(localStorage.getItem('goods')).length

function showList(){
    fetch('http://localhost:5000/goods')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = `<p id="product_name">NAME - ${element.product_name}</p>
            <p id="product_description">DESCRIPTION - ${element.product_description}</p>
            <p id="product_price">PRICE - ${element.product_price}</p>
            <p id="store_name">STORE NAME - ${element.store_name}</p>
            <p id="store_address">STORE ADDRESS - ${element.store_address}</p>`
            let changeButton = document.createElement('button')
            changeButton.innerText = 'CHANGE'
            changeButton.addEventListener('click', (ev) => {
                getId(element.id)
                document.getElementById('NameOfPoductChange').value = element.product_name,
                document.getElementById('DescriptionOfProductChange').value = element.product_description,
                document.getElementById('PriceOfProductChange').value = element.product_price,
                document.getElementById('storeNameChange').value = element.store_name,
                document.getElementById('storeAddressChange').value = element.store_address
                ChangeElement = ev.target.parentElement
            })

            let delButton = document.createElement('button')
            delButton.innerText = 'DELETE'
            delButton.addEventListener('click', (ev) => {
                fetch(`http://localhost:5000/delete-admin/${element.id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                ev.target.parentElement.remove()
            })
            li.appendChild(delButton)
            li.appendChild(changeButton)
            document.getElementById('list').appendChild(li)
        });
    })
}

showList() 

function getId(id){
    goodsId = id
    document.getElementById('changeContainer').style = 'display:flex';
}

document.getElementById('addForm').addEventListener('submit', (ev) => {
    ev.preventDefault()
    let obj =  {
        product_name: document.getElementById('productName').value,
        product_description: document.getElementById('productDescription').value,
        product_price: document.getElementById('productPrice').value,
        store_name: document.getElementById('storeName').value,
        store_address: document.getElementById('storeAddress').value,
    }
    fetch('http://localhost:5000/add-admin', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => {
        obj = {...obj, id: data.id}
        console.log(data)

        let li = document.createElement('li')
        li.innerHTML = `<p id="product_name">Name - ${obj.product_name}</p>
        <p id="product_description">Description - ${obj.product_description}</p>
        <p id="product_price">Price- ${obj.product_price}</p>
        <p id="store_name">Store name - ${obj.store_name}</p>
        <p id="store_address">Store address - ${obj.store_address}</p>`
        let changeButton = document.createElement('button')
        changeButton.innerText = 'CHANGE'
        changeButton.addEventListener('click', (ev) => {
            getId(obj.id)
            document.getElementById('NameOfPoductChange').value = obj.product_name,
            document.getElementById('DescriptionOfProductChange').value = obj.product_description,
            document.getElementById('PriceOfProductChange').value = obj.product_price,
            document.getElementById('storeNameChange').value = obj.store_name,
            document.getElementById('storeAddressChange').value = obj.store_address
            ChangeElement = ev.target.parentElement
        })

        let delButton = document.createElement('button')
        delButton.innerText = 'DELETE'
        delButton.addEventListener('click', (ev) => {
            fetch(`http://localhost:5000/delete-admin/${obj.id}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            ev.target.parentElement.remove()
        })
        li.appendChild(delButton)
        li.appendChild(changeButton)
        document.getElementById('list').appendChild(li)
    })
})

document.getElementById('changeForm').addEventListener('submit', (ev) => {
    ev.preventDefault()
    let obj =  {
        product_name: document.getElementById('NameOfPoductChange').value,
        product_description: document.getElementById('DescriptionOfProductChange').value,
        product_price: document.getElementById('PriceOfProductChange').value,
        store_name: document.getElementById('storeNameChange').value,
        store_address: document.getElementById('storeAddressChange').value,
    }
    ChangeElement.querySelector('#product_name').innerText = "Name - " + obj.product_name,
    ChangeElement.querySelector('#product_description').innerText = "Description - " + obj.product_description,
    ChangeElement.querySelector('#product_price').innerText = "Price - " + obj.product_price,
    ChangeElement.querySelector('#store_name').innerText = "Store name - " + obj.store_name,
    ChangeElement.querySelector('#store_address').innerText = "Store address - " + obj.store_address,

    fetch(`http://localhost:5000/change-admin/${goodsId}`, {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    document.getElementById('changeContainer').style = 'display:none';
})