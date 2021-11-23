let localData = []

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    .then(function (response) {
        localData = response.data;
        // console.log(localData)
        drawDiagram();
    });

const ticketCardArea = document.querySelector('.ticketCard-area');

const render = () => {

    let ticketCardContent = '';

    localData.forEach(function (item) {
        ticketCardContent += `<li class="ticketCard">
                <div class="ticketCard-img">
                  <a href="#">
                    <img src="${item.imgUrl}" alt="">
                  </a>
                  <div class="ticketCard-region">${item.area}</div>
                  <div class="ticketCard-rank">${item.rate}</div>
                </div>
                <div class="ticketCard-content">
                  <div>
                    <h3>
                      <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                      ${item.description}
                    </p>
                  </div>
                  <div class="ticketCard-info">
                    <p class="ticketCard-num">
                      <span><i class="fas fa-exclamation-circle"></i></span>
                      剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                      TWD <span id="ticketCard-price">$${item.price}</span>
                    </p>
                  </div>
                </div>
              </li>`
        ticketCardArea.innerHTML = ticketCardContent;

        const searchResult = document.querySelector('#searchResult-text');
        let result = `本次搜尋共 ${localData.length} 筆資料`;
        searchResult.textContent = result;

    })
}

// 增加票卡按鈕
const addTicketBtn = document.querySelector('.addTicket-btn');

// 整個表單的 div
const wholeForm = document.querySelector('.addTicket-form');

// 表單內各個欄位
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');

const addCard = () => {

    localData.push({
        "id": Date.now(),
        "name": ticketName.value,
        "imgUrl": ticketImgUrl.value,
        "area": ticketRegion.value,
        "price": ticketPrice.value,
        "group": ticketNum.value,
        "rate": ticketRate.value,
        "description": ticketDescription.value
    })

    wholeForm.reset();
    drawDiagram();
    // render();

}
addTicketBtn.addEventListener('click', addCard);


function drawDiagram() {

    let totalAreaObject = {}

    localData.forEach(function (item) {

        if (totalAreaObject[item['area']] === undefined) {

            totalAreaObject[item['area']] = 1;

        // } else if (totalAreaObject[item['area']] === item['area']) {
            
        } else {

            totalAreaObject[item['area']] += 1;
        }

    })
    console.log(totalAreaObject)

    const newAreaArray = Object.keys(totalAreaObject);  // ['台北', '台中', '高雄']

    let newData = []
    newAreaArray.forEach(function (item) {
        let newObj = []
        newObj.push(item);
        newObj.push(totalAreaObject[item]);
        newData.push(newObj);
    })

    console.log(newData)

    // donut 圖
    var chart = c3.generate({
        bindto: '#areaDonut',
        data: {
            columns: newData,
            type: 'donut',
        },
        donut: {
            title: "套票地區比重"
        }
    });

    render();
}


