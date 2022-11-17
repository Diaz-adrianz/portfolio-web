// GET INFO
function windowWidth() {
	return document.querySelector('html').offsetWidth;
}

const backdrop = document.querySelector('.backdrop');
backdrop.addEventListener('click', () => {
	fadeOut(backdrop);
});
// FLOATING
function showup(evnt, elm, icon) {
	evnt.stopPropagation();

	let target = document.getElementById(elm.dataset.target),
		iconElm = elm.querySelector('i'),
		closing = target.querySelector('.showup-close'),
		descendant = {
			target: target.querySelectorAll('*'),
			btn: elm.querySelectorAll('*'),
		};

	if (target.classList.contains('with-bd')) backdrop.classList.add('show');

	target.classList.toggle('show');
	elm.classList.toggle('focus');
	target.classList.contains('show')
		? (iconElm.textContent = 'close')
		: (iconElm.textContent = icon);

	window.onclick = (event) => {
		if (
			event.target != target &&
			event.target != elm &&
			checkDescendants(event.target, descendant.btn) &&
			checkDescendants(event.target, descendant.target)
		) {
			target.classList.contains('fade')
				? fadeOut(target)
				: target.classList.remove('show');

			elm.classList.remove('focus');
			iconElm.textContent = icon;
		}
	};

	if (closing) {
		closing.onclick = () => {
			target.classList.contains('fade')
				? fadeOut(target)
				: target.classList.remove('show');
			elm.classList.remove('focus');
			iconElm.textContent = icon;
		};
	}
}

function checkDescendants(e, items) {
	let bool = true;

	items.forEach((item) => {
		if (e == item) bool = false;
	});

	return bool;
}

function fadeOut(el, duration = 400) {
	el.style.animationName = 'fadeout';

	setTimeout(() => {
		el.style.animationName = 'fade';
		el.classList.remove('show');
	}, duration);
}
