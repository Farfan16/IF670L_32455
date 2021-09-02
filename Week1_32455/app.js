const calculateBtn = document.querySelector('#calc-btn');
const resetBtn = document.querySelector('#reset-btn');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const resultCalculateBMI = document.getElementById('result-calculate-bmi');
const catBodyType = document.getElementById('body-type');

const calculateBMI = () => {
    const enteredHeight = +heightInput.value / 100;
    const enteredWeight = +weightInput.value;

    const bmi = enteredWeight / (enteredHeight * enteredHeight);

    if (bmi < 18.5) {
        catBodyType.innerHTML = "Kurus";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        catBodyType.innerHTML = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
        catBodyType.innerHTML = "Gemuk";
    } else if (bmi >= 30) {
        catBodyType.innerHTML = "Obesitas";
    }

    console.log(bmi);

    resultCalculateBMI.innerHTML = bmi;

};

const clearResult = () => {
    heightInput.innerHTML = '';
    weightInput.innerHTML = '';
}

calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', clearResult);