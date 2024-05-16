export const createImagesMarkup = images => {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
                <a href="${largeImageURL}" >
                    <img src="${webformatURL}" alt="${tags}" class="gallery-img" />
                </a>
                <div class="details">
        <div class="detail-row">
            <p>Likes:</p>
            <span>${likes}</span>
        </div>
        <div class="detail-row">
            <p>Views:</p>
            <span>${views}</span>
        </div>
        <div class="detail-row">
            <p>Comments:</p>
            <span>${comments}</span>
        </div>
        <div class="detail-row">
            <p>Downloads:</p>
            <span>${downloads}</span>
        </div>
    </div>
            </li>
        `
    )
    .join('');
};