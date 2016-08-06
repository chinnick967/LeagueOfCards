'use strict';

module.exports = {
	isType: isType,
	ceilTo: ceilTo
};

function isType (obj, type) {
	return obj && obj.type === type;
}

function ceilTo (number, nearestNumber) {
	return (Math.floor(number / nearestNumber) + 1) * nearestNumber;
}