const image = document.getElementById('image');
const blurOption = document.getElementById('blur');
const blurRange = document.getElementById('blurRange');
const blurValue = 0;
const brightnessOption = document.getElementById('brightness');
const brightnessRange = document.getElementById('brightnessRange');
const brightnessValue = 0;

const grayScaleRange = document.getElementById('grayScaleRange');

const invertRange = document.getElementById('invertRange');

const sepiaRange = document.getElementById('sepiaRange');

const downloadButton = document.getElementById('download-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

blurRange.addEventListener('input', (event)=>{
    let newBlur = event.target.value;
    image.style.filter = image.style.filter.replace(/blur\(\d+px\)/, `blur(${newBlur}px)`);
});

brightnessRange.addEventListener('input', (event)=>{
    let newBrightnessValue = event.target.value;
    image.style.filter = image.style.filter.replace(/brightness\(\d+%\)/, `brightness(${newBrightnessValue}%)`);
});

sepiaRange.addEventListener('input', (event) =>{
    let newSepia = event.target.value;
    image.style.filter = image.style.filter.replace(/sepia\(\d+%\)/, `sepia(${newSepia}%)`);
})

invertRange.addEventListener('input', (event) =>{
    let newInvert = event.target.value;
    image.style.filter = image.style.filter.replace(/invert\(\d+%\)/, `invert(${newInvert}%)`);
})

grayScaleRange.addEventListener('input', (event) =>{
    let newGrayScale = event.target.value;
    image.style.filter = image.style.filter.replace(/grayscale\(\d+%\)/, `grayscale(${newGrayScale}%)`);
});

downloadButton.addEventListener('click', (event) =>{
    canvas.height = image.height;
    canvas.width = image.width;
    ctx.filter = image.style.filter;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image-name.jpg';
    link.click();
})

