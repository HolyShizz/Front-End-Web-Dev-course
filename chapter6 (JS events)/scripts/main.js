var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';


function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    })
};

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailsArray = [].slice.call(thumbnails);
    return thumbnailsArray;
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();


/*Gold Challenge
Write a function that changes the [data-image-url] of a random thumbnail so 
that detail image no longer matches the thumbnail*/

//Function for changing of data-image-url in random thumbnail 

THUMBNAIL_LINK_SELECTOR_ALL = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);

function addRandomThumbnailImgSrc() {
    var max = THUMBNAIL_LINK_SELECTOR_ALL.length;
    var random = Math.floor(Math.random() * Math.floor(max));
    THUMBNAIL_LINK_SELECTOR_ALL[random].setAttribute('data-image-url', './img/tacocat_art.png');
}


/* Gold Challenge
For an extra challenge, write a function that resets your thumbnails to their orirginal state*/

//Function for reseting all data-image-url attribute values 
var THUMBNAIL_LINK_SELECTOR_Array = getThumbnailsNodeList();
var THUMBNAIL_LINK_SELECTOR_Array_original = new Array;

function getThumbnailsNodeList() {
    'use strict';;
    var thumbnailsArray = [].slice.call(THUMBNAIL_LINK_SELECTOR_ALL);
    return thumbnailsArray;
}

function createThumbSrcArray(array) {
    'use strict';
    array.forEach( function(a) {
        var imgListSrc = a.getAttribute('data-image-url');
        THUMBNAIL_LINK_SELECTOR_Array_original.push(imgListSrc)
    })
}


function resetImgSrcList() {
    for (var i=0; i<THUMBNAIL_LINK_SELECTOR_ALL.length; i++ ) {
        THUMBNAIL_LINK_SELECTOR_Array[i].setAttribute('data-image-url', THUMBNAIL_LINK_SELECTOR_Array_original[i]);
    }
}

//Adding mix-button event handler
function addMixClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        addRandomThumbnailImgSrc();
    })
};

//Adding reset-button event handler
function addResetClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        resetImgSrcList();
    })
};

//Initializing handlers for buttons
function initializeButtons() {
    'use strict';
    createThumbSrcArray(THUMBNAIL_LINK_SELECTOR_Array);
    var thumbnailsReset = document.querySelector('[data-button-reset]');
    addResetClickHandler(thumbnailsReset);
    var thumbnailsRandom = document.querySelector('[data-button-random]');
    addMixClickHandler(thumbnailsRandom);
}

initializeButtons();