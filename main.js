const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy');
const strengthValue = document.getElementById('strengthValue');

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const length = +lengthInput.value;
    const hasUpper = uppercaseCheckbox.checked;
    const hasLower = lowercaseCheckbox.checked;
    const hasNumber = numbersCheckbox.checked;
    const hasSymbol = symbolsCheckbox.checked;

    let generatedPassword = '';
    const typesCount = hasUpper + hasLower + hasNumber + hasSymbol;
    const typesArr = [{ hasUpper }, { hasLower }, { hasNumber }, { hasSymbol }].filter(
        item => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += {
                hasLower: getRandomLower,
                hasUpper: getRandomUpper,
                hasNumber: getRandomNumber,
                hasSymbol: getRandomSymbol,
            }[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    passwordInput.value = finalPassword;
    evaluateStrength(finalPassword);
}

function evaluateStrength(password) {
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(){}\[\]=<>/,.]/.test(password);

    let strength = 'Easy';
    if (length >= 8 && (hasUpper || hasLower) && (hasNumber || hasSymbol)) {
        strength = 'Normal';
    }
    if (length >= 12 && hasUpper && hasLower && (hasNumber || hasSymbol)) {
        strength = 'Strong';
    }
    if (length >= 16 && hasUpper && hasLower && hasNumber && hasSymbol) {
        strength = 'Very Strong';
    }

    strengthValue.innerText = strength;
}

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordInput.value;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied');
});
