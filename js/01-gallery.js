import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

const createMarkupGallery = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`
  )
  .join("");

galleryContainer.insertAdjacentHTML("afterbegin", createMarkupGallery);
galleryContainer.addEventListener("click", outputEnlargedImage);

function outputEnlargedImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const selectedImg = event.target.dataset.source;
  console.log(selectedImg);

  const modalWindow = basicLightbox.create(
    `
		<img width="1400" height="900" src="${selectedImg}">
	`
  );
  modalWindow.show();

  const handleClickModalWindow = (event) => {
    event.preventDefault();
    if (event.code === "Escape") {
      modalWindow.close();
      console.log("Escape pressed");
      document.removeEventListener("keydown", handleClickModalWindow);
    }
  };

  document.addEventListener("keydown", handleClickModalWindow);
}

console.log(galleryItems);
