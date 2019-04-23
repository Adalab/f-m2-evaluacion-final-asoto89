"use strict";const searchInput=document.querySelector(".form__input"),searchButton=document.querySelector(".button__input"),resultList=document.querySelector(".results__list"),searchTitle=document.querySelector(".results__main--title"),pressEnter=e=>{13===e.keyCode&&searchSeries()},urlFetch="http://api.tvmaze.com/search/shows?q=",defaultImage="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",createTitle=(e,t,r)=>{const a=document.createElement(t),s=document.createTextNode(e);return a.appendChild(s),a.setAttribute("class",r),a},searchFunction=(e,t)=>{const r=e.name.toLowerCase(),a=t.toLowerCase(),s=e.image;if(r.includes(a)){const t=createTitle(e.name,"h2","list__title"),r=createImageFetch(s,e.id);r.appendChild(t),resultList.appendChild(r),checkFavorite(e.id,r)}};function createImageFetch(e,t){const r=document.createElement("li");r.setAttribute("class","result__item"),r.setAttribute("id",t);const a=document.createElement("div");return a.setAttribute("class","results__image"),a.style.backgroundImage=null===e?`url(${defaultImage})`:`url(${e.medium})`,r.addEventListener("click",selectFavorite),r.appendChild(a),r}function searchSeries(){resultList.innerHTML="";const e=searchInput.value;searchTitle.classList.remove("hidden"),fetch(`${urlFetch}${e}`).then(e=>e.json()).then(t=>{for(const r of t){const t=r.show;searchFunction(t,e)}})}searchButton.addEventListener("click",searchSeries),window.addEventListener("keyup",pressEnter);const favoriteList=document.querySelector(".favorite__list");let favoritesArray=[];const deleteItem=e=>{const t=parseInt(e.currentTarget.getAttribute("id")),r=compareFavorite(t);favoritesArray.splice(r,1),createElement(favoritesArray),setStorage(favoritesArray)},createImg=(e,t)=>{const r=document.createElement("li");r.addEventListener("click",deleteItem),r.setAttribute("id",t),r.setAttribute("class","favorite__item");const a=document.createElement("div");return a.setAttribute("class","favorite__img"),a.style.backgroundImage=e,r.appendChild(a),r},createElement=e=>{favoriteList.innerHTML="";for(let t=0;t<e.length;t++){const r=createImg(e[t].image,e[t].id),a=createTitle(e[t].title,"h3","favorite__title"),s=document.createElement("i");s.setAttribute("class","trash__icon fas fa-trash-alt"),r.appendChild(a),r.appendChild(s),favoriteList.appendChild(r)}},setStorage=e=>{localStorage.removeItem("favorite"),localStorage.setItem("favorite",JSON.stringify(e))},getStorage=()=>JSON.parse(localStorage.getItem("favorite")),compareFavorite=e=>{return favoritesArray.findIndex(t=>t.id===e)},checkFavorite=(e,t)=>{compareFavorite(e)>=0&&t.classList.add("favorite__show")};function storageOrNot(){const e=getStorage();null!==e&&(favoritesArray.push(...e),createElement(e))}function selectFavorite(e){const t=e.currentTarget;t.classList.toggle("favorite__show");const r=t.querySelector("h2").innerHTML,a=t.querySelector("div").style.backgroundImage,s=parseInt(t.getAttribute("id"));if(0===favoritesArray.length)favoritesArray.push({id:s,title:r,image:a});else{const e=compareFavorite(s);-1===e?favoritesArray.push({id:s,title:r,image:a}):favoritesArray.splice(e,1)}createElement(favoritesArray),setStorage(favoritesArray)}window.addEventListener("load",storageOrNot);