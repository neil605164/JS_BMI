// 1.觸發按鈕後，取得頁面的值（記得檢查是否為數字）
// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
// 3.將結果存入到localstorage中（包含身高體重）
// 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
// 5.顯示localstorage的結果至content

// BMI < 18.5 過輕
// BMI <24 正常
// BMI <27 過重
// BMI <30 輕度肥胖
// BMI <35 中度費胖
// BMI >35 重度肥胖


// 1.觸發按鈕後，取得頁面的值（記得檢查是否為數字）
var btnclick = document.querySelector('.btn');
btnclick.addEventListener('click', main, false);

function main() {
    var height = parseFloat(document.querySelector('.height').value);
    var weight = parseFloat(document.querySelector('.weight').value);
    var bmiResult = bmiCalculator(height/100, weight);

    // 4.顯示本次計算的按鈕特效（原本按鈕須消失，並顯示特定的按鈕）
    if( bmiResult < 18.5){
        console.log('過輕');
    }
    if( 18.5 <= bmiResult && bmiResult < 24){
        console.log('正常');
    }
    if( 24 <= bmiResult && bmiResult < 27){
        console.log('過重');
    }
    if( 27 <= bmiResult && bmiResult < 30){
        console.log('輕度肥胖');
    }
    if( 30 <= bmiResult && bmiResult < 35){
        console.log('中度費胖');
    }
    if(bmiResult >= 35){
        console.log('重度肥胖');
    }

    console.log(bmiResult);
}

// 2.取得值後，呼叫計算bmi的function，並回傳計算結果
function bmiCalculator(height, weight) {
    var count = weight/(height*height);
    return count;
}
