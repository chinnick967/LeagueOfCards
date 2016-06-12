/**
 * Picks random element out of an array.
 * @param {Array} arr
 */
function pickRandom (arr){

    return arr[random(arr.length)];

}

/**
 * Gets a random number between two numbers.
 * @param {Number} max
 * @param {Number=0} min
 * @returns {Number} - random number.
 */
function random (max, min) {

    min = min || 0;
    return Math.round(Math.random() * (max - min)) + min;

}