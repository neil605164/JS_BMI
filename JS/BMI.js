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
    getLocalStorage(className);
}

// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
function bmiCalculator(height, weight) {
    var count = weight/(height*height);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
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
    setLocalStorage(bmiResult, resultText);

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

function setLocalStorage(bmiResult, resultText) {
    localStorage.setItem("bmiResult", bmiResult);
    localStorage.setItem("status", resultText);
}

function getLocalStorage(className) {
    //取得今日日期
    var date = getNowDate();

    var mytable = document.querySelector('table');
    // 建立節點
    var mytr = document.createElement('tr');
    var mytd1 = document.createElement('td');
    var mytd2 = document.createElement('td');
    var mytd3 = document.createElement('td');
    var mytd4 = document.createElement('td');
    var mytd5 = document.createElement('td');
    var myspan1 = document.createElement('span');
    var myspan2 = document.createElement('span');
    var myspan3 = document.createElement('span');

    //設定class名稱
    mytd1.setAttribute('class', 'text-group0 ' + className);
    mytd2.setAttribute('class', 'text-group1');
    mytd3.setAttribute('class', 'text-group1');
    mytd4.setAttribute('class', 'text-group1');
    mytd5.setAttribute('class', 'text-group2');
    myspan1.setAttribute('class', 'text-span');
    myspan2.setAttribute('class', 'text-span');
    myspan3.setAttribute('class', 'text-span');

    // 設定內容
    mytd1.textContent = localStorage.getItem("status");
    mytd2.textContent = localStorage.getItem("bmiResult");
    mytd3.textContent = localStorage.getItem("weight")+'KG';
    mytd4.textContent = localStorage.getItem("height")+'cm';
    mytd5.textContent = date;
    myspan1.textContent = 'BMI';
    myspan2.textContent = 'weight';
    myspan3.textContent = 'height';

    mytable.appendChild(mytr).appendChild(mytd1);
    mytable.appendChild(mytr).appendChild(mytd2).appendChild(myspan1);
    mytable.appendChild(mytr).appendChild(mytd3).appendChild(myspan2);
    mytable.appendChild(mytr).appendChild(mytd4).appendChild(myspan3);
    mytable.appendChild(mytr).appendChild(mytd5);
}

function getNowDate(){
    var Today = new Date();
    var Year = Today.getFullYear();
    var Month = (((Today.getMonth()+1) <10) ? "0" : "") + (Today.getMonth()+1);
    var Day = Today.getDate() ;

    Today = Month + '-' + Day + '-' + Year;
    return Today;
}
