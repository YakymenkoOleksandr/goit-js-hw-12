import{S as y,i as n,a as g}from"./assets/vendor-95dc692e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const f=document.querySelector(".inputOfWords"),b=document.querySelector(".buttonForInput"),c=document.querySelector(".userList"),m=document.querySelector(".areaForLoader");let d="",u=1,a=0;const L=new y(".gallery a",{captionDelay:250,captionsData:"alt"});b.addEventListener("click",e=>{h(),e.preventDefault(),c.innerHTML="",setTimeout(()=>{d=f.value.trim(),p(),f.value=""},1e3)});async function p(){return v().then(e=>{d===""?n.show({color:"red",message:"Sorry, the input field must be filled in to start the photo search.",position:"topCenter"}):e.length===0?n.show({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}):w(e)}).catch(e=>console.log(e)).finally(()=>F())}function w(e){e.length;const o=e.map(r=>`<div class="blockForAllElements">
          <li>
          <a href=${r.largeImageURL} download="false">
          <img src=${r.webformatURL} alt = "${r.tags}" class = "imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${r.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${r.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${r.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${r.downloads}</li>
          </ul>
          </div>
        </div>`).join("");c.insertAdjacentHTML("beforeend",o),L.refresh(),a<u*15?n.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):a<15?n.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):E()}async function v(){const o={key:"42977219-0f6c9f9217f976d8651793c3a",q:d,image_type:"photo",per_page:15,orientation:"horizontal",safesearch:!0,page:u};return await g.get("https://pixabay.com/api/",{params:o}).then(l=>{if(!l.data.hits)throw new Error("No images found");return a=l.data.totalHits,l.data.hits}).catch(l=>{throw console.error("Error fetching images:",l),l})}function h(){const e=document.createElement("span");m.appendChild(e),e.classList.add("loader")}function F(){document.querySelector(".loader").remove()}function E(){const e=document.createElement("button");c.appendChild(e),e.classList.add("buttonForLoad"),e.textContent="Load more",e.addEventListener("click",o=>{h(),m.style.display="none",o.preventDefault(),e.textContent="Loading...",setTimeout(async()=>{await p(),setTimeout(()=>{O(),e.remove()},1)},1e3),u++})}function O(){const e=document.querySelectorAll(".blockForAllElements");if(e.length>0){const o=e[0].offsetHeight;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
