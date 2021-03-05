function storeLocalStore(data) {
  localStorage.setItem("cart", JSON.stringify(data));
}
function amount(item) {
  if (Object.keys(item.discount).length>0&&item.discount.value_type == 'percentage') {
    item.num=item.num || 1;
    item.discount.amount = Math.floor(item.price * item.num * item.discount.value) / 100
  } else if (Object.keys(item.discount).length>0&&item.discount.value_type == 'fixed_amount') {
    item.num=item.num || 1;
    item.discount.amount = item.num * item.discount.value        
  }      
}

export const state = () => ({
  //添加到购物车的商品
  added:[]

})

export const getters = {
  //计算总数量      
  totalNum: state => {
    let total = 0;    
      
      state.added.forEach(item => {
        total += item.num        
      })
    
    return total;
  },
  //计算总价
  totalPrice: state => {
    let total = 0;
    state.added.forEach(item => {
      total += item.finalPrice * item.num
    })
    return total.toFixed(2);
  },

}


export const mutations = {
  //更新产品列表
  upgradeGoods(state, data) {
    state.goods = data;
  },

  //加入购物车
  addToCart(state, data) {
    
    
    let record = state.added.find(item => item.id == data.id);
    let discount = state.added.find(item => item.discount.code == data.discount.code);

    if (!record||!discount) {
      delete data.source
      amount(data)
      state.added.push({
        ...data,
        num: 1
      })
      
    } else {
           
      record.num++  
      amount(record)   
    }

    
    localStorage.cart = JSON.stringify(state);
  },
  updataCart(state,data){
    state.added.forEach((item,i) => {        
      let newItem = data.find(res=>res.productModel==item.productModel)
      if (newItem) {
        item.available = newItem.available
      }     
    });
    
    localStorage.cart = JSON.stringify(state)
  },
  numChange(state, data) {
    state.added.forEach((item,i) => {
      if (item.id == data.id) {
        item.num = data.value;
        amount(item)
      }
    })
    localStorage.cart = JSON.stringify(state);
  },
  //删除购物车的指定的商品
  delete(state, index) {   

        state.added.splice(index, 1);
    localStorage.cart = JSON.stringify(state);
  },
  clear(state) {
    state.added = [];
    localStorage.cart = JSON.stringify(state);
  },

  itemIsError(state, data) {
    if (state.added) {
      state.added[data.index].itemIsError = data.data;
    }
    localStorage.cart = JSON.stringify(state);
  },
  _INIT(state) {
    //console.log(state,"before")
    if (localStorage.cart) {
      state.added.length>0&&JSON.parse(localStorage.cart).added.length>0?'':state.added = JSON.parse(localStorage.cart).added;
    }    
    //console.log(JSON.parse(localStorage.cart).added,"after");
    //console.log(state,"after")
  }
}
export const actions = {
  init({commit},data){
    commit('_INIT')      
  }
}