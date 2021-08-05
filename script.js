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
        isRenew = monitorResultText !== '';
        if (this.classList.contains('button__func')) {
            switch (this.textContent) {
                case 'AC':
                    monitorInputText = '';
                    monitorResultText = '';
                    break;
                case 'DEL':
                    monitorInputText = monitorInputText.slice(0, -1);
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
                        monitorResultText = '';
                    }
                    monitorInputText += this.textContent;
                    break;
                case '=':
                    let input = monitorInputText;
                    console.log(input);
                    input = input.replaceAll(/×/g, '*');
                    input = input.replaceAll(/÷/g, '/');
                    input = input.replaceAll(/PreAns/g, preAns);
                    input = input.replaceAll(/Ans/g, ans);
                    try {
                        var result = eval(input);
                    } catch (error) {
                        monitorResultText = 'Invalid Input';
                        break;
                    }
                    monitorResultText = result;
                    preAns = ans;
                    ans = result;
                    break;
            }
        }
        else {
            monitorInputText += this.textContent;
        }
        monitorInput.textContent = monitorInputText;
        monitorResult.textContent = monitorResultText;
    });
}
