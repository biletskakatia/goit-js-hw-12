import{a as y,i as d,S as m}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L="43802076-938fa3042b8f90b237e1b6cb9",b="https://pixabay.com/api/",h=async(r,t,s=15)=>{const a={q:r,key:L,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s};try{return(await y.get(b,{params:a})).data}catch{throw new Error("Failed to fetch photos from Pixabay")}},g=r=>r.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:o,comments:i,downloads:f})=>`
        <li class="gallery-item">
                <a href="${s}" >
                    <img src="${t}" alt="${a}" class="gallery-img" />
                </a>
                <div class="details">
        <div class="detail-row">
            <p>Likes:</p>
            <span>${e}</span>
        </div>
        <div class="detail-row">
            <p>Views:</p>
            <span>${o}</span>
        </div>
        <div class="detail-row">
            <p>Comments:</p>
            <span>${i}</span>
        </div>
        <div class="detail-row">
            <p>Downloads:</p>
            <span>${f}</span>
        </div>
    </div>
            </li>
        `).join(""),v=document.querySelector(".js-search-form"),c=document.querySelector(".gallery"),p=document.querySelector(".js-loader"),u=document.querySelector(".load-more-button");let n=1,l="";async function w(r){if(r.preventDefault(),n=1,l=r.target.querySelector(".search-input").value.trim(),l===""){c.innerHTML="",r.target.reset(),d.error({title:"Error",message:"Illegal operation, enter a name",position:"topRight"});return}c.innerHTML="",p.classList.remove("is-hidden");try{const t=await h(l,n);if(t.total===0||!t.hits){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c.innerHTML=g(t.hits),new m(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom"}).refresh(),u.classList.remove("is-hidden")}catch(t){console.log(t)}r.target.reset(),p.classList.add("is-hidden")}const S=()=>{const t=document.querySelector(".gallery-item").getBoundingClientRect().height,s=t*2;console.log(s),window.scrollBy({top:t,left:0,behavior:"smooth"})};async function E(){n++;try{p.classList.remove("is-hidden");const r=await h(l,n);if(r.total===0||!r.hits){d.error({title:"Error",message:"Sorry, there are no more images to load.",position:"topRight"});return}const t=g(r.hits);c.insertAdjacentHTML("beforeend",t),new m(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom"}).refresh(),n*15>=r.totalHits&&(u.classList.add("is-hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),S()}catch(r){console.log(r)}finally{p.classList.add("is-hidden")}}u.addEventListener("click",E);v.addEventListener("submit",w);
//# sourceMappingURL=commonHelpers.js.map
