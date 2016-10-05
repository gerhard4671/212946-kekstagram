
function getMessage (a,b) {

    if (typeof(a) === "boolean") {
        if (a === true) {
            return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
        } else {
            return "Переданное GIF-изображение не анимировано";
        }
    } else if (typeof(a) === "number") {
        return "Переданное SVG-изображение содержит " + a + " объектов и "+ (b * 4) +" атрибутов";
    } else if (Array.isArray(a) && !Array.isArray(b)) { //Добавил условие на 2 аргумент, так как пересекается со след условием
        var amountOfRedPoints = 0;
        for (var i = 0; i < a.length; i++ ) {
            amountOfRedPoints += a[i];
        }
        return "Количество красных точек во всех строчках изображения: "+ amountOfRedPoints;
    } else if ( Array.isArray(a) &&  Array.isArray(b) ) {
        var artifactsSquare = 0;
        for  (var j = 0; j < a.length; j++) {
            artifactsSquare +=(a[j] * b[j]);
        }
        return "Общая площадь артефактов сжатия: "+ artifactsSquare +" пикселей";
    } else {
        return "Переданы некорректные данные";
    }
}

// Тесты для консоли
// console.log(getMessage(true, false));
// console.log(getMessage(false, false));
// console.log(getMessage(15, 6));
// console.log(getMessage([3, 5, 6], false));
// console.log(getMessage([1, 2, 3], [4, 5, 6]));
// console.log(getMessage("sda", "asd"));
