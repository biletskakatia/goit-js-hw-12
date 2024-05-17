import{a as y,i as n,S as p}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const L="43802076-938fa3042b8f90b237e1b6cb9",b="https://pixabay.com/api/",m=async(r,e,s=15)=>{const i={q:r,key:L,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:s};try{return(await y.get(b,{params:i})).data}catch{throw new Error("Failed to fetch photos from Pixabay")}},g=r=>r.map(({webformatURL:e,largeImageURL:s,tags:i,likes:t,views:o,comments:a,downloads:f})=>`
        <li class="gallery-item">
                <a href="${s}" >
                    <img src="${e}" alt="${i}" class="gallery-img" />
                </a>
                <div class="details">
        <div class="detail-row">
            <p>Likes:</p>
            <span>${t}</span>
        </div>
        <div class="detail-row">
            <p>Views:</p>
            <span>${o}</span>
        </div>
        <div class="detail-row">
            <p>Comments:</p>
            <span>${a}</span>
        </div>
        <div class="detail-row">
            <p>Downloads:</p>
            <span>${f}</span>
        </div>
    </div>
            </li>
        `).join(""),v=document.querySelector(".js-search-form"),l=document.querySelector(".gallery"),u=document.querySelector(".js-loader"),h=document.querySelector(".load-more-button");let c=1,d="";async function w(r){if(r.preventDefault(),c=1,d=r.target.querySelector(".search-input").value.trim(),d===""){l.innerHTML="",r.target.reset(),n.error({title:"Error",message:"Illegal operation, enter a name",position:"topRight"});return}l.innerHTML="",u.classList.remove("is-hidden"),h.classList.add("is-hidden");try{const e=await m(d,c);if(e.total===0||!e.hits){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}l.innerHTML=g(e.hits),new p(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom"}).refresh(),e.hits.length<15?setTimeout(()=>{n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})},2e3):h.classList.remove("is-hidden")}catch(e){console.log(e)}r.target.reset(),u.classList.add("is-hidden")}const S=()=>{const e=document.querySelector(".gallery-item").getBoundingClientRect().height,s=e*2;console.log(s),window.scrollBy({top:e,left:0,behavior:"smooth"})};async function E(){c++;try{u.classList.remove("is-hidden");const r=await m(d,c);if(r.total===0||!r.hits){n.error({title:"Error",message:"Sorry, there are no more images to load.",position:"topRight"});return}const e=g(r.hits);l.insertAdjacentHTML("beforeend",e),new p(".gallery a",{captions:!0,captionDelay:250,captionPosition:"bottom"}).refresh(),(c*15>=r.totalHits||r.hits.length<15)&&(h.classList.add("is-hidden"),setTimeout(()=>{n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})},2e3)),S()}catch(r){console.log(r)}finally{u.classList.add("is-hidden")}}h.addEventListener("click",E);v.addEventListener("submit",w);
//# sourceMappingURL=commonHelpers.js.map
