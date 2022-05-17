let {
	qs,
	qsa,
	createElement,
	addGlobalEventListener,
	addEventListener,
	insertAfter
} = await import("./utilities.js");
const APP = qs('#app')




const createPageStructure = (() => {
	function _addBackArrowToTheTopOfElements(element) {
		let backArrow = createElement('img', {
			class: 'backArrow',
			src: '/assets/icons/back-arrow.svg'
		})
		element.prepend(backArrow)

	}
	function _brandName() {
		let logo = createElement('img', {
			class: 'logo',
			src: '/assets/logo/logo-for-dark.svg'
		})
		let title = createElement('h1', {
			class: 'title',
			text: 'CHA3MALET'
		})
		let brand = createElement('div', {
			class: 'brand'
		})
		brand.appendChild(logo)

		brand.appendChild(title)
		return brand

	}

	function _socialMediaAuth() {
		let groupFacebookGoogleMetaMask = createElement('div', {
			class: 'groupFacebookGoogleMetaMask'
		})
		//elements that inside groupFacebookGoogleMetaMask
		let iconFacebook = createElement('img', {
			class: 'iconFacebook',
			src: '/assets/icons/facebook.svg'
		})
		let iconGoogle = createElement('img', {
			class: 'iconGoogle',
			src: '/assets/icons/google.svg'
		})
		let iconMetaMask = createElement('img', {
			class: 'iconMetaMask',
			src: '/assets/icons/meta-Mask.svg'
		})
		groupFacebookGoogleMetaMask.appendChild(iconFacebook)
		groupFacebookGoogleMetaMask.appendChild(iconGoogle)
		groupFacebookGoogleMetaMask.appendChild(iconMetaMask)
		return groupFacebookGoogleMetaMask
	}

	function _introductionPart() {
		let sectionOne = createElement('section', {
			class: 'sectionOne'
		})
		let logo = createElement('img', {
			class: 'logo',
			src: '/assets/logo/logo-for-dark.svg'
		})
		let title = createElement('h1', {
			class: 'title',
			text: 'CHA3MALET'
		})
		let registerButton = createElement('button', {
			class: 'registerButton',
			text: 'Register'
		})
		let loginButton = createElement('button', {
			class: 'loginButton',
			text: 'Login'
		})
		let groupButton = createElement('div', {
			class: 'groupButton'
		})
		groupButton.appendChild(registerButton)
		groupButton.appendChild(loginButton)

		sectionOne.appendChild(logo)
		if (window.innerWidth > 900) {
			sectionOne.appendChild(title)
			sectionOne.appendChild(registerButton)

		} else {
			sectionOne.appendChild(groupButton)
		}
		return sectionOne

	}

	function _register() {
		let registerSection = createElement('section', {
			class: 'registerSection'
		})
		let groupFacebookGoogleMetaMask = _socialMediaAuth()
		let orRegisterWith = createElement('p', {
			class: 'orRegisterWith',
			text: 'or Register with'
		})
		let inputUserName = createElement('input', {
			class: 'inputUserName',
			placeholder: 'User Name'
		})
		let inputEmail = createElement('input', {
			class: 'inputEmail',
			type: 'email',
			placeholder: 'Email'
		})
		let inputPassword = createElement('input', {
			class: 'inputPassword',
			type: 'password',
			placeholder: 'Password'
		})
		let registerButton = createElement('button', {
			class: 'registerButton',
			text: 'REGISTER'
		})
		registerSection.appendChild(groupFacebookGoogleMetaMask)
		registerSection.appendChild(orRegisterWith)
		registerSection.appendChild(inputUserName)
		registerSection.appendChild(inputEmail)
		registerSection.appendChild(inputPassword)
		registerSection.appendChild(registerButton)

		if (window.innerWidth < 900) {
			let brand = _brandName()
			registerSection.append(brand)
			insertAfter(orRegisterWith, groupFacebookGoogleMetaMask)
			_addBackArrowToTheTopOfElements(registerSection)
		}
		return registerSection

	}

	function _login() {
		let loginSection = createElement('section', {
			class: 'loginSection'
		})
		let inputEmail = createElement('input', {
			class: 'inputEmail',
			type: 'email',
			placeholder: 'Email'
		})
		let inputPassword = createElement('input', {
			class: 'inputPassword',
			type: 'password',
			placeholder: 'Password'
		})
		let loginButton = createElement('button', {
			class: 'loginButton',
			text: 'Login'
		})
		let orLoginWith = createElement('p', {
			class: 'orLoginWith',
			text: 'or login with'
		})

		let groupFacebookGoogleMetaMask = _socialMediaAuth()
		loginSection.appendChild(inputEmail)
		loginSection.appendChild(inputPassword)
		loginSection.appendChild(loginButton)
		loginSection.appendChild(orLoginWith)
		loginSection.appendChild(groupFacebookGoogleMetaMask)




		if (window.innerWidth < 900) {
			let dontHaveAccount = createElement('p', {
				class: 'dontHaveAccount',
				innerHTML: 'don\'t have an account? <a href="#">Register</a>'
			})

			
			let brand = _brandName()
			loginSection.append(brand)
			insertAfter(dontHaveAccount, inputPassword)
			_addBackArrowToTheTopOfElements(loginSection)

		}
		return loginSection
	}

	function _authentication() {
		let authPage = createElement('div', {
			class: 'authPage'
		})
		let introPage=_introductionPart()
		let registerPage=_register()
		let loginPage=_login()
		authPage.append(introPage)
		if (window.innerWidth > 900) {
			authPage.append(loginPage)
			// authPage.append(registerPage)
		}
		APP.append(authPage)
	}
	

	function _newOrJoinMeeting(){
		let newJoinMeetingPage = createElement('div', {
			class: 'newJoinMeetingPage'
		})
		let iconAccount = createElement('img', {
			class: 'iconAccount',
			src: '/assets/icons/user-two.svg'
		})
		let newMeeting = createElement('button', {
			class: 'newMeeting',
			text: 'NEW MEETING'
		})
		let joinMeeting = createElement('button', {
			class: 'joinMeeting',
			text: 'JOIN MEETING'
		})
		newJoinMeetingPage.append(iconAccount)
		newJoinMeetingPage.append(newMeeting)
		newJoinMeetingPage.append(joinMeeting)
		APP.append(newJoinMeetingPage)
	}
	function _createMeetingCard(name,locked,...profilePhotos){
		let card=createElement('div',{
			class:'card'
		})
		let title = createElement('h2', {
			class: 'name',
			text: name
		})
		let groupProfilePhotos = createElement('div', {
			class: 'groupProfilePhotos',

		})
		profilePhotos.forEach((photo, index) => {
			let profilePhoto = createElement('img', {
				class: `profilePhoto${index}`,
				src: photo
			})
			groupProfilePhotos.appendChild(profilePhoto)
		})
		card.appendChild(title)
		card.appendChild(groupProfilePhotos)
		if(locked){
			let lockedIcon=createElement('img',{
				class:'lockedIcon',
				src:'/assets/icons/lock 1.svg'
			})
			card.prepend(lockedIcon)
		}
		return card

	}
	function _addCardToRoomsPage(...rooms){
		let roomGroup=qs('.roomGroup')
		rooms.forEach((roomCard)=>{
			roomGroup.appendChild(roomCard)
		})
	}
	function _createRoomsPage(){
		let roomPage= createElement('div',{
			class:'roomPage'
		})
		let inputSearcher= createElement('input',{
			class:'inputSearcher',
			placeholder:'Search'
		})
		let roomGroup= createElement('div',{
			class:'roomGroup'
		})
		
		roomPage.appendChild(inputSearcher)
		roomPage.appendChild(roomGroup)
		_addBackArrowToTheTopOfElements(inputSearcher)
		APP.appendChild(roomPage) 
	}


	return {
		_register,
		_login,
		_authentication,
		_newOrJoinMeeting,
		_createMeetingCard,
		_addCardToRoomsPage,
		_createRoomsPage,
	}
})()

const createPageFunctionality = (() => {
	function _register() {}

	function _login() {
		if (window.innerWidth > 900) {


		} else {

		}
	}

	function _smallScreenFirstPage() {}

	function _largeScreenFirstPage() {}

	function _authentication() {
		if (window.innerWidth > 900) {} else {}
	}
	return {
		_authentication
	}
})()





// createPageStructure._authentication()
// createPageStructure._newOrJoinMeeting()
// createPageStructure._createRoomsPage();

// let cardOne=createPageStructure._createMeetingCard('Meeting One',false,'/assets/icons/google.svg','/assets/icons/facebook.svg')
// let cardTwo=createPageStructure._createMeetingCard('Meeting two',false,'/assets/icons/google.svg','/assets/icons/facebook.svg')

// createPageStructure._addCardToRoomsPage(cardOne,cardTwo)