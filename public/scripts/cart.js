function removeItem(index) {
    if (carrito.length > 1) {
      carrito.splice(index, 1);
      products.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      document.getElementById(`row${index}`).remove();
    } else {
      localStorage.removeItem("carrito");
      products = [];
      setCarritoVacio();
    }
  
    let cartNumber = document.querySelector(".cart-number");
    cartNumber.innerText = productsEnElCarrito();
  
    document.querySelector(".totalAmount").innerText = `$ ${calcularTotal(
      products
    )}`;
  
    toastr.success("Se borro el item del carrito");
  }
  
  function setCarritoVacio() {
    cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
    </tr>            
    `;
  }
  function vaciarCarrito() {
    localStorage.removeItem("carrito");
  }
  
  function calcularTotal(products) {
    console.log("price", Number(products[0].price))
    return products.reduce(
      (acum, product) => (acum += Number(product.price) * product.quantity),
      0
    );
  }
  
  let cartRows = document.querySelector(".cartRows");
  let products = [];
  
  if (localStorage.carrito && localStorage.carrito != "[]") {
    carrito = JSON.parse(localStorage.carrito);
    
    carrito.forEach((item, index) => {
      fetch(`/api/discs/detail/${item.id}`)
      
        .then((res) => res.json())
        .then((product) => {
          if (product) {
            
            cartRows.innerHTML+=`
            <article>
            <a href="/producto/detalle/${product.data.idDisc}"><img src="/img/productos/${product.data.artwork}"></a>
            <div class="datosDisco">
                <a href="/producto/detalle/${product.data.idDisc}" style="text-decoration: none; color:black"><h3>${product.data.title}</h3></a>
            <h4>${product.data.idArtist}</h4>
            <span>ID:${product.data.idDisc}</span>
            <span>${product.data.price}</span>
            <span>Cant:${item.quantity}</span>
        </div>
            
                <button class="botonForm">Eliminar</button>          
        </article>
            `
           /*  cartRows.innerHTML += `
              <tr id="row${index}">
                  <th scope="row">${index + 1}</th>
                  <td>${product.data.title}</td>
                  <td>$ ${product.price}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-center">$ ${parseFloat(
                    product.price * item.quantity,
                    2
                  ).toFixed(2)}</td>
                  <td><button class="btn btn-danger btn-sm" onclick=removeItem(${index})><i class="fas fa-trash"></i></button></td>
              </tr>            
              `; */
            products.push({
             ...product.data, 
             quantity:item.quantity
            });
          } else {
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
          }
        })
        .then(() => {
          document.querySelector(".totalAmount").innerText = `$ ${calcularTotal(
            products
          )}`;
        });
    });
  } else {
    setCarritoVacio();
  }
  
  let formCheckout = document.querySelector("#checkoutCart");
  
  /* formCheckout.onsubmit = (e) => {
    e.preventDefault();
    const formData = {
      orderItems: products,
      paymentMethod: formCheckout.paymentMethod.value,
      shippingMethod: formCheckout.shippingMethod.value,
      total: calcularTotal(products),
    }; 
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          //borro el carrito
          vaciarCarrito();
          location.href = `/order/${res.order.id}?creado=true`;
        } else {
          toastr.error("No se pudo realizar la compra, intente mas tarde");
        }
      })
      .catch((error) => console.log(error));
    // console.log(formCheckout.elements, formData, products);
  };*/
  