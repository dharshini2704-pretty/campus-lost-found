const demoCrops = [
  {id:"demo-1",crop:"Fresh Tomatoes",category:"Vegetables",quantity:850,price:24,farmer:"Murugan Farms",location:"Erode, Tamil Nadu",harvest:"2026-11-26",phone:"9876543210",description:"Firm, bright red tomatoes harvested with care. Bulk quantities available.",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80"},
  {id:"demo-2",crop:"Basmati Rice",category:"Grains",quantity:1200,price:68,farmer:"Green Valley Farm",location:"Thanjavur, Tamil Nadu",harvest:"2026-12-02",phone:"9876543211",description:"Aromatic, quality-graded rice. Suitable for retailers and bulk buyers.",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80"},
  {id:"demo-3",crop:"Sweet Bananas",category:"Fruits",quantity:600,price:32,farmer:"Kaveri Orchards",location:"Salem, Tamil Nadu",harvest:"2026-11-25",phone:"9876543212",description:"Naturally ripened, fresh bunches. Regular supply can be discussed.",image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80"},
  {id:"demo-4",crop:"Red Onions",category:"Vegetables",quantity:1500,price:29,farmer:"Anbu Agro",location:"Perambalur, Tamil Nadu",harvest:"2026-11-29",phone:"9876543213",description:"Well-cured onions with good size and storage quality.",image:"https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80"},
  {id:"demo-5",crop:"Green Gram",category:"Pulses",quantity:400,price:92,farmer:"Malar Organic Farm",location:"Dindigul, Tamil Nadu",harvest:"2026-12-05",phone:"9876543214",description:"Clean green gram suitable for wholesale and local stores.",image:"https://images.unsplash.com/photo-1515543904379-3d757f8f3e7e?auto=format&fit=crop&w=900&q=80"},
  {id:"demo-6",crop:"Fresh Carrots",category:"Vegetables",quantity:500,price:38,farmer:"Hilltop Growers",location:"Ooty, Tamil Nadu",harvest:"2026-11-27",phone:"9876543215",description:"Crisp carrots, freshly sorted and packed for transport.",image:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80"}
];
const STORAGE_KEY = "harvesthub_user_listings_v1";
const grid = document.getElementById("cropGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const emptyState = document.getElementById("emptyState");
let toastTimer;

function getUserListings(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return []}}
function getAllCrops(){return [...getUserListings(),...demoCrops]}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function formatDate(value){if(!value)return "Date not specified";const d=new Date(value+"T00:00:00");return Number.isNaN(d.getTime())?value:d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
function renderCrops(){
  const term=searchInput.value.trim().toLowerCase();
  const category=categoryFilter.value;
  let items=getAllCrops().filter(item=>{
    const haystack=[item.crop,item.farmer,item.location,item.category].join(" ").toLowerCase();
    return (!term||haystack.includes(term))&&(category==="all"||item.category===category);
  });
  if(sortFilter.value==="low")items.sort((a,b)=>Number(a.price)-Number(b.price));
  if(sortFilter.value==="high")items.sort((a,b)=>Number(b.price)-Number(a.price));
  document.getElementById("resultCount").textContent=`Showing ${items.length} ${items.length===1?"crop":"crops"}`;
  grid.innerHTML=items.map(item=>`
    <article class="crop-card">
      <div class="crop-image"><img src="${escapeHTML(item.image||"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80")}" alt="${escapeHTML(item.crop)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80'"><span class="category-pill">${escapeHTML(item.category)}</span></div>
      <div class="crop-body">
        <div class="crop-top"><h3>${escapeHTML(item.crop)}</h3><div class="crop-price">₹${Number(item.price).toLocaleString("en-IN")}<small> / kg</small></div></div>
        <div class="crop-meta"><span>▣ ${Number(item.quantity).toLocaleString("en-IN")} kg available</span><span>⌖ ${escapeHTML(item.location)}</span></div>
        <p class="crop-description">${escapeHTML(item.description||"Fresh crop directly listed by the farmer.")}</p>
        <div class="crop-meta"><span>Harvest: ${escapeHTML(formatDate(item.harvest))}</span></div>
        <div class="farmer-line"><div><div class="farmer-name">${escapeHTML(item.farmer)}</div><div class="farmer-location">Farmer / Grower</div></div><button class="btn btn-primary" data-enquire="${escapeHTML(item.id)}">Enquire ↗</button></div>
      </div>
    </article>`).join("");
  emptyState.classList.toggle("hidden",items.length!==0);
  grid.classList.toggle("hidden",items.length===0);
}
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200)}
function openModal(id){document.getElementById(id).classList.remove("hidden");document.body.style.overflow="hidden"}
function closeModal(id){document.getElementById(id).classList.add("hidden");document.body.style.overflow=""}
function openListing(){openModal("listingModal")}
["listCropBtn","heroListBtn","marketListBtn","impactListBtn","ctaListBtn"].forEach(id=>document.getElementById(id).addEventListener("click",openListing));
document.getElementById("loginBtn").addEventListener("click",()=>showToast("Demo website: sign-in and account creation are not connected to a server yet."));
document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(backdrop=>backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal(backdrop.id)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(m=>closeModal(m.id))});
document.getElementById("listingForm").addEventListener("submit",e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const listing={...data,id:"user-"+Date.now(),quantity:Number(data.quantity),price:Number(data.price),image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"};
  const listings=getUserListings();listings.unshift(listing);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(listings));e.currentTarget.reset();closeModal("listingModal");searchInput.value="";categoryFilter.value="all";sortFilter.value="recent";renderCrops();showToast("Your crop listing has been added in this browser.");}
  catch{showToast("Could not save this listing. Check browser storage settings.");}
});
grid.addEventListener("click",e=>{
  const btn=e.target.closest("[data-enquire]");if(!btn)return;
  const item=getAllCrops().find(c=>c.id===btn.dataset.enquire);if(!item)return;
  document.getElementById("enquiryCropInfo").innerHTML=`<strong>${escapeHTML(item.crop)}</strong> · ₹${Number(item.price).toLocaleString("en-IN")}/kg<br>Farmer: ${escapeHTML(item.farmer)} · ${escapeHTML(item.location)}<br>Contact: ${escapeHTML(item.phone||"Not provided")}`;
  document.querySelector('#enquiryForm [name="listingId"]').value=item.id;
  openModal("enquiryModal");
});
document.getElementById("enquiryForm").addEventListener("submit",e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const item=getAllCrops().find(c=>c.id===data.listingId);if(!item)return;
  const message=`Hello ${item.farmer}, I am ${data.buyer}. I am interested in ${item.crop} and need ${data.quantity} kg. ${data.message||""}`;
  const phone=String(item.phone||"").replace(/\D/g,"");
  closeModal("enquiryModal");
  if(phone){const wa=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;window.open(wa,"_blank","noopener,noreferrer");showToast("Enquiry prepared. WhatsApp will open if available.");}
  else{showToast("Enquiry prepared, but this listing has no contact number.");}
  e.currentTarget.reset();
});
[searchInput,categoryFilter,sortFilter].forEach(el=>el.addEventListener(el===searchInput?"input":"change",renderCrops));
document.getElementById("clearFilters").addEventListener("click",()=>{searchInput.value="";categoryFilter.value="all";sortFilter.value="recent";renderCrops()});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".desktop-nav").classList.remove("open")));
renderCrops();
