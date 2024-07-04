
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
            li.innerHTML = `<p>Name - ${element.product_name}</p>
            <p>Description - ${element.product_description}</p>
            <p>Price - ${element.product_price}</p>
            <p>Store name - ${element.store_name}</p>
            <p>Store address - ${element.store_address}</p>`
            let addButton = document.createElement('button')
            addButton.innerText = 'ADD TO BAG'
            addButton.addEventListener('click', () => {
                fetch('http://localhost:5000/add-mybag', {
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(element)
                })
                .then((res) => res.json())
                .then((data) => console.log(data))

                fetch('http://localhost:5000/my-bag')
                .then((res) => res.json())
                .then((data) => {
                    if(Array.isArray(data)){
                        document.getElementById('bagGoods').innerText = data.length
                    }

                });
            })
            li.appendChild(addButton)
            document.getElementById('list').appendChild(li)
        });
    })
}

showList()

