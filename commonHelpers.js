import{S as h,i as n,a as y}from"./assets/vendor-95dc692e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const d=document.querySelector(".inputOfWords"),g=document.querySelector(".buttonForInput"),f=document.querySelector(".userList"),b=document.querySelector(".areaForLoader");let i="",a=1,u=0;const L=new h(".gallery a",{captionDelay:250,captionsData:"alt"});g.addEventListener("click",e=>{p(),e.preventDefault(),f.innerHTML="",i=d.value.trim(),m(),d.value="",i!==d.value.trim()&&(a=1)});async function m(){return w().then(e=>{i===""?n.show({color:"red",message:"Sorry, the input field must be filled in to start the photo search.",position:"topCenter"}):e.length===0?n.show({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}):v(e)}).catch(e=>console.log(e)).finally(()=>F())}function v(e){e.length;const o=e.map(s=>`<div class="blockForAllElements">
          <li>
          <a href=${s.largeImageURL} download="false">
          <img src=${s.webformatURL} alt = "${s.tags}" class = "imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${s.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${s.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${s.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${s.downloads}</li>
          </ul>
          </div>
        </div>`).join("");f.insertAdjacentHTML("beforeend",o),L.refresh(),u<a*15?n.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):u<15?n.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):(E(),O(),a++)}async function w(){const o={key:"42977219-0f6c9f9217f976d8651793c3a",q:i,image_type:"photo",per_page:15,orientation:"horizontal",safesearch:!0,page:a};return await y.get("https://pixabay.com/api/",{params:o}).then(l=>{if(!l.data.hits)throw new Error("No images found");return u=l.data.totalHits,l.data.hits}).catch(l=>{throw console.error("Error fetching images:",l),l})}function p(){const e=document.createElement("span");b.appendChild(e),e.classList.add("loader")}function F(){document.querySelector(".loader").remove()}function E(){const e=document.createElement("button");f.appendChild(e),e.classList.add("buttonForLoad"),e.textContent="Load more",e.addEventListener("click",o=>{p(),o.preventDefault(),e.textContent="Loading...",m(),e.remove()})}function O(){const e=document.querySelectorAll(".blockForAllElements");if(e.length>0){const o=e[0].offsetHeight;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
