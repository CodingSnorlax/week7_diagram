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
        drawChart();
    });

// 篩選地區，並累加數字上去
// totalObj 會變成 {高雄: 1, 台北: 1, 台中: 1}

let totalObj = {};

function getTotalObject() {

    people.forEach(function (item, index) {
        if (totalObj[item.area] == undefined) {
            totalObj[item.area] = 1;
        } else {
            totalObj[item.area] += 1;
        }
    })
}

// newData = [["高雄", 1], ["台北",1], ["台中", 1]]
let newData = [];

function getNewData() {
    getTotalObject();
    // 宣告 area 變數，用來儲存 Object.keys(totalObj) 的值
    let area = Object.keys(totalObj);

    // area output ["高雄","台北","台中"]
    area.forEach(function (item, index) {
        let ary = [];
        ary.push(item);
        ary.push(totalObj[item]);
        newData.push(ary);
    })

}

function drawChart() {

    getNewData();
    // 將 newData 丟入 c3 產生器
    const chart = c3.generate({
        bindto: "#chart",
        data: {
            columns: newData,
            type: 'donut',
        },
        donut: {
            title: "地區"
        }
    });

}


