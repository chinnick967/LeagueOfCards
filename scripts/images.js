const path = require('path');
const fs = require('fs');
const jsBeautify = require('js-beautify').js_beautify;
const _ = require('lodash');
const glob = require('glob');
const q = require('q');

var assets = [
	loadAssets('cards', './src/Assets/Cards/'),
	loadAssets('playerIcons', './src/Assets/PlayerIcons/'),
	loadAssets('sprites', './src/Assets/Sprites/'),
	loadAssets('icons', './src/Assets/Icons/')
];

Promise.all(assets)
	.then(function (res) {
		var fileList = Object.assign (...res);
		fs.writeFileSync('src/Engine/Assets.js', jsBeautify(`
			var assets = ${JSON.stringify(fileList, null, 2)};
		`));
		console.log('Assets image src/Engine/Assets.js');
	}).catch(function (err) {
		console.log(err);
	});


function loadAssets (assetName, dirPath) {

	var result = {};
	result[assetName] = {};
	return globby([
		dirPath + '*.png',
		dirPath + '*.jpg',
		dirPath + '*.gif',
		dirPath + '*.jpeg'
	]).then(function (files) {
		return files.reduce (function (res, file) {
			var fileName = path.parse(file).name;
			res[assetName][fileName] = file.split('src/')[1];
			return res;
		}, result)
	});
}


function globby (arr, options) {
	if(typeof arr === 'string'){
		arr = [arr];
	}
	var globs = arr.map(function (path) {
		return q.promise(function (resolve) {
			glob(path, function (err, files) {
				resolve([].concat (files));
			})
		})
	});

	return q.all(globs).then(files => _.flattenDeep(files));
}