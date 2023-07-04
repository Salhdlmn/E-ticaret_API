// diğer dosylardan gelenler
import { printCategories, printProducts, printBasketItem } from "./UI.js"

// HTML'in yüklenme anını izleme
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProducts();
  });
const baseUrl= 'https://api.escuelajs.co/api/v1'

/*
* kategori bilgilerini çek
* 1- API'ye istek at
* 2- Gelen veriyi işle
* 3- Gelen verileri ekrana basıcak fonksiyonu çalıştır.
*/

function fetchCategories(){
    fetch(`${baseUrl}/categories`)
    // veri gelirse çalışır
    .then((response)=>response.json())
    // veri json formatına dönünce çalışır
    .then((data)=>printCategories(data))     
    // Hata olursa çalışır
    .catch((error)=>console.log(error))
}
let globalData=[]

async function fetchProducts() {
    try {
      // veri çekme isteği at
      const res = await fetch(`${baseUrl}/products`);
      // gelen veriyi işle
      const data = await res.json();
      // veriyi bütün dosay tarafında erişilebilir yapma
      printProducts(data)
      globalData = data
    } catch (err) {
      //TODO eğer hata olusa hatayı yönet
      console.log(err);
    }
  }


  let basket=[]
  let total=0

  const closeBtn = document.querySelector('.icon')
  const basketBtn = document.querySelector('.basket')
  const modal = document.querySelector('.modal-wrapper')
  const basketList=document.querySelector('.list')
  const modalInfo = document.querySelector('.total-span')

  

  basketBtn.addEventListener('click',()=>{
    modal.classList.add('active');

    addList()
  })
  closeBtn.addEventListener('click',()=>{
    modal.classList.remove('active')
    basketList.innerHTML=''
    modalInfo.textContent='0'
    total=0;
  })
  document.addEventListener('click',(e)=>{
    var clicked = e.target;
    if(clicked.classList.contains('active')){
      modal.classList.remove('active') 
      basketList.innerHTML=''
      total=0;
      modalInfo.textContent='0'
    }
  })



  document.body.addEventListener('click',findItem)

  function findItem(e){
    if(e.target.id==='add-btn'){
      const selected = globalData.find((product)=>product.id==e.target.dataset.id)
      if(!selected.amount){
        selected.amount=1
      }
      
    addToBasket(selected)
    }

    if(e.target.id=='del-button'){
      e.target.parentElement.remove()
      const selected = globalData.find((product)=>product.id==e.target.dataset.id)

      deleteItem(selected)
    }
  }

  function addToBasket(product){

    const foundItem= basket.find((item)=>item.id==product.id)

    if(foundItem){
      foundItem.amount++;
    }else{
      basket.push(product)
    }
  }

  function addList(){
  basket.forEach((product)=>{
    
    printBasketItem(product)

    total += product.price * product.amount;   
  })
  modalInfo.textContent=total
  }

  function deleteItem(product){
    const delItem=basket.filter((item)=>item.id!==product.id)
    basket=delItem
    total -= product.price * product.amount;  
    modalInfo.textContent=total    
  }