'use strict'
let Path = require('path')

module.exports = function(grunt) {
	let pkg = require('./package.json')
	let globalFolder = Path.resolve(Reflect.has(process.env, 'npm_config_prefix') ? process.env.npm_config_prefix : process.env.NODE_PATH.split(/(;|:)/g).pop())

	let install = {
		default: {
			options: {
				pkgName: '@js/node.core',
				files: {
					'index.js': 'index.js',
					'node.cmd': Path.resolve(globalFolder, 'node.cmd')
				},
				pkg: {
					name: '@js/node.core'
				}
			}
		}
	}

	grunt.initConfig({install: install})
	grunt.loadTasks('tasks')
}
