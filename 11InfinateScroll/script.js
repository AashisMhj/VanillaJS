const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts(){
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

//function to show post in dom
async function showPosts(){
    const posts = await getPosts();
    posts.forEach(post =>{
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postEl);
    })
}
//function for showing loading
function showLoading(){
    loading.classList.add('show');
    setTimeout(()=>{
        // console.log('removed');
        loading.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPosts();
        },400)
    },1000);
}
//
function filterPost(event){
    const term = event.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if(title.indexOf(term) >-1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
    })
}
showPosts();
//event listners
filter.addEventListener('input',filterPost);
window.addEventListener('scroll',()=>{
    //will get the scrolling position
    // console.log(document.documentElement.scrollHeight);
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight){
        // console.log('bottom');
        showLoading();
    }
})