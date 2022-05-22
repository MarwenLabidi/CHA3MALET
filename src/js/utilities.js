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

export const addEventListener = (parent,type, callback,options=false) => {
	parent.addEventListener(
		type,
		e=> {
			callback(e);
		},
		options
	);
};






export const insertAfter=(newElement, referenceElement)=> {
	referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}