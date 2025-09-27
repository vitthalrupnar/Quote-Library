let allQuote = []
let container = document.querySelector(".container");
let pagination = document.querySelector('.pagination');

let currentPage = 1;
let limit = 10;
let totalItems = 100;
let totalPage = Math.floor(totalItems/limit);
console.log(totalPage);

let fetchData = async (page) => {
    try{
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
        const res = await api.json();
        renderItems(res);
        renderPagination(res);
    }
    catch(error){
        console.log("Something went wrong");
    }
}

fetchData()


function renderItems(items){
    container.innerHTML = items.map((i)=>{
        return `
            <div class="content-container">
                <div class="content"> 
                    <div class="title">${i.title} </div>
                    <div>${i.body}</div>
                </div>
                <div class="conent-img-container">
                    <img class="content-img" src="./top-view-flowers-with-copy-space__2_-removebg-preview.png" alt="">
                </div>
            </div>
        `
    }).join("")
}


function renderPagination(a){
    pagination.innerHTML="";

//!Previous Buttons
    const prevBtn=document.createElement("button")
    prevBtn.textContent="Previous";
    prevBtn.setAttribute("id", "prevBtn")
    prevBtn.disabled = currentPage===1;
    prevBtn.onclick=()=>{
        currentPage--;
        fetchData(currentPage);
    }
    pagination.appendChild(prevBtn)

//!Count Buttons
    for(let i=1; i<=totalPage; i++)
    {
        let countBtn = document.createElement("button");
        countBtn.setAttribute("id", "countBtn")
        countBtn.textContent=i;

        if(i == currentPage){
            countBtn.classList.add("active")
        }
        countBtn.onclick=()=>{
            currentPage=i;
            fetchData(currentPage)
        }
        pagination.appendChild(countBtn)
    }


    //!next Button
    const nextBtn = document.createElement("button")
    nextBtn.textContent="Next"
    nextBtn.setAttribute("id", "nextBtn")
    nextBtn.disabled = currentPage === totalPage;
    nextBtn.onclick=()=>{
        currentPage++;
        fetchData(currentPage);
    }
    pagination.appendChild(nextBtn)
}

fetchData(currentPage)