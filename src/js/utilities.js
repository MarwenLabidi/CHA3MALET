export const qs = (selector, parent = document) => {
	return parent.querySelector(selector)
};

export const qsa = (selector, parent = document) => {
	return [...parent.querySelectorAll(selector)]
};

export const createElement = (type, options = {}) => {
	const element = document.createElement(type)
	Object.entries(options).forEach(([key, value]) => {
		if (key === "class") {
			element.classList.add(value)
			return
		}

		if (key === "dataset") {
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue
			})
			return
		}

		if (key === "text") {
			element.textContent = value
			return
		}
		if (key === "innerHTML") {
			element.innerHTML = value
			return
		}

		if (key === "img") {
			element.src = value
			return
		}

		if (key === "placeholder") {
			element.placeholder = value
			return
		}
		if (key === "type") {
			element.type = value
			return
		}
		if (key === "id") {
			element.setAttribute("id", value);
			return
		}
		if (key === "autoplay") {
			element.setAttribute("autoplay", "");
			return
		}
		if (key === "playsinline") {
			element.setAttribute("playsinline", "");
			return
		}
		if (key === "pattern") {
			element.setAttribute("pattern", value);
			return
		}
		if (key === "required") {
			element.setAttribute("required", "");
			return
		}
		if (key === "open") {
			element.setAttribute("open", "");
			return
		}
		

		element.setAttribute(key, value)
	})
	return element
};


export const addGlobalEventListener = (type, selector, callback, options, parent = document) => {
	parent.addEventListener(
		type,
		e => {
			if (e.target.matches(selector))
				callback(e);
		},
		options
	);
};

export const addEventListener = (parent, type, callback, options = false) => {
	parent.addEventListener(
		type,
		callback,
		options
	);
};


export const insertAfter = (newElement, referenceElement) => {
	referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

export const slideME=(direction,element)=>{
	console.log(`slide ${element} to the ${direction}`);
	let startPositionX=null
	let startPositionY=null
	let endPositionX=null
	let endPositionY=null
	element.addEventListener('touchstart', (e)=>{
		startPositionX=e.touches[0].clientX
		startPositionY=e.touches[0].clientY
	})
	element.addEventListener('touchend', (e)=>{
		endPositionX=e.changedTouches[0].clientX
		endPositionY=e.changedTouches[0].clientY
		switch (direction) {
			case 'left':
				if(endPositionX-startPositionX<0){
					console.log(`move ${element} to the ${direction}`);
					element.animate([
						{transform: 'translateX(0px)'},
						{transform: 'translateX(-100%)'}
					],{
						duration: 500,
						easing: 'ease-in-out',
						fill: 'both'
					})
					setTimeout(() => {
						
						element.remove()
					}, 1000);
				}
				
				break;
			case 'right':
				if(endPositionX-startPositionX>0){
					console.log(`move ${element} to the ${direction}`);
					element.animate([
						{transform: 'translateX(0px)'},
						{transform: 'translateX(100%)'}
					],{
						duration: 500,
						easing: 'ease-in-out',
						fill: 'both'
					})
					setTimeout(() => {
						
						element.remove()
					}, 1000);
				}
				break;
			case 'up':
				if(endPositionY-startPositionY<0){
					console.log(`move ${element} to the ${direction}`);
					element.animate([
						{transform: 'translateY(0px)'},
						{transform: 'translateY(-100%)'}
					],{
						duration: 500,
						easing: 'ease-in-out',
						fill: 'both'
					})
					setTimeout(() => {
						
						element.remove()
					}, 1000);				}
				break;
			case 'down':
				if(endPositionY-startPositionY>0){
					console.log(`move ${element} to the ${direction}`);
					element.animate([
						{transform: 'translateY(0px)'},
						{transform: 'translateY(100%)'}
					],{
						duration: 500,
						easing: 'ease-in-out',
						fill: 'both'
					})
					setTimeout(() => {
						
						element.remove()
					}, 1000);
				}
				break;
			default:
				break;
		}
	})
}


export const createHTMLTemplateMailTemplate = (code) => {
	const template = `
	<div style="background-color: hsla(0, 0%, 16%, 1);color: hsla(0, 0%, 100%, 1);text-align:center" class="mail-template">
		<div  class="mail-template-header"><img style="margin:0 auto;" src="/assets/logo/logo-for-dark.svg" alt="logo" width="250" height="200"></div>
		<div class="mail-template-body">
		<h1 >Your Verification Code</h1>
		<h1 style="font-size: 5em; font-weight:bold;">${code}</h1>
		</div>
	</div>
	`;
	return template;
}


export const generateVerificationCode=()=>{
	return Math.floor(Math.random() * (9999 - 1000) + 1000);
}