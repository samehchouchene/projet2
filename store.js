if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
function ready(){
var removecartitembotton = document.getElementsByClassName('btn-danger')
console.log(removecartitembotton)
for(var i=0 ; i< removecartitembotton.length ;i++){
    var button = removecartitembotton[i]
    button.addEventListener('click', removeCartItem)
        
    }

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i=0; i< quantityInputs.length ; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0 ; i < addToCartButtons.length ; i++) {
    var button = addToCartButtons[i]
    
    button.addEventListener('click', addToCartClicked)
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}





function removeCartItem(event){

    var buttonclicked =event.target
    buttonclicked.parentElement.parentElement.remove()
    updatcarttotal()


}

function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value)|| input.value <=0 ){
        input.value =1
    }
    updatcarttotal()
}
function purchaseClicked() {
    alert('Thank you for your purchase!')
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    while(cartItemContainer.hasChildNodes()) {
        cartItemContainer.removeChild(cartItemContainer.firstChild)
    }
    updatcarttotal()
}




function addToCartClicked(event) {
    var button=event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
   
   
    addItemToCart(title,price,imagesrc)
    updatcarttotal()
}

function addItemToCart(title,price,imagesrc) {
    var cartRow = document.createElement('div')

    cartRow.classList.add('cart-row')
    
    

    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart')
            return
        }
    }

    
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>
    `
    cartRow.innerHTML =cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
    
}


function updatcarttotal(){
    
        var cartRows = document.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            if (priceElement == null || quantityElement == null) continue
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = parseInt(quantityElement.value)
            total += price * quantity
        }
    
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + Math.round(total * 100) / 100
    
}










