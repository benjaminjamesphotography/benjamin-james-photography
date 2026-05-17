import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, ShoppingBag, Download, Lock, Mail, Star, Menu, X, Search, Plus, Minus, CreditCard, ShieldCheck } from 'lucide-react';
import './style.css';

const galleries = [
  { id:'dance-showcase-2026', title:'Dance Showcase 2026', location:'Sydney Performance Centre', date:'May 2026', cover:'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80', passwordProtected:true },
  { id:'studio-contemporary', title:'Contemporary Studio Session', location:'Newtown Studio', date:'April 2026', cover:'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1400&q=80', passwordProtected:false }
];

const photos = [
  { id:'DSC_1024', gallery:'Dance Showcase 2026', dancer:'Solo Performance', image:'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80', price:15 },
  { id:'DSC_1088', gallery:'Dance Showcase 2026', dancer:'Stage Leap', image:'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80', price:15 },
  { id:'DSC_1132', gallery:'Dance Showcase 2026', dancer:'Group Routine', image:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80', price:15 },
  { id:'DSC_1197', gallery:'Contemporary Studio Session', dancer:'Contemporary Pose', image:'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=900&q=80', price:15 },
  { id:'DSC_1250', gallery:'Contemporary Studio Session', dancer:'Floor Work', image:'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=80', price:15 },
  { id:'DSC_1311', gallery:'Contemporary Studio Session', dancer:'Movement Portrait', image:'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=900&q=80', price:15 }
];

function money(amount){ return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD'}).format(amount); }
function Button({children, variant='', disabled=false, onClick}){ return <button disabled={disabled} onClick={onClick} className={`btn ${variant}`}>{children}</button> }

function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [selectedGallery,setSelectedGallery]=useState('All Galleries');
  const [searchTerm,setSearchTerm]=useState('');
  const [cart,setCart]=useState([]);
  const filteredPhotos=useMemo(()=>photos.filter(photo=>{
    const matchesGallery=selectedGallery==='All Galleries'||photo.gallery===selectedGallery;
    const matchesSearch=`${photo.id} ${photo.gallery} ${photo.dancer}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGallery&&matchesSearch;
  }),[selectedGallery,searchTerm]);
  const cartTotal=cart.reduce((sum,item)=>sum+item.price,0);
  const addToCart=(photo)=>{ if(!cart.find(item=>item.id===photo.id)) setCart([...cart,photo]); };
  const removeFromCart=(photoId)=>setCart(cart.filter(item=>item.id!==photoId));

  return <div className="site">
    <header className="header"><div className="nav-wrap">
      <div className="brand"><div className="brand-icon"><Camera size={22}/></div><div><p>Benjamin James Photography</p><span>Dance • Performance • Movement</span></div></div>
      <nav className="nav"><a href="#galleries">Galleries</a><a href="#shop">Buy Photos</a><a href="#delivery">Digital Delivery</a><a href="#contact">Contact</a></nav>
      <a href="#shop" className="desktop-only"><Button>View Photos</Button></a>
      <button className="menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </div>{menuOpen&&<div className="mobile-nav"><a href="#galleries">Galleries</a><a href="#shop">Buy Photos</a><a href="#delivery">Digital Delivery</a><a href="#contact">Contact</a></div>}</header>

    <section className="hero"><div className="hero-grid"><div className="hero-copy"><div className="pill"><Star size={16}/> Dance event galleries with automatic digital delivery</div><h1>View your dance photos and purchase digital copies instantly.</h1><p>Browse event galleries, choose your favourite images, pay securely online, and receive high-resolution digital files after purchase.</p><div className="actions"><a href="#shop"><Button>View & Buy Photos</Button></a><a href="#contact"><Button variant="outline">Book a Shoot</Button></a></div></div><div className="hero-img"><img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80" alt="Dance photography"/></div></div></section>

    <section id="galleries" className="section"><div className="section-head"><div><span className="eyebrow">Client Galleries</span><h2>Choose your event gallery</h2></div><p>Use public galleries for general sales or password-protected galleries for private dance schools, competitions and performances.</p></div><div className="gallery-grid">{galleries.map(g=><div className="card gallery-card" key={g.id}><img src={g.cover} alt={g.title}/><div className="card-body"><div className="gallery-title"><div><p>{g.location} • {g.date}</p><h3>{g.title}</h3></div>{g.passwordProtected&&<div className="lock"><Lock size={20}/></div>}</div><div className="actions"><Button onClick={()=>setSelectedGallery(g.title)}>View Photos</Button>{g.passwordProtected&&<Button variant="outline-dark">Enter Gallery Code</Button>}</div></div></div>)}</div></section>

    <section id="shop" className="shop"><div className="section"><div className="section-head"><div><span className="eyebrow">Photo Store</span><h2>View and purchase your photos</h2><p>Preview images are shown at lower resolution. Purchased files are delivered as full-resolution digital downloads.</p></div><div className="filters"><select value={selectedGallery} onChange={e=>setSelectedGallery(e.target.value)}><option>All Galleries</option>{galleries.map(g=><option key={g.id}>{g.title}</option>)}</select><div className="search"><Search size={18}/><input placeholder="Search photo ID" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/></div></div></div>
      <div className="store-layout"><div className="photo-grid">{filteredPhotos.map(photo=>{const inCart=cart.some(item=>item.id===photo.id); return <div className="photo-card" key={photo.id}><div className="photo-wrap"><img src={photo.image} alt={photo.dancer}/><span className="watermark">PREVIEW</span><span className="photo-id">{photo.id}</span></div><div className="card-body"><p>{photo.gallery}</p><h3>{photo.dancer}</h3><div className="price-row"><strong>{money(photo.price)}</strong>{inCart?<Button variant="outline-dark" onClick={()=>removeFromCart(photo.id)}><Minus size={16}/> Remove</Button>:<Button onClick={()=>addToCart(photo)}><Plus size={16}/> Add</Button>}</div></div></div>})}</div>
      <aside className="cart"><div className="cart-title"><ShoppingBag/><h3>Your Order</h3></div>{cart.length===0?<p>No photos selected yet. Add your favourite images to purchase digital copies.</p>:<div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><div><strong>{item.id}</strong><span>{item.dancer}</span></div><button onClick={()=>removeFromCart(item.id)}>Remove</button></div>)}</div>}<div className="total"><div><strong>Total</strong><strong>{money(cartTotal)}</strong></div><Button disabled={cart.length===0}><CreditCard size={18}/> Checkout Securely</Button><p>Live version connects this button to Stripe. After successful payment, the buyer receives an automatic email with secure download links.</p></div></aside></div></div></section>

    <section id="delivery" className="section"><div className="center"><span className="eyebrow">Automatic Delivery</span><h2>Built for hands-off digital sales</h2><p>The front-end store is ready visually. The live version needs Stripe checkout, secure file storage and email automation connected behind the scenes.</p></div><div className="feature-grid"><div><ShieldCheck/><h3>Watermarked previews</h3><p>Customers view protected low-resolution previews before buying.</p></div><div><CreditCard/><h3>Secure checkout</h3><p>Stripe handles card payments, Apple Pay and Google Pay.</p></div><div><Download/><h3>Download email</h3><p>After payment, the customer receives a secure link to download their purchased files.</p></div></div></section>

    <section id="contact" className="contact"><div className="contact-grid"><div><span className="eyebrow">Bookings</span><h2>Dance schools, performances and private shoots</h2><p>For dance events, studio sessions, auditions, portfolios or performance coverage, send through the details and I’ll get back to you.</p></div><div className="contact-card"><Mail/><h3>Contact</h3><p>Email: hello@benjaminjamesphotography.com.au</p><p>Instagram: @benjaminjamesphotography</p><Button>Send Enquiry</Button></div></div></section>
    <footer>© 2026 Benjamin James Photography. All rights reserved.</footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
