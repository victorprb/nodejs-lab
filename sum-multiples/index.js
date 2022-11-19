function sumMultiples(num) {
    let sum = 0

    for (i = 1; i <= num; i++) {
        if (isMultiple(i, 3) || isMultiple(i, 5)) {
            sum = sum + i
        }
    }

    return sum
}

// isMultiple verifies if a number is multiple of another number
function isMultiple(multiple, num) {
    return multiple % num == 0
}

console.log(sumMultiples(9))
