let selectedCategory = null;
let time = 0;
const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const trimData = data?.data;
    handleBtnCreate(trimData);
    headerCreate(trimData);
    // handleBtn();

    console.log(data.data);

}

// HEADER NAV BAR 

const headerCreate = async (cc) =>
{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const trimData = data?.data;

    const navConainer = document.getElementById('header-id');
    navConainer.innerHTML = '';

    
        const div = document.createElement('div');
        div.innerHTML = ` 
        <div class="navbar bg-base-100">
        <div class="navbar-start">
            <a href="index.html"><img class="pr-4" src="./Logo.png" alt=""></a>
        </div>
        <div  class="navbar-center">
            <button onclick="sortCardsByViews();" class="btn text-red-600 hover:border-red-600 hover:border-2x hover:bg-white">Sort by
                view</button>
        </div>
        <div class="navbar-end">
            <a onclick="goToMYBlog()"
                class="btn btn-md bg-red-600 text-white hover:border-2px hover:bg-white hover:border-red-600 hover:text-black">Blog</a>
        </div>
    </div>
    <hr class="my-4">
        
        `;

   

    navConainer.appendChild(div);
}



//4 TABS ARE CREATED DYNAMICALLY
const handleBtnCreate = async (cards) => {
    console.log(cards);
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const trimData = data?.data;


    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // 4 tabs are created (ALL, MUSIC, COMEDY, DRAWING) 

    cards?.forEach((card) => {
        const div = document.createElement('div');
        div.innerHTML = ` 
      <a onclick = " handleBtn('${card.category_id}')" class="btn bg-red-600 text-white hover:border-2px hover:bg-white hover:border-red-600 hover:text-black">${card?.category}</a>
        `;

        cardContainer.appendChild(div);

    });

}


// convert second into hours and minutes
const convertTime = (s) => {

    const totalSecond = s;
    console.log(typeof s);
    const hours = parseInt(totalSecond / 3600);
    const remainingSecond = s % 3600;
    const minutes = parseInt(remainingSecond / 60);


    //    time =  console.log(`${hours}hrs ${minutes} min ago`);
    if (hours === 0 && minutes === 0) {
        time = ``;
    }
    else {
        time = `${hours}hrs ${minutes} min ago`;
    }

    console.log(time);



}


function convertViewsToNumber(views) {
    const numericPart = parseFloat(views.slice(0, -1));
    return numericPart;
}



// .............


const sortCardsByViews = async () => {
    if (selectedCategory) {

        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${selectedCategory}`);
        const data = await response.json();

        // Sort the cards based on the "views" property in descending order
        data.data.sort((a, b) => convertViewsToNumber(b.others.views) - convertViewsToNumber(a.others.views));
        // handleBtn(data.data.sort);
        console.log("lol", data.data.sort);

        const detailsCardContainer = document.getElementById('details-card-cotainer');

        // ...................

        //functionality for NO CONTENT IN DRAWING BTN
        console.log("Length: ", data.data.length);
        if (data.data.length === 0) {
            document.getElementById('drawing-container').classList.remove('hidden');
        }
        else {
            document.getElementById('drawing-container').classList.add('hidden');
        }

        //reload all section 
        detailsCardContainer.innerHTML = '';

        data?.data.forEach(card => {
            const div = document.createElement('div');

            // ...................


            // call function for CONVERTING TIME
            convertTime(card?.others?.posted_date ? card?.others?.posted_date : 0);

            div.classList = `card bg-base-100 shadow-xl mb-8 `;
            div.innerHTML = ` 
        <figure><img class="w-full h-[200px]" src="${card?.thumbnail ? card.thumbnail : "Image is not available"}" alt="Shoes" /></figure>

        
        <p class= "absolute right-4 bottom-[52%] bg-opacity-25% my-2  bg-slate-900 text-white text-sm w-[50%] text-center rounded">${time}</p>
        


            <div class="card-body">
              <div class="flex flex-row gap-4">
               <img src="${card?.authors[0]?.profile_picture}" class="rounded-[50%] w-[40px] h-[40px] object-cover"> 
               <div>
                  <h3 class="text-xl font-bold">${card?.title}</h3>
                   <div class="my-4">
                   <p>${card?.authors[0]?.profile_name
                } <span>${card?.authors[0]?.verified ? `<img class="inline pl-2 text-red-600 text-sm" src="icons8-check (1).svg">` : ``
                }</span>
                   </p>
                   <p class="mt-4">${card?.others?.views} views</p>   
                   
                   </div>
               </div>
              </div>  

            </div>
        
        ` ;
            detailsCardContainer.appendChild(div);
        });

    }

    else {
        console.log("Please select a category first.");
    }
}








//HANDLE BUTTON FUNCTION
const handleBtn = async (cards) => {
    selectedCategory = cards;     // Update korlam selected category
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cards}`);
    const data = await response.json();
    console.log("handlebtn", data.data);
    console.log("clickId", cards);



    const detailsCardContainer = document.getElementById('details-card-cotainer');

    // ...................



    //functionality for NO CONTENT IN DRAWING BTN
    console.log("Length: ", data.data.length);
    if (data.data.length === 0) {
        document.getElementById('drawing-container').classList.remove('hidden');
    }
    else {
        document.getElementById('drawing-container').classList.add('hidden');
    }

    //reload all section 
    detailsCardContainer.innerHTML = '';

    data?.data.forEach(card => {
        const div = document.createElement('div');

        // ...................


        // call function for CONVERTING TIME
        convertTime(card?.others?.posted_date ? card?.others?.posted_date : 0);

        div.classList = `card bg-base-100 shadow-xl mb-8 `;
        div.innerHTML = ` 
        <figure><img class="w-full h-[200px]" src="${card?.thumbnail ? card.thumbnail : "Image is not available"}" alt="Shoes" /></figure>

        
        <p class= "absolute right-4 bottom-[52%] bg-opacity-25% my-2  bg-slate-900 text-white text-sm w-[50%] text-center rounded">${time}</p>
        


            <div class="card-body">
              <div class="flex flex-row gap-4">
               <img src="${card?.authors[0]?.profile_picture}" class="rounded-[50%] w-[40px] h-[40px] object-cover"> 
               <div>
                  <h3 class="text-xl font-bold">${card?.title}</h3>
                   <div class="my-4">
                   <p>${card?.authors[0]?.profile_name
            } <span>${card?.authors[0]?.verified ? `<img class="inline pl-2 text-red-600 text-sm" src="icons8-check (1).svg">` : ``
            }</span>
                   </p>
                   <p class="mt-4">${card?.others?.views} views</p>   
                   
                   </div>
               </div>
              </div>  

            </div>
        
        ` ;
        detailsCardContainer.appendChild(div);
    })


}



// GOTO MYBLOG HTML PAGE AFTER CLICKING BTN BLOG
const goToMYBlog = () => {
    window.open("myblog.html");
}



loadData();
handleBtn("1000");


