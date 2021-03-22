export default class Carousel {
    constructor(el, axiosUrl) {
        this.el = el;
        this.axiosImgs(axiosUrl);
        this.galleryImg = this.el.querySelector('.gallery__image__img');
        this.galleryPrev = this.el.querySelector('.gallery__image__btns__item--prev');
        this.galleryNext = this.el.querySelector('.gallery__image__btns__item--next');
        this.galleryThumbs = this.el.querySelector('.gallery__thumbs');
        this.galleryPrev.addEventListener('click', () => {
            if(this.currImg > 0) this.changePhoto('prev');
        });
        this.galleryNext.addEventListener('click', () => {
            if(this.currImg < this.allThumbs.length-1) this.changePhoto('next');
        });
        window.addEventListener("resize", () => {
            if(this.numberOfThumbs != this.checkNumberOfThumbs(this.el)) this.setGallery();
        });
    }
    axiosImgs(jsonFile) {
        axios.get(jsonFile)
        .then(response => response.data)
        .then(json => this.renderGallery(json))
        .catch(err => console.log('Request failed: ', err));
    }
    renderGallery(galleryImgs) {
        const newGalleryImgs = galleryImgs.galleryImgs.filter(el => el.gallery == this.el.dataset.carousel);
        newGalleryImgs.forEach((el, i) => {
            const newThumb = document.createElement("a");
            newThumb.style.display = "none";
            newThumb.className = "gallery__thumbs__item";
            newThumb.style.backgroundImage = `url("${newGalleryImgs[i].thumb}")`;
            newThumb.dataset.bigimage = newGalleryImgs[i].src;
            newThumb.dataset.alt = newGalleryImgs[i].alt;
            const newThumbColor = document.createElement("span");
            newThumbColor.className = "gallery__thumbs__item__color";
            newThumb.appendChild(newThumbColor);
            this.galleryThumbs.appendChild(newThumb);
        });
        this.allThumbs = this.el.querySelectorAll('.gallery__thumbs__item');
        this.allThumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => {
                this.currImg = i;
                this.changePhoto();
            });
        });
        this.setGallery();
    }
    setGallery() {
        this.currImg = 0;
        this.numberOfThumbs = this.checkNumberOfThumbs();
        this.thumbsPositions = [0, this.numberOfThumbs-1];
        this.changePhoto();
    }
    checkNumberOfThumbs() {
        if(this.galleryImg.width > 760) return 7;
        else if(this.galleryImg.width > 660) return 6;
        else if(this.galleryImg.width > 540) return 5;
        else return 4;
    }
    changePhoto(action) {
        if(action === 'prev') this.currImg--;
        else if(action === 'next') this.currImg++;
        this.galleryImg.src = this.allThumbs[this.currImg].dataset.bigimage;
        this.galleryImg.alt = this.allThumbs[this.currImg].dataset.alt;
        this.changeArrows();
        this.changeThumbs();
    }
    changeArrows() {
        if(this.currImg > 0) this.galleryPrev.style.visibility = "visible";
        else this.galleryPrev.style.visibility = "hidden";
        if(this.currImg < this.allThumbs.length-1) this.galleryNext.style.visibility = "visible";
        else this.galleryNext.style.visibility = "hidden";
    }
    changeThumbs() {
        this.allThumbs.forEach((thumb, i) => {
            thumb.classList.remove('gallery__thumbs__item--curr');
            if(i === this.currImg) thumb.classList.add('gallery__thumbs__item--curr');
            if(this.currImg === this.thumbsPositions[1] && this.currImg != this.allThumbs.length - 1) this.thumbsPositions = this.thumbsPositions.map(val => ++val);
            if(this.currImg === this.thumbsPositions[0] && this.currImg != 0) this.thumbsPositions = this.thumbsPositions.map(val => --val);
            if(i >= this.thumbsPositions[0] && i <= this.thumbsPositions[1]) thumb.style.display = "block";
            else thumb.style.display = "none";
        });
    }
}