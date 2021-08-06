var monitorInput = document.querySelector('.monitor__input');
var monitorResult = document.querySelector('.monitor__result');
var buttons = document.querySelectorAll('.button');
var ans = 0;
var preAns = 0;
var result = 0;
var isRenew = false;
monitorInput.textContent = '' ;

for (let button of buttons) {
    button.addEventListener('click', function() {
        let monitorInputText =  monitorInput.textContent;
        let monitorResultText = monitorResult.textContent;
        if (this.classList.contains('button__func')) {
            switch (this.textContent) {
                case 'AC':
                    monitorInputText = '';
                    monitorResultText = '';
                    isRenew = false;
                    break;
                case 'DEL':
                    if (!!monitorInputText[monitorInputText.length - 1].match(/[A-z]/i)) {
                        if (!!monitorInputText[monitorInputText.length - 4]?.match(/e/i)) monitorInputText = monitorInputText.slice(0, -6);
                        else monitorInputText = monitorInputText.slice(0, -3);
                    }
                    else monitorInputText = monitorInputText.slice(0, -1);
                    break;
            }
        }
        else if (this.classList.contains('button__operator')) {
            switch (this.textContent) {
                case '+':
                case '-':
                case '×':
                case '÷':
                    if (isRenew) {
                        monitorInputText = 'Ans';
                        isRenew = false; 
                    }
                    monitorInputText += this.textContent;
                    break;
                case '=':
                    let input = monitorInputText;
                    input = input.replaceAll(/×/g, '*');
                    input = input.replaceAll(/÷/g, '/');
                    input = input.replaceAll(/PreAns/g, preAns);
                    input = input.replaceAll(/Ans/g, ans);
                    try {
                        var result = eval(input);
                        if (!Number.isInteger(result)) result = parseFloat(result.toFixed(5));
                    } catch (error) {
                        monitorResultText = 'Invalid Input';
                        break;
                    }
                    isRenew = true;
                    monitorResultText = result;
                    preAns = ans;
                    ans = result;
                    break;
            }
        }
        else {
            if (isRenew) {
                monitorInputText = '';
                isRenew = false;
            }
            monitorInputText += this.textContent;
        }
        monitorInput.textContent = monitorInputText;
        monitorResult.textContent = monitorResultText;
    });
}
