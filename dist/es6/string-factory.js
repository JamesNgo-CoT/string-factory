function quote(value, quote = '`') {
	if (Array.isArray(value)) {
		value = value.join('');
	}

	if (typeof value !== 'string') {
		value = String(value);
	}

	const exps = [];
	value = value
		.replace(new RegExp('{{ (.+?) }}', 'g'), (match, p1) => {
			exps.push(p1);
			return '{{ }}';
		})
		.replace(new RegExp(`\\\\${quote}`, 'g'), `\\\\${quote}`)
		.replace(new RegExp(`${quote}`, 'g'), `\\${quote}`)
		.replace(new RegExp('{{ }}', 'g'), () => {
			if (quote === '`') {
				return `\${${exps.shift()}}`;
			} else {
				return `${quote} + (${exps.shift()}) + ${quote}`;
			}
		});

	return `${quote}${value}${quote}`;
}

function tag(tag, attrs, children) {
	const openTagContents = [tag];
	if (attrs) {
		if (Array.isArray(attrs)) {
			attrs = attrs.join(' ');
		}

		if (typeof attrs === 'string') {
			openTagContents.push(attrs);
		} else {
			for (const key in attrs) {
				if (attrs[key] === undefined) {
					// DO NOTHING
				} else if (attrs[key] === null) {
					openTagContents.push(key);
				} else {
					openTagContents.push(`${key}=${quote(attrs[key], '"')}`);
				}
			}
		}
	}

	const openTag = `<${openTagContents.join(' ')}>`;

	if (children === undefined || children === null) {
		return openTag;
	}

	if (Array.isArray(children)) {
		children = children.filter((child) => child !== null).join('');
	}

	return `${openTag}${children}</${tag}>`;
}

function table(attrs, caption, thead, tbody, tfoot) {
	return tag('table', attrs, [
		tag('caption', {}, caption),
		thead ? tag('thead', {}, thead) : null,
		tag('tbody', {}, tbody),
		tfoot ? tag('tfoot', {}, tfoot) : null
	]);
}

function style(properties) {
	function processProperties(properties) {
		const value = [];

		for (const key in properties) {
			let property = properties[key];

			if (!property) {
				continue;
			}

			if (Array.isArray(property)) {
				if (key === 'font-family') {
					property = property.join(', ');
				} else {
					property = property.join(' ');
				}
			}

			if (typeof property === 'object') {
				value.push(`${key} {`);
				value.push(...processProperties(property));
				value.push('}');
			} else {
				value.push(`${key}: ${property};`);
			}
		}

		return value;
	}

	return processProperties(properties).join(' ');
}

function func(args, body) {
	if (Array.isArray(args)) {
		args = args.filter((child) => child !== null).join(', ');
	}

	return `(${args || ''}) => ${body}`;
}

function exp(value) {
	return `{{ ${value} }}`;
}

function expIf(condition, trueValue, falseValue) {
	return exp(`${condition} ? ${trueValue} : ${falseValue}`);
}

function expLoop(loopExp, body, joiner = '') {
	return exp(`(() => { const expLoopValue = []; for(${loopExp}) { expLoopValue.push(${body}); } return expLoopValue.join(${quote(joiner)}); })()`);
}

/* exported exp, expIf, expLoop, func, quote, style, table, tag */
