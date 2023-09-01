const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const trimData = data?.data;
    handleBtnCreate(trimData);
    // handleBtn();

    console.log(data.data);


   
    

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

//HANDLE BUTTON FUNCTION
const handleBtn = async (cards) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cards}`);
    const data = await response.json();
    console.log(data.data);
    console.log("clickId", cards);

    const detailsCardContainer = document.getElementById('details-card-cotainer');

    //functionality for NO CONTENT IN DRAWING BTN
    console.log("Length: ",data.data.length);
    if(data.data.length === 0)
    {
        document.getElementById('drawing-container').classList.remove('hidden');
    }
    else 
    {
        document.getElementById('drawing-container').classList.add('hidden');
    }
    
    //reload all section 
    detailsCardContainer.innerHTML = '';

    data?.data.forEach(card => {
        const div = document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl mb-8`;
        div.innerHTML = ` 
        <figure><img class="w-full h-[200px]" src="${card?.thumbnail? card.thumbnail: "Image is not available"}" alt="Shoes" /></figure>
            <div class="card-body">
              <div class="flex flex-row gap-4">
               <img src="${card?.authors[0]?.profile_picture}" class="rounded-[50%] w-[40px] h-[40px] object-cover"> 
               <div>
                  <h3 class="text-xl font-bold">${card?.title}</h3>
                   <div class="my-4">
                   <p>${card?.authors[0]?.profile_name
                   } <span>${card?.authors[0]?.verified? `<img class="inline pl-2 text-red-600 text-sm" src="icons8-check (1).svg">`: `` 
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
const goToMYBlog = () =>
{
    window.open("myblog.html");
}



loadData();
// handleEmtyContent("1005");
handleBtn("1000");


