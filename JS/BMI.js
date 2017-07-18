// 1.觸發按鈕後，取得頁面的值（記得檢查是否為數字）
// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
// 3.將結果存入到localstorage中（包含身高體重）
// 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
// 5.顯示localstorage的結果至content

// BMI < 18.5 過輕
// BMI <24 正常
// BMI <27 過重
// BMI <30 輕度肥胖
// BMI <35 中度肥胖
// BMI >35 重度肥胖
var BMI = {
    bmiResult:[],
    status:[],
    className:[],
    height:[],
    weight:[],
    date:[],
};


// 5.顯示localstorage的結果至content
if(localStorage.getItem('BMI') !== null){
    window.addEventListener('load', getLocalStorage, false);
}

// 1.觸發按鈕後，取得頁面的值（記得檢查是否為數字）
var btnclick = document.querySelector('.btn');
btnclick.addEventListener('click', main, false);

function main() {
    var height = parseFloat(document.querySelector('.height').value);
    var weight = parseFloat(document.querySelector('.weight').value);
    if(isNaN(height) || isNaN(weight)){
        return;
    }
    var bmiResult = bmiCalculator(height/100, weight);
    bmiResult = bmiResult.toFixed(2);
    // 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
    var className = btnResult(bmiResult);

    document.querySelector('.height').value = '';
    document.querySelector('.weight').value = '';

    // 5.顯示localstorage的結果至content
    getLocalStorage()
}

// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
function bmiCalculator(height, weight) {
    var count = weight/(height*height);
    BMI.height.push(height);
    BMI.weight.push(weight);
    return count;
}

// 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
function btnResult(bmiResult) {
    var className = '';
    var resultText = '';

    if( bmiResult < 18.5){
        className = 'green';
        resultText = '過輕';
        createHTML(bmiResult, className, resultText);
    }
    if( 18.5 <= bmiResult && bmiResult < 24){
        className = 'blue';
        resultText = '正常';
        createHTML(bmiResult, className, resultText);
    }
    if( 24 <= bmiResult && bmiResult < 27){
        className = 'orange';
        resultText = '過重';
        createHTML(bmiResult, className, resultText);
    }
    if( 27 <= bmiResult && bmiResult < 30){
        className = 'dark-orange';
        resultText = '輕度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    if( 30 <= bmiResult && bmiResult < 35){
        className = 'light-red';
        resultText = '中度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    if(bmiResult >= 35){
        className = 'red';
        resultText = '重度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    var restartImg = document.querySelector('.restartimg');
    restartImg.addEventListener('click', function(){btnRestart(className)}, false);

    // 3.將結果存入到localstorage中（包含身高體重）
    setLocalStorage(bmiResult, resultText, className);

    return className;
}

function createHTML(bmiResult, className, resultText) {
    var btnResultStr = '';
    var btnResult = document.querySelector('.result');

    btnResultStr +=
        '<div class="'+className+'">'+
        '<span class="text1">'+bmiResult+'</span>'+
        '<span class="text2">BMI</span>'+
        '<div class="restartimg"></div>'+
        '<div class="result-text">'+resultText+'</div>'+
        '</div>';
    btnResult.innerHTML = btnResultStr;

    // 調整css樣式
    document.querySelector('.btn').style.display = "none";
    document.querySelector('.'+className+'').style.visibility = "visible";
}

function btnRestart(className) {
    // 調整css樣式
    document.querySelector('.btn').style.display = "inline-block";
    document.querySelector('.'+className+'').style.visibility = "hidden";
}

function setLocalStorage(bmiResult, resultText, className) {
    //取得今日日期
    var date = getNowDate();
    BMI.bmiResult.push(bmiResult);
    BMI.status.push(resultText);
    BMI.className.push(className);
    BMI.date.push(date);

    // 將字串化的值存入localStorage
    localStorage.setItem("BMI", JSON.stringify(BMI));

}

function getLocalStorage() {
    var BMI_Str = '';
    var BMIData = localStorage.getItem('BMI');
    var BMI = JSON.parse(BMIData);
    var mytable = document.querySelector('table');

    for(var i=0; i<BMI.bmiResult.length; i++){
        BMI_Str +=
            '<tr>'+
            '<td class="text-group0 '+BMI.className[i]+'">'+BMI.status[i]+'</td>'+
            '<td class="text-group1"><span class="text-span">BMI</span>'+BMI.bmiResult[i]+'</td>'+
            '<td class="text-group1"><span class="text-span">weight</span>'+BMI.weight[i]+'KG</td>'+
            '<td class="text-group1"><span class="text-span">height</span>'+BMI.height[i]+'cm</td>'+
            '<td class="text-group2">'+BMI.date[i]+'</td>'+
            '</tr>';
    }
    mytable.innerHTML = BMI_Str;
}

function getNowDate(){
    var Today = new Date();
    var Year = Today.getFullYear();
    var Month = (((Today.getMonth()+1) <10) ? "0" : "") + (Today.getMonth()+1);
    var Day = Today.getDate() ;

    Today = Month + '-' + Day + '-' + Year;
    return Today;
}
