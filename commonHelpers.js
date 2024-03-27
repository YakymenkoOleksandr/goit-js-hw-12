import{S as h,i as a,a as y}from"./assets/vendor-95dc692e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const d=document.querySelector(".inputOfWords"),g=document.querySelector(".buttonForInput"),f=document.querySelector(".userList"),m=document.querySelector(".areaForLoader");let i="",l=1,u=0;const b=new h(".gallery a",{captionDelay:250,captionsData:"alt"});g.addEventListener("click",e=>{w(),e.preventDefault(),f.innerHTML="",i!==d.value.trim()&&(l=1),i=d.value.trim(),p(),d.value=""});async function p(){return v().then(e=>{i===""?a.show({color:"red",message:"Sorry, the input field must be filled in to start the photo search.",position:"topCenter"}):e.length===0?a.show({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}):L(e)}).catch(e=>console.log(e)).finally(()=>F())}function L(e){e.length;const o=e.map(s=>`<div class="blockForAllElements">
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
        </div>`).join("");f.insertAdjacentHTML("beforeend",o),b.refresh(),u<l*15?a.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):u<15?a.show({color:"red",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}):(S(),k(),O())}async function v(){const o={key:"42977219-0f6c9f9217f976d8651793c3a",q:i,image_type:"photo",per_page:15,orientation:"horizontal",safesearch:!0,page:l};return await y.get("https://pixabay.com/api/",{params:o}).then(n=>{if(!n.data.hits)throw new Error("No images found");return u=n.data.totalHits,o.page=l,l++,n.data.hits}).catch(n=>{throw console.error("Error fetching images:",n),n})}function w(){const e=document.createElement("span");m.appendChild(e),e.classList.add("loader")}function E(){const e=document.createElement("span");m.appendChild(e),e.classList.add("loaderG")}function F(){document.querySelector(".loader").remove()}function O(){document.querySelector(".loaderG").remove()}function S(){const e=document.createElement("button");f.appendChild(e),e.classList.add("buttonForLoad"),e.textContent="Load more",e.addEventListener("click",o=>{o.preventDefault(),e.textContent="Loading...",p(),e.remove(),E()})}function k(){const e=document.querySelectorAll(".blockForAllElements");if(e.length>0){const o=e[0].offsetHeight;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
