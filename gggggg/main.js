let products = [
    {id: 1, title: 'Product1', description: 'Descriprtion1', price: 100},
    {id: 2, title: 'Product2', description: 'Descriprtion2', price: 200},
    {id: 3, title: 'Product3', description: 'Descriprtion3', price: 300},
    {id: 4, title: 'Product4', description: 'Descriprtion4', price: 400},
    {id: 5, title: 'Product5', description: 'Descriprtion5', price: 500},
    {id: 6, title: 'Product6', description: 'Descriprtion6', price: 600},
    {id: 7, title: 'Product7', description: 'Descriprtion7', price: 700},
    {id: 8, title: 'Product8', description: 'Descriprtion8', price: 800},
    {id: 9, title: 'Product9', description: 'Descriprtion9', price: 900},
    {id: 10, title: 'Product10', description: 'Descriprtion10', price: 1000},
]

let users = [
    {id:1, login: 'user1', password: '123', email: 'user1@email.ru'},
    {id:2, login: 'user2', password: '123', email: 'user2@email.ru'},
    {id:3, login: 'user3', password: '123', email: 'user3@email.ru'},
]

// let user = [
//     {
//         id: 1,
//         login: 'user1',
//         password: 'qwerty',
//         email: 'dupik@list.ru'
//     }
// ]

let carts = [
    {
    id:1, 
    user_id: 1, 
    product: {id: 10, title: 'Product10', description: 'Descriprtion10', price: 1000}, 
    total_price: 300
    },
    
]

isAuth = true;
user_id = 1;

let wrap = document.querySelector('.wrap');
document.addEventListener('DOMContentLoaded', () => {});

let header = document.createElement('header');
document.body.prepend(header);

let menu = document.createElement('ul');
menu.classList.add('menu');

header.prepend(menu)

let li_login = document.createElement('li'),
    li_register = document.createElement('li'),
    li_cart = document.createElement('li'),
    li_home = document.createElement('li'),
    li_logout = document.createElement('li')

function checkAuth () {
    if (isAuth) {
        li_home.remove();
        li_register.remove();
        li_login.remove();
        menu.append(li_home);
        menu.append(li_cart);
        menu.append(li_logout);
    } else {
        li_home.remove()
        li_cart.remove()
        li_logout.remove()
        menu.append(li_home);
        menu.append(li_register);
        menu.append(li_login);
    }
}

checkAuth();

function logout(event){
    event.preventDefault();
    isAuth = false;
    user_id = 0;
    checkAuth();
}



li_home.innerHTML = `<a href='/home' class='menu_item' onClick='showHome(event)'>home</a>`
li_register.innerHTML = `<a href='/reg' class='menu_item' onClick='showRegister(event)'>register</a>`
li_login.innerHTML = `<a href='/login' class='menu_item'>login</a>`
li_logout.innerHTML = `<a href='/logout' class='menu_item' onclick='logout(event)'>logout</a>`
li_cart.innerHTML = `<a href='/cart' class='menu_item' onClick='showCart(event)'>cart</a>`


function showHome(event) {
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row)

    let productsShow = products.map(product => {
        return(
            row.insertAdjacentHTML('beforeend', 
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} руб.</p>
                <button class='btn'>Add to cart</button>
            </div>`
            )
        );
});

let btns = row.querySelectorAll('.btn');
for (let i = 0; i < btns.length; i++){
    let btn = btns[i];
    btn.addEventListener('click', () => {
        if (user_id){
            let cart = {
                id: carts.length + 1,
                user_id: user_id,
                product: products[i],
                total_price: products[i].price
            };
            carts.push(cart);
        }
        console.log(carts);
    })
}
}

function showCart(event){
    event.preventDefault();
    wrap.innerHTML = '';
    console.log(carts)
    let row = document.createElement('div');
    row.classList.add('cart__row');
    wrap.append(row)
    carts.forEach(cart => {
        return (
            row.insertAdjacentHTML('beforeend', 
            `<div class='product__card'>
                <h4 class='title'> ${cart.product.title}</h4>
                <p class='description'> ${cart.product.description}</p>
                <p class='price'> ${cart.product.price} руб.</p>
            
            </div>`
            )
        );
    })

}