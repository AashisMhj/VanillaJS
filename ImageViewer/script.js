const chooseFile = document.getElementById("img-file");
const imgPreview = document.getElementById("img-preview");

chooseFile.addEventListener("change", function(){
    getImage();
});

function getImage(){
    const files = chooseFile.files[0];
    if(files){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function(){
            console.log(this);
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="'+this.result+'"/>';
        })
    }
}