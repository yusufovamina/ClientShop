fetch('http://localhost:5000/my-bag')
.then((res) => res.json())
.then((data) => {
    localStorage.setItem('goods', JSON.stringify(data))
});

function showList(){
    
    fetch('http://localhost:5000/orders')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = `<p>Name - ${element.customerName}</p>
            <p>Email - ${element.customerEmail}</p>
            <p>Phone number - ${element.customerPhoneNumber}</p>`
            let note = document.createElement('p')
            note.innerText = 'BAG IS EMPTY'
            if (element.customerOrder.length !== 0){

                let goodsList = document.createElement('ul')
                element.customerOrder.forEach((item) => {
                    let goodsItem = document.createElement('li')
                    goodsItem.innerHTML = `<p>Name - ${item.product_name}</p>
                    <p>Description - ${item.product_description}</p>
                    <p>Price - ${item.product_price}</p>
                    <p>Store name - ${item.store_name}</p>
                    <p>Store adress- ${item.store_address}</p>`
                    goodsList.appendChild(goodsItem)
                })
                li.appendChild(goodsList)
            }
            else{
                li.appendChild(note)
            }
            document.getElementById('orderList').appendChild(li)
        });
    })
}

showList()

document.getElementById('bagGoods').innerText = JSON.parse(localStorage.getItem('goods')).length