function showList(){
    fetch('http://localhost:5000/my-bag')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('goods', JSON.stringify(data))
        data.forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = `<p>Name - ${element.product_name}</p>
            <p>Description - ${element.product_description}</p>
            <p>Price - ${element.product_price}</p>
            <p>Store name- ${element.store_name}</p>
            <p>Store address - ${element.store_address}</p>`
            let delButton = document.createElement('button')
            delButton.innerText = 'DELETE'
            delButton.addEventListener('click', (ev) => {
                fetch(`http://localhost:5000/delete-mybag/${element.id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                ev.target.parentElement.remove()
            })
            li.appendChild(delButton)
            document.getElementById('list').appendChild(li)
        });
    })
}

showList()

document.getElementById('bagGoods').innerText = JSON.parse(localStorage.getItem('goods')).length

document.getElementById('cleanBag').addEventListener('click', () => {
    fetch(`http://localhost:5000/clean-mybag`, {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('list').innerText = ""
        showList()
        console.log(data)
    })
})


document.getElementById('orderForm').addEventListener('submit', (ev) => {
    ev.preventDefault()
    let obj =  {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhoneNumber: document.getElementById('customerPhoneNumber').value,
        customerOrder: [...JSON.parse(localStorage.getItem('goods'))]
    }

    fetch('http://localhost:5000/add-orders', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        document.getElementById('list').innerText = ""
        showList()
    })
})