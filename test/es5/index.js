/* global StringFactory */

const { exp, expIf, expLoop, func, quote, style, table, tag } = StringFactory;

////////////////////////////////////////////////////////////////////////////////
// TAG
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cTAG', 'color: cyan;');

	const content = tag('div', { class: 'class-name' }, [
		tag('div', {}, [
			'TEXT',
			tag('br', {}),
			'TEXT'
		])
	]);

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// TABLE
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cTABLE', 'color: cyan;');

	const content = table({ border: 1, cellpadding: 0, cellspacing: 0 }, 'CAPTION', [
		tag('tr', {}, [
			tag('th', { scope: 'col' }, 'HEADER 1'),
			tag('th', { scope: 'col' }, 'HEADER 2'),
			tag('th', { scope: 'col' }, 'HEADER 3')
		])
	], [
		tag('tr', {}, [
			tag('th', { scope: 'row' }, 'HEADER 1'),
			tag('td', {}, 'DATA 2'),
			tag('td', {}, 'DATA 3')
		]),
		tag('tr', {}, [
			tag('th', { scope: 'row' }, 'HEADER 1'),
			tag('td', {}, 'DATA 2'),
			tag('td', {}, 'DATA 3')
		])
	], [
		tag('tr', {}, [
			tag('td', {}, ''),
			tag('td', {}, 'FOOTER 2'),
			tag('td', {}, 'FOOTER 3')
		])
	]);

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// STYLE
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cSTYLE', 'color: cyan;');

	const content = tag('style', { title: 'Alt Style' }, 	style({
		'@media all': {
			'body': {
				'color': 'inherit',
				'font-size': '1rem'
			},
			'p': {
				'line-height': 1
			}
		}
	}));

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// QUOTE
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cQUOTE', 'color: cyan;');

	const content = quote([
		tag('div', { class: 'class-name' }, [
			tag('div', {}, 'TEXT')
		])
	]);

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// FUNC
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cFUNC', 'color: cyan;');

	const content = func(['data'], quote([
		tag('div', { class: 'class-name' }, [
			tag('div', {}, [
				exp('data')
			])
		])
	]));

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// EXP
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cEXP', 'color: cyan;');

	const content = func(['data'], quote([
		tag('div', { class: 'class-name' }, [
			tag('div', {}, [
				exp('data')
			])
		])
	]));

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// EXPIF
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cEXPIF', 'color: cyan;');

	const content = func(['data'], quote([
		tag('div', { class: 'class-name' }, [
			tag('div', {}, [
				expIf('data', [
					'data'
				], [
					quote('Default Value')
				])
			])
		])
	]));

	console.log(content);
})();


////////////////////////////////////////////////////////////////////////////////
// EXPLOOP
////////////////////////////////////////////////////////////////////////////////

(() => {
	console.log('%cEXPLOOP', 'color: cyan;');

	const content = func(['data'], quote([
		tag('div', { class: 'class-name' }, [
			tag('div', [`data-count=${exp('data.length')}`], [
				expLoop('let index = 0, length = data.length; index < length; index++', [
					'data[index]'
				], ', ')
			])
		])
	]));

	console.log(content);
})();
