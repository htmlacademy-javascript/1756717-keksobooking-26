const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotoElement = document.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewAvatarElement.src = URL.createObjectURL(file);
  }
});

const createPreviewImg = (file) => {
  const previewImgElement = document.createElement('img');
  previewImgElement.src = URL.createObjectURL(file);
  previewImgElement.alt = 'Фотография жилья';
  previewImgElement.style.width = '100%';
  previewImgElement.style.height = '100%';
  previewImgElement.style.objectFit = 'cover';
  previewPhotoElement.append(previewImgElement);
};

const removePreviewImg = () => {
  if (previewPhotoElement.children.length > 0) {
    previewPhotoElement.children[0].remove();
  }
};

photoChooserElement.addEventListener('change', () => {
  removePreviewImg();
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    createPreviewImg(file);
  }
});

export { previewPhotoElement, previewAvatarElement };

