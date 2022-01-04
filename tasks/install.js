'use strict'
require('@js/core')
const { spawnSync } = require('child_process')
const Fs = require('fs'), Path = require('path')
let findNodeModules = require('find-node-modules')

module.exports = function(grunt) {
	let pkg = require(Path.resolve('./package.json'))

	let global = Reflect.has(process.env, 'npm_config_argv') ? process.env.npm_config_argv.match(/"(--global|-g)"/) != null : false
	let globalFolder = Path.resolve(Reflect.has(process.env, 'npm_config_prefix') ? process.env.npm_config_prefix : process.env.NODE_PATH.split(/(;|:)/g).pop(), 'node_modules')
	let installFolder = Path.resolve(global ? globalFolder : findNodeModules('../').length == 0 ? globalFolder : findNodeModules('../')[0])

	grunt.registerMultiTask('install', 'Alternative Install', function() {
		let options = this.options({})
		try  {Fs.mkdirSync(Path.resolve(installFolder, options.pkgName), {recursive: true})} catch (e) {}
		Object.keys(options.files).forEach(file => {
			Fs.copyFileSync(Path.resolve('./'+file), Path.resolve(installFolder, options.pkgName, options.files[file]))
		})
		Object.keys(options.pkg).forEach(key => {
			pkg[key] = options.pkg[key]
		})
		Fs.writeFileSync(Path.resolve(installFolder, options.pkgName, 'package.json'), JSON.stringify(pkg, null, 4), 'utf-8')

		let exts = ['.CMD'].concat(process.env.PATHEXT.split(';')).Unique().join(';')
		const cmd = spawnSync('setx', ['/M', 'PATHEXT', exts])
	})
}
