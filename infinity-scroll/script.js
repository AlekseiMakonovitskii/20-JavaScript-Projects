const imageContainer = document.querySelector('#img-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
let count = 5;
const apiKey = 'bjSwkU0ZIHEFi6DzuGMTRC2CGT2ppPHzN5G0DJs1gyg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imgaeLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
		count = 30;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotoes() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach(photo => {
    // create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description,
    });
    // event listener, check whe each is finished loading
    img.addEventListener('load', imgaeLoaded);

    // Put <img> inside <a>, the put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photoes from unsplash API
async function getPhotoes() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotoes();
  } catch (error) {
    console.log(error);
  }
}

// check to see if scrolling near bottom of page. load more photoes
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotoes();
  }
});

// on load
getPhotoes();
