  // ========= CONFIGURA AQUÍ TUS DATOS =========
  const profile = {
    purchaseUrl: "https://caffedm.myorganogold.com/it-it/",
    phone: "+39 351 670 8687",
    whatsapp: "+39 351 670 8687",
    email: "chalcoroxana13@gmail.com",
    facebook: "https://www.facebook.com/franshesca.chalco",
    greeting: "Hola Roxana, quiero más info de los productos ORGANO."
  };

  const productData = [
    { id:"black", name:"Café Black", tag:"Intenso", img:"https://www.organogold.com/wp-content/uploads/2017/10/OGEU-Product-Thumbnails-2017_BlackCoffee.jpg", desc:"Sabor profundo y balanceado. Perfecto para quienes disfrutan el café sin leche." },
    { id:"latte", name:"Café Latte", tag:"Cremoso", img:"https://www.organogold.com/wp-content/uploads/2017/10/OGEU-Product-Thumbnails-2017_Latte.jpg", desc:"Textura sedosa con notas lácteas. Ideal para tardes de relax." },
    { id:"supreme", name:"Café Supreme", tag:"Suave", img:"https://www.organogold.com/wp-content/uploads/2017/11/OGEU-Product-Thumbnails-2017_SUPREME.jpg", desc:"Mezcla aromática y amable al paladar. Para un día largo pero ligero." },
    { id:"mocha", name:"Café Mocha", tag:"Chocolatoso", img:"https://www.organogold.com/wp-content/uploads/2017/10/OGEU-Product-Thumbnails-2017_Mocha.jpg", desc:"Un toque de cacao para un capricho dulce sin perder el carácter del café." },
    { id:"chocolate", name:"Chocolate", tag:"Gourmet", img:"https://www.organogold.com/wp-content/uploads/2017/10/HotCocoa_BS_EU_BackOffice.jpg", desc:"Bebida de chocolate reconfortante para toda la familia." },
    { id:"verde", name:"Té Verde", tag:"Refrescante", img:"https://www.organogold.com/wp-content/uploads/2017/11/OGEU-Product-Thumbnails-2017_GreenTeaBoxSachet.jpg", desc:"Perfil vegetal y limpio. Excelente para acompañar comidas ligeras." },
    { id:"rojo", name:"Té Rojo", tag:"Aromático", img:"https://www.organogold.com/wp-content/uploads/2017/11/OGEU-Product-Thumbnails-2017_RedTeaBoxSachet.jpg", desc:"Notas terrosas y cuerpo medio. Perfecto para tardes templadas." }
  ];

  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function renderProducts(){
    const grid = $("#productsGrid");
    grid.innerHTML = productData.map(p => `
      <article class="product reveal" data-id="${p.id}">
        <div class="img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="body">
          <h3>${p.name}</h3>
          <span class="tag">${p.tag}</span>
          <p class="prose" style="margin-top:8px">${p.desc}</p>
          <div class="actions">
            <button class="btn btn-outline btn-small" data-open="${p.id}">Ver más</button>
            <a class="btn btn-small" style="background:var(--gold);color:#241812" href="${profile.purchaseUrl}?producto=${encodeURIComponent(p.id)}" target="_blank" rel="noopener">Adquirir</a>
          </div>
        </div>
      </article>
    `).join("");
    hookReveals(grid); // <-- Aquí enganchamos los nuevos productos
  }

  function renderContacts(){
    const c = $("#contactList");
    const wamsg = encodeURIComponent(profile.greeting || "Hola Roxana, quiero más info de los productos ORGANO.");
    const waLink = `https://wa.me/${profile.whatsapp.replace(/[^\d]/g,"")}?text=${wamsg}`;
    c.innerHTML = `
      <div class="contact-item">
        <span class="icon" style="color:#1a73e8"><svg viewBox="0 0 24 24"><use href="#ic-mail"/></svg></span>
        <div>
          <div><strong>Correo</strong></div>
          <a href="mailto:${profile.email}">${profile.email}</a>
        </div>
      </div>
      <div class="contact-item">
        <span class="icon" style="color:#25D366"><svg viewBox="0 0 24 24"><use href="#ic-whatsapp"/></svg></span>
        <div>
          <div><strong>WhatsApp</strong></div>
          <a href="${waLink}" target="_blank" rel="noopener">${profile.whatsapp}</a>
        </div>
      </div>
      <div class="contact-item">
        <span class="icon" style="color:#1877f2"><svg viewBox="0 0 24 24"><use href="#ic-facebook"/></svg></span>
        <div>
          <div><strong>Facebook</strong></div>
          <a href="${profile.facebook}" target="_blank" rel="noopener">${profile.facebook}</a>
        </div>
      </div>
      <div class="contact-item">
        <span class="icon" style="color:#6b5f57"><svg viewBox="0 0 24 24"><use href="#ic-link"/></svg></span>
        <div>
          <div><strong>Teléfono</strong></div>
          <a href="tel:${profile.phone}">${profile.phone}</a>
        </div>
      </div>
    `;
    $("#footerSocials").innerHTML = `
      <a title="Facebook" href="${profile.facebook}" target="_blank" rel="noopener" class="pill"><svg class="icon" viewBox="0 0 24 24"><use href="#ic-facebook"/></svg> Facebook</a>
      <a title="WhatsApp" href="${waLink}" target="_blank" rel="noopener" class="pill"><svg class="icon" viewBox="0 0 24 24"><use href="#ic-whatsapp"/></svg> WhatsApp</a>
      <a title="Correo" href="mailto:${profile.email}" class="pill"><svg class="icon" viewBox="0 0 24 24"><use href="#ic-mail"/></svg> Email</a>
    `;
    hookReveals(c); // <-- Engancha también los contactos si tienen .reveal
  }

  // ========= MODAL =========
  const modal = $("#productModal");
  const modalTitle = $("#modalTitle");
  const modalImg = $("#modalImg");
  const modalDesc = $("#modalDesc");
  const modalBuy = $("#modalBuy");
  $("#modalClose").addEventListener("click", ()=>modal.classList.remove("open"));
  modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("open"); });

  function onOpenProduct(id){
    const p = productData.find(x=>x.id===id);
    if(!p) return;
    modalTitle.textContent = p.name;
    modalImg.src = p.img;
    modalImg.alt = p.name;
    modalDesc.textContent = p.desc;
    modalBuy.href = `${profile.purchaseUrl}?producto=${encodeURIComponent(p.id)}`;
    modal.classList.add("open");
  }

  // ========= APPEAR ON SCROLL =========
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.14});

  function hookReveals(ctx=document){
    ctx.querySelectorAll('.reveal:not([data-observed])').forEach(el=>{
      el.setAttribute('data-observed','');
      io.observe(el);
    });
  }

  // ========= INIT =========
  function init(){
    renderProducts();
    renderContacts();
    $("#btnAdquirir").href = profile.purchaseUrl;
    $("#year").textContent = new Date().getFullYear();
    $("#productsGrid").addEventListener("click", (e)=>{
      const btn = e.target.closest("[data-open]");
      if(btn){ onOpenProduct(btn.getAttribute("data-open")); }
    });
    hookReveals(document); // engancha lo que ya había en la página
  }
  init();