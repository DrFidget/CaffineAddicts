if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready(){
    updateCartTotal()
    var removeCartItemButtons=document.getElementsByClassName('btn-danger');
    console.log(removeCartItemButtons);
    for(var i=0;i<removeCartItemButtons.length;i++)
    {
        var button=removeCartItemButtons[i];
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-primary')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    

}


function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title=shopItem.getElementsByClassName('card-title')[0].innerText;
    var price=shopItem.getElementsByClassName('price-item')[0].innerText.replace('$','')
    var imageSrc=shopItem.getElementsByClassName('card-img-top')[0].src
    // console.log(title,price,imgSrc)
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row');
    cartRow.classList.add('cart');
    cartRow.classList.add('bg-dark');

    var cartitems=document.getElementsByClassName('cart-items')[0];
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('card-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    cartRowContent=`
    <div class="card cart-row" style="width: 18rem;">
    <img src="${imageSrc}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
        <p class="price">$${price}</p>
        <input type="number" class="quantity-input" value="1">
        <button class="btn btn-danger">Remove</button>
    </div>
    </div>`
    cartRow.innerHTML=cartRowContent
    cartitems.append(cartRow);

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem (event){
    console.log("clicked");
    var buttonclicked=event.target;
    buttonclicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal(){
    var cartContainer=document.getElementsByClassName('cart-items')[0];
    var cartRows=cartContainer.getElementsByClassName('cart-row');
    var totalPrice=0;
    for(var i=0;i<cartRows.length;i++){
        var cartrow=cartRows[i];
        var priceElement=cartrow.getElementsByClassName('price')[0];
        var quantityElement=cartrow.getElementsByClassName('quantity-input')[0];
        
        var price=parseFloat(priceElement.innerText.replace('$','')) 
        var quantity=quantityElement.value
        totalPrice+=(price*quantity);
    }

    document.getElementsByClassName('totalPrice')[0].innerText='$'+totalPrice;

}