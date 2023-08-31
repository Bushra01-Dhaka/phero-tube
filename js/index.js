const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const trimData = data.data;
    handleBtnCreate(trimData);
    handleBtn();

}

const handleBtnCreate = (cards) => {
    console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // 4 tabs are created (ALL, MUSIC, COMEDY, DRAWING)
    const div = document.createElement('div');
    div.classList = `flex flex-row justify-center items-center gap-4`;
    div.innerHTML = ` 
    <button class="btn bg-red-600 text-white hover:border-2px hover:bg-white hover:border-red-600 hover:text-black">All</button>
            <button class="btn bg-slate-200 hover:border-2px hover:bg-white hover:border-red-600 ">Music</button>
            <button class="btn bg-slate-200 hover:border-2px hover:bg-white hover:border-red-600">Comedy</button>
            <button class="btn bg-slate-200 hover:border-2px hover:bg-white hover:border-red-600">Drawing</button>
            
    `;
    cardContainer.appendChild(div);



}

const handleBtn = async (cards) => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await response.json();
    console.log(data.data);

    const detailsCardContainer = document.getElementById('details-card-cotainer');
    detailsCardContainer.innerHTML = '';

    data?.data?.forEach(card => {
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
                   }<span><i id="card-check-list" class=" pl-2 fa-solid fa-circle-check text-red-600"></i></span>
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

loadData();