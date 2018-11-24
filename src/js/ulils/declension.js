// склонение слов в зависимости от числительных

export function declension(num, words) {
    let result;
    let count = num % 100;
    if (count >= 5 && count <= 20) {
        result = words[`2`];
    } else {
        count = count % 10;
        if (count === 1) {
            result = words[`0`];
        } else if (count >= 2 && count <= 4) {
            result = words[`1`];
        } else {
            result = words[`2`];
        }
    }
    return result;
}

