// load data 
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
};
const displayData = data => {
    const newsSection = document.getElementById('news_section');
    data.news_category.forEach(news => {
        const { category_id, category_name } = news;
        const div = document.createElement('div');
        div.innerHTML = `<a href="#" class="nav-link" onclick="loadDataNews('${category_id}','${category_name}')">${category_name}</a>`;
        newsSection.appendChild(div);
    });
}
loadData();
// load data news
const loadDataNews = async (id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    fetchData = data.data;
    displayALLnews(data.data, name);
}
// display all news
const displayALLnews = (data, name) => {
    const alert = document.getElementById('alert_section');
    document.getElementById('category_number').innerText = `${data.length}`;
    document.getElementById('category_name').innerText = `${name}`;
    const cardSection = document.getElementById("card_section");
    cardSection.innerHTML = "";
    data.forEach(news => {
        const { image_url, details, title, total_view, author, rating, _id } = news;
        const { name, published_date, img } = author;
        const { number } = rating;
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card mb-3 container border-0 p-0 ">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)}...</p>
                    <p class="card-text">${details.slice(200, 250)}...</p>
                </div>

                <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
                    <div class="d-flex gap-2">
                        <div class="" style="width:50px">
                            <img src="${img}" class="img-fluid rounded-circle border" alt="">
                        </div>
                        <div class="d-flex flex-column">
                            <span>${name}</span>
                            <span>${published_date ? published_date : "2022-08-24"}</span>
                        </div>
                    </div>

                    <div>
                        <i class="fa-solid fa-eye"></i><span> ${total_view?total_view:544}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <small class="text-gray"> ${number}</small>
                    </div>
                    <div>
                        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick=loadOneNewsDetails('${_id}')  class="border-0 bg-body text-primary"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        cardSection.appendChild(card);
    });
};
// show rating
// const showRating = (number) => {
//     number.forEach(num => {
//         console.log(num);
//     })
// }

const displayTending = () => {
    const tendingData = fetchData.filter(news => news.others_info.is_trending === true);
    const name = document.getElementById('category_name').innerText;
    console.log();
    displayALLnews(tendingData, name);
}
const displayTodayPack = () => {
    const todayPick = fetchData.filter(news => news.others_info.is_todays_pick === true);
    const name = document.getElementById('category_name').innerText;
    displayALLnews(todayPick, name);
}
// load one news
const loadOneNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayOneNewDetails(data.data[0]);
}
// show one news
const displayOneNewDetails = (news) => {
    const modalSection = document.getElementById('modal_section');
    const { image_url, details, title, total_view, author, rating, _id } = news;
    const { name, published_date, img } = author;
    const { number } = rating;
    modalSection.innerHTML = `
    <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
    </div>
    <div class="modal-body">
    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
    <p class="card-text">${details}...</p>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2">
            <div class="" style="width:50px">
                <img src="${img}" class="img-fluid rounded-circle border" alt="">
            </div>
            <div class="d-flex flex-column">
                <span>${name}</span>
                <span>${published_date ? published_date : "2022-08-24"}</span>
            </div>
        </div>

        <div>
            <i class="fa-solid fa-eye"></i><span> ${total_view?total_view:544}</span>
        </div>
        <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <small class="text-gray"> ${number}</small>
        </div>
        
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
    `

}