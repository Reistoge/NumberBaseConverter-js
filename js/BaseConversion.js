function generalBaseConversion(number, baseOriginal, baseGoal, precision) {
    if (baseOriginal < 2 || baseGoal < 2) {
        return "error de base";
    }
    if (baseOriginal === baseGoal) {
        return number;
    }
    let parts = number.split(".");
    if (parts.length === 1) {
        if (baseOriginal === 10) {
            return deleteExtraZero(decToBaseX(BigInt(parts[0]), baseGoal));
        } else if (baseGoal === 10) {
            return baseXToDec(parts[0], baseOriginal).toString();
        } else {
            return deleteExtraZero(decToBaseX(baseXToDec(parts[0], baseOriginal), baseGoal));
        }
    } else if (parts.length === 2) {
        let integerPart = generalBaseConversion(parts[0], baseOriginal, baseGoal, precision);
        let fractionalPart;
        if (baseOriginal === 10) {
            fractionalPart = getFractionalPart(parseFloat("0." + parts[1]), baseGoal, precision);
        } else if (baseGoal === 10) {
            fractionalPart = getDecimalPart(parts[1], baseOriginal).toString().substring(2, 2 + precision);
        } else {
            fractionalPart = getFractionalPart(getDecimalPart(parts[1], baseOriginal), baseGoal, precision);
        }
        return integerPart + "." + fractionalPart;
    }
    return "error de sintaxis";
}

function decToBaseX(number, base) {
    if (number === BigInt(0)) {
        return "0";
    }
    let result = "";
    while (number > 0) {
        result = numberToChar(Number(number % BigInt(base))) + result;
        number = number / BigInt(base);
    }
    return result;
}

function baseXToDec(number, base) {
    let decimal = BigInt(0);
    for (let i = 0; i < number.length; i++) {
        decimal = decimal * BigInt(base) + BigInt(charToNumber(number[i]));
    }
    return decimal;
}

function numberToChar(number) {
    return number <= 9 ? String.fromCharCode(48 + number) : String.fromCharCode(65 + (number - 10));
}

function charToNumber(c) {
    return c >= "0" && c <= "9" ? c.charCodeAt(0) - 48 : c.charCodeAt(0) - 65 + 10;
}

function getFractionalPart(decimals, base, precision) {
    let fractionalPart = "";
    while (decimals > 0 && fractionalPart.length < precision) {
        decimals *= base;
        let fraction = Math.floor(decimals);
        fractionalPart += numberToChar(fraction);
        decimals -= fraction;
    }
    return fractionalPart;
}

function getDecimalPart(fractional, base) {
    let decimalValue = 0;
    for (let i = 0; i < fractional.length; i++) {
        decimalValue += charToNumber(fractional[i]) / Math.pow(base, i + 1);
    }
    return decimalValue;
}

function deleteExtraZero(number) {
    return number[0] === "0" && number.length > 1 ? number.substring(1) : number;
}
