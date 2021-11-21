let people = [
    {
        area: "高雄",
        name: "小明"
    },
    {
        area: "高雄",
        name: "小天"
    },
    {
        area: "台中",
        name: "小華"
    },
    {
        area: "台北",
        name: "小華"
    }
]

// 覆蓋原本 people 陣列內的資料   
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    .then(function (response) {
        people = response.data;
        // console.log(people)
        render();
        // drawChart();
    });

const ticketCardArea = document.querySelector('.ticketCard-area');

function render() {

    let eachCardInfo = ''

    people.forEach(function (item) {
        // console.log(item.area)
        eachCardInfo += `
            <li class="ticketCard">
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
    })

    ticketCardArea.innerHTML = eachCardInfo;

    // 套票筆數
    const ticketAmount = document.getElementById('searchResult-text');
    ticketAmount.textContent = `本次搜尋共 ${people.length} 筆資料`

    // drawChart();
}

//  新增套票按鈕上 綁定監聽事件 
const addTicketBtn = document.querySelector('.addTicket-btn');
addTicketBtn.addEventListener('click', addCard)

const ticketName = document.getElementById('ticketName');
const ticketImgUrl = document.getElementById('ticketImgUrl');
const ticketRegion = document.getElementById('ticketRegion');
const ticketPrice = document.getElementById('ticketPrice');
const ticketNum = document.getElementById('ticketNum');
const ticketRate = document.getElementById('ticketRate');
const ticketDescription = document.getElementById('ticketDescription');

function addCard() {

    people.push({
        "id": Date.now(),
        "name": ticketName.value,
        "imgUrl": ticketImgUrl.value,
        "area": ticketRegion.value,
        "price": ticketPrice.value,
        "group": ticketNum.value,
        "rate": ticketRate.value,
        "description": ticketDescription.value
    })

    const wholeTicketForm = document.querySelector('.addTicket-form');
    wholeTicketForm.reset();

    render();
    getTotalObject();
    // drawChart();
}



// 篩選地區，並累加數字上去
// totalObj 會變成 {高雄: 1, 台北: 1, 台中: 1}

let totalObj = {};

function getTotalObject() {

    people.forEach(function (item, index) {
        console.log(item)
        if (totalObj[item.area] == undefined) {
            totalObj[item.area] = 1;
        } else {
            totalObj[item.area] += 1;
        }
    })

    getNewData();
}

// newData = [["高雄", 1], ["台北",1], ["台中", 1]]
let newData = [];

function getNewData() {
    // getTotalObject();
    // 宣告 area 變數，用來儲存 Object.keys(totalObj) 的值
    let area = Object.keys(totalObj);

    // area output ["高雄","台北","台中"]
    area.forEach(function (item, index) {
        let ary = [];
        ary.push(item);
        ary.push(totalObj[item]);
        newData.push(ary);
    })
    drawChart()
}

function drawChart() {

    // getNewData();
    // 將 newData 丟入 c3 產生器
    const chart = c3.generate({
        bindto: "#chart",
        data: {
            columns: newData,
            type: 'donut',
            colors: {
                "高雄": '#E68619',
                "台北": '#26BFC7',
                "台中": '#5151D3'
            },
        },
        donut: {
            title: "套票地區比重"
        },


    });

}
