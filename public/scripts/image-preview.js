const imagePreviewContainerElement = document.getElementById(
  "image-preview-container"
);
const imageInputElement = document.querySelector("input#image");
const imagePreviewElement = document.getElementById("image-preview");

function imageFileChangeHandler() {
  const files = imageInputElement.files;

  if (!files || files.length === 0) {
    imagePreviewContainerElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewContainerElement.style.display = "block";
}

imageInputElement.addEventListener("change", imageFileChangeHandler);
