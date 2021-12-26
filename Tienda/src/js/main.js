const fetchStore = async () => {
    try {
      const res = await fetch(
        'https://fakestoreapi.com/products'
      );
  
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () =>{
      const products = await fetchStore()
      products.forEach((element) => {
          //console.log(element.id)
      })
      //console.log(products[0])
  }
  //fetchProducts()