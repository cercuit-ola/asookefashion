// Asooke Fashion — shared catalog + cart (global window.ASOOKE). Max 15 products.
(function () {
  const CATALOG = [
    { id:'wine-two-piece',    name:'Ìyàwó Wine Two-Piece',   sub:'Wine · gold pin',        price:185, img:'assets/model-maroon.png', pos:'top center',  bg:'#5E1B24', tag:'New' },
    { id:'magenta-agbada',    name:'Àṣà Magenta Agbádá',      sub:'Coral bead set',         price:240, img:'assets/model-pink.png',   pos:'left center', bg:'#7d1e46' },
    { id:'ila-stripe-agbada', name:'Ìlà Striped Agbádá',      sub:'Multi-stripe · gèlè',    price:265, img:'assets/model-stripe.png', pos:'center top', bg:'#3a3f33', tag:'New' },
    { id:'oyo-kente-kaftan',  name:'Ọ̀yọ́ Kente Kaftan',        sub:'Patchwork weave',        price:290, img:'assets/model-kente.png',  pos:'center top', bg:'#3a3f33' },
    { id:'indigo-adire-set',  name:'Indigo Àdìrẹ Ìró & Bùbá', sub:'Tie-dye · fringe ìpèlé', price:220, img:'assets/model-indigo.png', pos:'center top', bg:'#20242e', tag:'New' },
    { id:'ade-gele',          name:'Adé Gèlè Headwrap',       sub:'Caramel stripe',         price:100, img:'assets/ade-gele.png',    pos:'center top', bg:'#3a2a20' },
    { id:'coral-rope',        name:'Coral Bead Rope',         sub:'Accessory',              price:120, img:'assets/coral-rope.png',   pos:'center',    bg:'#7d1e46' },
    { id:'etu-wrap-set',      name:'Etù Wrap Skirt Set',      sub:'Monochrome print',       price:210, img:'assets/ade-gele.png',    pos:'center top', bg:'#3a2a20' },
    { id:'wine-peplum',       name:'Wine Peplum Top',         sub:'Gold pin detail',        price:130, slot:'asooke-p9',  bg:'#5E1B24' },
    { id:'sanyan-bridal',     name:'Sáńyán Ivory Bridal Set', sub:'Made to order',          price:310, img:'assets/sanyan-bridal.png', pos:'center top', bg:'#8a7d63' },
    { id:'saki-kaftan',       name:'Sáki Stripe Kaftan',      sub:'Earth stripe',           price:175, slot:'asooke-p11', bg:'#3a3f33' },
    { id:'alaari-agbada',     name:'Alárì Red Agbádá',        sub:'Deep wine weave',        price:255, slot:'asooke-p12', bg:'#4A141C' },
    { id:'petuje-set',        name:'Pétujé Two-Tone Set',     sub:'Wine · sand',            price:160, slot:'asooke-p13', bg:'#5E1B24' },
    { id:'ofi-wrapper',       name:'Òfì Handwoven Wrapper',   sub:'Classic selvedge',       price:145, slot:'asooke-p14', bg:'#7d1e46' },
    { id:'gele-ipele',        name:'Gèlè & Ìpèlé Set',        sub:'Occasion pair',          price:135, slot:'asooke-p15', bg:'#8a7d63' },
  ];
  const byId = (id) => CATALOG.find(p => p.id === id);
  const money = (n) => '$' + Number(n).toLocaleString('en-US');
  const KEY = 'asooke_cart';
  const getCart = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const saveCart = (c) => localStorage.setItem(KEY, JSON.stringify(c));
  const addToCart = (id, size = 'M', qty = 1) => {
    const c = getCart(); const ex = c.find(i => i.id === id && i.size === size);
    if (ex) ex.qty += qty; else c.push({ id, size, qty });
    saveCart(c); return c;
  };
  const setQty = (id, size, qty) => {
    const c = getCart(); const ex = c.find(i => i.id === id && i.size === size);
    if (ex) ex.qty = Math.max(1, qty); saveCart(c); return c;
  };
  const removeItem = (id, size) => { const c = getCart().filter(i => !(i.id === id && i.size === size)); saveCart(c); return c; };
  const clearCart = () => saveCart([]);
  const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);
  const cartDetailed = () => getCart().map(i => ({ ...i, product: byId(i.id) })).filter(i => i.product);
  const cartTotal = () => cartDetailed().reduce((s, i) => s + i.product.price * i.qty, 0);

  window.ASOOKE = { CATALOG, byId, money, getCart, saveCart, addToCart, setQty, removeItem, clearCart, cartCount, cartDetailed, cartTotal };
  window.dispatchEvent(new Event('asooke-ready'));
})();
