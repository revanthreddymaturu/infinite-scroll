const imageContainer=document.querySelector(".img-container");
const loader=document.querySelector(".loader");

let photosArray=[];
let ready=false;
let imagesLoaded=0;
 
const apiKey="RqLmlFJ4WuaeRjZ5E94TwmIAsPOy1QMmLaYOqbbkO9g";
// const proxyUrl="https://cors-anywhere.herokuapp.com/";
const count=10;
let totalImages=count;

const url=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhoto(){
    try{
        const response=await fetch(url);
        photosArray=await response.json();

        displayPhotos(photosArray);

    }
    catch(error){
        console.log("Error:"+error);
    }
    
}

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {
        loader.hidden=true;
        ready=true;
        imagesLoaded=0;
    }
}

function displayPhotos(photosArray){
    photosArray.forEach(photo => {
        const linkElement=document.createElement('a');
        linkElement.setAttribute('href',photo.links.html);
        linkElement.setAttribute('target',"_blank");
        const imageElement=document.createElement('img');
        imageElement.setAttribute('src',photo.urls.regular);
        imageElement.setAttribute('alt',photo.alt_description);
        imageElement.setAttribute('title',photo.alt_description);
        imageElement.addEventListener('load',imageLoaded());
        imageElement.classList.add("image-main");
        linkElement.appendChild(imageElement);
        imageContainer.appendChild(linkElement);
    });

}

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-window.innerHeight && ready){
        ready=false;
        getPhoto();
    }
})
getPhoto();
