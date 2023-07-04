// Arayüz işlemlerinin gerçekleştirileceği yer


const categoryList = document.querySelector('.categories')
const basketList = document.querySelector('.list');

export function printCategories(categories){
    categories.slice(0,5).forEach((category)=>{
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('category')
        categoryDiv.innerHTML =`
        <img src="${category.image}" alt="">
        <span>${category.name}</span>
       `
       categoryList.appendChild(categoryDiv)
    })
}

const productList = document.querySelector(".products")

export function printProducts(products){
    products.slice(0,40).forEach((product)=>{
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML=`
        <img src=${product.images[0]} alt="">
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class"product-info">
            <p>${product.price}$</p>
            <button id="add-btn" data-id="${product.id}">Sepete Ekle</button>
        </div>
        `
        productList.appendChild(productDiv)
    })
}

export function printBasketItem(product){
    const basketItem = document.createElement('div');

    basketItem.classList.add('list-item');
  
    basketItem.innerHTML = `
     <img src=${product.images[0]} />
     <h2>${product.title}</h2>
     <h2>${product.price}</h2>
     <p>Miktar: ${product.amount}</p>
     <button id="del-button" data-id=${product.id}>Sil</button>
    `;
  
    basketList.appendChild(basketItem);


}

