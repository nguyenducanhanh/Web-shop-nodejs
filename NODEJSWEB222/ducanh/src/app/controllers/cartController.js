function addToCart(req, res) {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity,10)  || 1; 
  const price = parseFloat(req.body.price);
  const img = req.body.img;
  const name = req.body.name;
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItem = req.session.cart.find(item => item.productId === productId);

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    existingItem.quantity += quantity;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ 
    req.session.cart.push({ productId, name, img, quantity, price });
  }
  const message = 'Đã thêm sản phẩm vào giỏ hàng rồi ';
  res.send(`<script>alert("${message}"); window.location.href = "/cartRoutes";</script>`);
}


function removeFromCart(req, res) {
  const productId = req.params.productId;
  if (req.session.cart) {
    const productIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
      req.session.cart.splice(productIndex, 1); // Xóa sản phẩm khỏi giỏ hàng
    }
  }
  res.redirect("/cartRoutes"); // Điều hướng trở lại trang giỏ hàng sau khi xóa sản phẩm
}


function getCart(req, res) {
  const cartContents = req.session.cart || [];
  let total = 0;
  cartContents.forEach(item => {
    item.subtotal = item.price * item.quantity;
    total += item.price * item.quantity;
  });

  res.render('cart', { cartContents, total, title: 'Giỏ hàng' });
}

function updateCartItem(req, res) {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity, 10) || 1;

  if (req.session.cart) {
    const existingItem = req.session.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.subtotal = existingItem.price * quantity;
      const total = calculateTotal(req.session.cart);
      res.status(200).json({ subtotal: existingItem.subtotal, total });
    } else {
      res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng.' });
    }
  } else {
    res.status(404).json({ error: 'Giỏ hàng không tồn tại.' });
  }
}

module.exports = {
  updateCartItem,
  addToCart,
  removeFromCart,
  getCart,
};
