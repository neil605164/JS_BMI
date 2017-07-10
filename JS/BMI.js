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
    var bmiResult = bmiCalculator(height/100, weight);
    bmiResult = bmiResult.toFixed(2);
    // 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
    btnResult(bmiResult);

    // 3.將結果存入到localstorage中（包含身高體重）
}

// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
function bmiCalculator(height, weight) {
    var count = weight/(height*height);
    return count;
}

// 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
function btnResult(bmiResult) {
    var className = '';

    if( bmiResult < 18.5){
        className = 'greenbtn';
        var resultText = '過輕';
        createHTML(bmiResult, className, resultText);
    }
    if( 18.5 <= bmiResult && bmiResult < 24){
        className = 'bluebtn';
        var resultText = '正常';
        createHTML(bmiResult, className, resultText);
    }
    if( 24 <= bmiResult && bmiResult < 27){
        className = 'orangebtn';
        var resultText = '過重';
        createHTML(bmiResult, className, resultText);
    }
    if( 27 <= bmiResult && bmiResult < 30){
        className = 'dark-orangebtn';
        var resultText = '輕度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    if( 30 <= bmiResult && bmiResult < 35){
        className = 'light-redbtn';
        var resultText = '中度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    if(bmiResult >= 35){
        className = 'redbtn';
        var resultText = '重度肥胖';
        createHTML(bmiResult, className, resultText);
    }
    var restartImg = document.querySelector('.restartimg');
    restartImg.addEventListener('click', function(){btnRestart(className)}, false);
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
