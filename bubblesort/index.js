function bubbleSort(list) {
    for (sweepNum = 0; sweepNum < list.length; sweepNum++) {
        let swapped = false

        for (i = 0; i < list.length - 1 - sweepNum; i++) {
            if (list[i] > list[i + 1]) {
                let tmp = list[i]
                list[i] = list[i + 1]
                list[i + 1] = tmp
                swapped = true
            }
        }

        if (!swapped) {
            break
        }
    }
}

const list = [1, 3, 2, 5, 4]
console.log("Before sorting", list)

bubbleSort(list)

console.log("After sorting", list)
