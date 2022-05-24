let {
	qs,
	qsa,
	createElement,
	addGlobalEventListener,
	addEventListener,
	insertAfter,
	slideME
} = await import("./utilities.js");
const APP = qs('#app')




const createPageStructure = (() => {
	//---> add back arrow to the top of elemet selected
	function _addBackArrowToTheTopOfElements(element) {
		let backArrow = createElement('img', {
			class: 'backArrow',
			src: '/assets/icons/back-arrow.svg'
		})
		element.prepend(backArrow)

	}
	//---> brand name logo and name

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
	//---> 3 social media icons

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
	//---> intro section logo and name 

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
	//---> register section

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
			placeholder: 'User Name',
			type:'text'
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
	//---> login section

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
	//---> authentification page
	function _authentication() {
		let authPage = createElement('div', {
			class: 'authPage'
		})
		let introPage = _introductionPart()
		let registerPage = _register()
		let loginPage = _login()
		authPage.append(introPage)
		if (window.innerWidth > 900) {
			authPage.append(loginPage)
			// authPage.append(registerPage)
		}
		APP.append(authPage)
	}

	//---> new and join meeting 
	function _newOrJoinMeeting() {
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
	//---> create a meeting card
	function _createMeetingCard(name, locked, ...profilePhotos) {
		let card = createElement('div', {
			class: 'card'
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
		if (locked) {
			let lockedIcon = createElement('img', {
				class: 'lockedIcon',
				src: '/assets/icons/lock 1.svg'
			})
			card.prepend(lockedIcon)
		}
		return card

	}


	//---> create a room page
	function _createRoomsPage() {
		let roomPage = createElement('div', {
			class: 'roomPage'
		})
		let inputSearcher = createElement('input', {
			class: 'inputSearcher',
			placeholder: 'Search'
		})
		let roomGroup = createElement('div', {
			class: 'roomGroup'
		})

		roomPage.appendChild(inputSearcher)
		roomPage.appendChild(roomGroup)
		_addBackArrowToTheTopOfElements(inputSearcher)
		APP.appendChild(roomPage)
	}
	//---> create a video card : should have a seconde div to close it or stop it and show the icon
	function _createVideoCard(idName, mediaStream) {
		let videoCard = createElement('div', {
			id: `videoCard${idName}`
		})

		let video = createElement('video', {
			class: `video${idName}`,
			id: idName,
			autoplay: true,
			playsinline: true
		})
		//NOTE uncomment me 
		// video.srcObject = mediaStream
		videoCard.appendChild(video)
		let hideCard = createElement('div', {
			class: `hideCard${idName}`
		})
		let iconDisableVideo = createElement('img', {
			class: `iconDisableVideo${idName}`,
			src: '/assets/icons/no-videocam.svg'
		})
		hideCard.appendChild(iconDisableVideo)
		videoCard.appendChild(hideCard)
		return videoCard
	}


	//---> create a panel to controll the video callback
	function _createPanel() {
		let panel = createElement('div', {
			class: 'panel'
		})
		let iconMic = createElement('img', {
			class: 'iconMic',
			src: '/assets/icons/microphone.svg'
		})
		let iconVideoCamera = createElement('img', {
			class: 'iconVideoCamera',
			src: '/assets/icons/video-camera.svg'
		})
		let iconHangUp = createElement('img', {
			class: 'iconHangUp',
			src: '/assets/icons/hang-out.svg'
		})
		panel.appendChild(iconMic)
		panel.appendChild(iconVideoCamera)
		panel.appendChild(iconHangUp)
		return panel

	}

	//---> create a video page group
	function _createVideoPageGroup() {
		let videoPageGroup = createElement('div', {
			class: 'videoPageGroup'
		})
		return videoPageGroup
	}
	//---> CREATE groupButton chat and paticipant
	function _createGroupButtonChatAndParticipant() {
		let groupButtonChatAndParticipant = createElement('div', {
			class: 'groupButtonChatAndParticipant'
		})
		let groupButtonChat = createElement('button', {
			class: 'groupButtonChat',
			text: 'Chat'
		})
		let groupButtonParticipant = createElement('button', {
			class: 'groupButtonParticipant',
			text: 'Participant'
		})
		groupButtonChatAndParticipant.appendChild(groupButtonChat)
		groupButtonChatAndParticipant.appendChild(groupButtonParticipant)
		return groupButtonChatAndParticipant
	}
	//---> create account image and name for the user
	function _createAccountImageAndName(name, image) {
		let accountImageAndName = createElement('div', {
			class: 'accountImageAndName'
		})
		let accountImage = createElement('img', {
			class: 'accountImage',
			src: image
		})
		let accountName = createElement('p', {
			class: 'accountName',
			text: name
		})
		accountImageAndName.appendChild(accountImage)
		accountImageAndName.appendChild(accountName)
		return accountImageAndName
	}
	//---> create a message template for the user
	function _createMessageTemplate(messageContent, userAccountImageAndName, dateOfMessages) {
		let messageTemplate = createElement('div', {
			class: 'messageTemplate'
		})
		let messageTemplateHeader = createElement('div', {
			class: 'messageTemplateHeader',
		})
		let messageTemplateMessageContent = createElement('p', {
			class: 'messageTemplateMessageContent',
			text: messageContent
		})
		let dateOfMessage = createElement('p', {
			class: 'dateOfMessage',
			text: dateOfMessages
		})
		messageTemplateHeader.appendChild(userAccountImageAndName)
		messageTemplateHeader.appendChild(dateOfMessage)
		messageTemplate.appendChild(messageTemplateHeader)
		messageTemplate.appendChild(messageTemplateMessageContent)



		return messageTemplate
	}
	//---> create type a general chat template and check if its mobile than  add send icon
	function _createInputAGeneralChatTemplate() {
		let typeAGeneralChatTemplate = createElement('div', {
			class: 'typeAGeneralChatTemplate'
		})
		let typeAGeneralChatTemplateGifEmojiImage = createElement('div', {
			class: 'typeAGeneralChatTemplateGifEmojiImage'
		})
		let iconImage = createElement('img', {
			class: 'iconImage',
			src: '/assets/icons/add-image.svg'
		})
		let iconGif = createElement('img', {
			class: 'iconGif',
			src: '/assets/icons/gif.svg'
		})
		let iconEmoji = createElement('img', {
			class: 'iconEmoji',
			src: '/assets/icons/emoji.svg'
		})
		typeAGeneralChatTemplateGifEmojiImage.appendChild(iconImage)
		typeAGeneralChatTemplateGifEmojiImage.appendChild(iconGif)
		typeAGeneralChatTemplateGifEmojiImage.appendChild(iconEmoji)
		let typeAGeneralChatTemplateInput = createElement('input', {
			class: 'typeAGeneralChatTemplateInput',
			placeholder: 'Type a message...'
		})

		typeAGeneralChatTemplate.appendChild(typeAGeneralChatTemplateGifEmojiImage)
		typeAGeneralChatTemplate.appendChild(typeAGeneralChatTemplateInput)
		if (window.innerWidth < 900) {
			let typeAGeneralChatTemplateSend = createElement('img', {
				class: 'typeAGeneralChatTemplateSend',
				src: '/assets/icons/send.svg'
			})
			typeAGeneralChatTemplate.appendChild(typeAGeneralChatTemplateSend)
		}
		return typeAGeneralChatTemplate
	}
	//---> create a section of chat and participants
	function _createSectionOfChat() {
		let chatSection = createElement('div', {
			class: 'chatSection'
		})
		let messageSection = createElement('div', {
			class: 'messageSection'
		})
		let inputMessageSection = _createInputAGeneralChatTemplate()
		chatSection.appendChild(messageSection)
		chatSection.appendChild(inputMessageSection)
		return chatSection
	}
	//---> create a section of  participants
	function _createSectionOfParticipants() {
		let participantSection = createElement('div', {
			class: 'participantSection'
		})
		return participantSection
	}





	//---> create right side section and add groupbutton and group message and bar drag to it
	//---> create a bar to drag it or focus on it or touchmove event on it 
	function _createRightSideSectionChatsAndParticipants() {
		let rightSideSectionChatsAndParticipants = createElement('div', {
			class: 'rightSideSectionChatsAndParticipants'
		})
		let groupButtonChatAndParticipant = _createGroupButtonChatAndParticipant()
		let groupMessage = _createSectionOfChat()
		let bar = createElement('div', {
			class: 'bar'
		})
		rightSideSectionChatsAndParticipants.appendChild(groupButtonChatAndParticipant)
		rightSideSectionChatsAndParticipants.appendChild(groupMessage)
		rightSideSectionChatsAndParticipants.appendChild(bar)
		return rightSideSectionChatsAndParticipants
	}
	//---> final function to create meeting app
	function _createPageOfMeeting() {
		let pageOfMeeting = createElement('div', {
			class: 'pageOfMeeting'
		})
		let videoSectionAndPanel = createElement('div', {
			class: 'videoSectionAndPanel'
		})
		let panel = _createPanel()
		let createVideoPageGroup = _createVideoPageGroup()
		videoSectionAndPanel.appendChild(createVideoPageGroup)
		videoSectionAndPanel.appendChild(panel)
		pageOfMeeting.appendChild(videoSectionAndPanel)
		if (window.innerWidth > 900) {
			let rightSideSectionChatsAndParticipants = _createRightSideSectionChatsAndParticipants()
			pageOfMeeting.appendChild(rightSideSectionChatsAndParticipants)

		}
		APP.append(pageOfMeeting)
	}



	return {
		_register,
		_login,
		_authentication,
		_newOrJoinMeeting,
		_createMeetingCard,
		_createRoomsPage,
		_createPageOfMeeting,
		_createVideoCard,
		_createSectionOfChat,
		_createSectionOfParticipants,
		_createRightSideSectionChatsAndParticipants,
		_createPageOfMeeting
	}
})()

const createPageFunctionality = (() => {
	//---> add meeting card to the room page
	function _addCardToRoomsPage(...rooms) {
		let roomGroup = qs('.roomGroup')
		rooms.forEach((roomCard) => {
			roomGroup.appendChild(roomCard)
		})
	}
	//---> delete video card
	function _deleteVideoCard(videoCardId) {
		let videoCard = qs(`#${videoCardId}`)
		videoCard.remove()
	}
	//---> hide or show video function in the other users page
	function _disableOrEnableVideoCam(idVideo, status = false) {
		let videoCam = qs(idVideo)
		if (status == 'false') {
			videoCam.setAttribute("hidden", "");
		} else {
			videoCam.removeAttribute("hidden");
		}

	}

	//---> mute or unmute video function in the other users page
	function _muteOrUnmuteVideoCam(idVideo, status = false) {
		let videoCam = qs(idVideo)
		if (status == 'false') {
			videoCam.setAttribute("muted", "");

		} else {
			videoCam.removeAttribute("muted");
		}

	}
	//--->change microphone or video icon status
	function _changeIconStatusMicrophoneOrVideoCamera(icon = 'microphone', status = false) {
		let iconMic = qs(`.${iconMic}`)
		let iconVideoCamera = qs(`.${iconVideoCamera}`)
		if (icon == 'microphone') {

			if (status == 'false') {
				iconMic.src = `/assets/icons/mute-microphone 1.svg`;
			} else {
				iconMic.src = `/assets/icons/microphone.svg`
			}
		} else {
			if (status == 'false') {
				iconVideoCamera.src = `/assets/icons/no-videocam.svg`;
			} else {
				iconVideoCamera.src = `/assets/icons/video-camera.svg`
			}
		}
	}

	//---> create a function to add a video to the video group
	function _addVideoToVideoGroup(...videos) {
		let videoGroup = qs('.videoPageGroup')
		videos.forEach((video) => {

			videoGroup.appendChild(video)
		})
	}
	//--->  add message template to the general chat
	function _addMessageToTheSectionMessages(messageTemplate) {
		let messageSection = qs('.messageSection')
		if (messageSection) {

			messageSection.appendChild(messageTemplate)
		}
	}
	//--->   add participants
	function _addParticipantToTheSectionParticipants(participant) {
		let participantSection = qs('.participantSection')
		participantSection.appendChild(participant)
	}

	//--->  bringRegisterPageForLargeScreen
	function _bringRegisterPageForLargeScreen() {
		console.log(`bringRegisterPageForLargeScreen`);
		let registerSectionPage = createPageStructure._register()
		//make register section absolute position
		registerSectionPage.style.position = 'absolute'
		// registerSectionPage.style.backgroundColor = 'red'
		registerSectionPage.style.top = '-100%'
		registerSectionPage.style.right = '0'
		registerSectionPage.style.height = '100%'
		registerSectionPage.style.width = '50%'
		registerSectionPage.style.padding = '10%'
		// add it to the dom 
		APP.appendChild(registerSectionPage)
		qs('.loginSection').style.transition = 'all 0.3s linear'
		qs('.loginSection').style.opacity = '0'

		// create animation
		qs('.registerSection').animate([
			// keyframes
			{
				top: '-100%',
				backgroundColor: ''
			},
			{
				top: '0',
				backgroundColor: `hsla(0, 0%, 7%, 0.5)`,
			},
			{
				top: '-10%',
				backgroundColor: `hsla(0, 0%, 7%, 0.5)`,

			},
			{
				top: '0',
				backgroundColor: `hsla(0, 0%, 7%, 0.5)`,

			}
		], {
			duration: 900,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});

		//change register button to login button
		qs('.authPage>.sectionOne>.registerButton').disabled = true
		// change class name
		qs('.authPage>.sectionOne>.registerButton').style.opacity = '0'
		// qs('.authPage>.sectionOne>.registerButton').remove()
		//create button login
		let loginButton = createElement('button', {
			class: 'loginButton',
			text: 'Login'
		})
		loginButton.style.position = 'absolute'
		loginButton.style.height = '60px'
		loginButton.style.width = '150px'
		loginButton.style.left = '38%'
		qs('.authPage>.sectionOne').appendChild(loginButton);
		_addAuthenticationEventListeners()
	}
	//--->  bringLoginPageForLargeScreen
	function _bringLoginPageForLargeScreen() {
		console.log(`bringLoginPageForLargeScreen`);
		qs('.authPage>.sectionOne>.registerButton').disabled = false
		qs('.authPage>.sectionOne>.registerButton').style.opacity = '1'
		qs('.authPage>.sectionOne>.loginButton').remove()
		qs('.registerSection').animate([
			// keyframes
			{
				top: '0',
				backgroundColor: ''
			},
			{
				top: '-100%',
				backgroundColor: `hsla(0, 0%, 7%, 0.5)`,
			}
		], {
			duration: 800,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});
		qs('.loginSection').style.transition = 'all 2s ease-in'

		qs('.loginSection').style.opacity = '1'
		setTimeout(() => {
			qs('.registerSection').remove()
		}, 1000);


	}
	//----> up arrow back to homw from register in small screens
	function _backToHomePageFromRegisterPageInSmallScreen() {

		console.log(`backToHomePageFromRegisterPageInSmallScreen`);
		qs('.registerSection').animate([
			// keyframes
			{
				top: '0',
			},
			{
				top: '-100%',
			}
		], {
			duration: 800,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});

		setTimeout(() => {
			qs('.registerSection').remove()
		}, 1000);
	}
	//--->  left arrow back to home from login in small screens
	function _backToHomePageFromLoginPageInSmallScreen() {
		console.log(`_backToHomePageFromLoginPageInSmallScreen`);
		qs('.loginSection').animate([
			// keyframes
			{
				left: '0',
			},
			{
				left: '100%',
			}
		], {
			duration: 800,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});

		setTimeout(() => {
			qs('.loginSection').remove()
		}, 1000);

	}
	//---> bringRegisterPageForSmallScreen
	function _bringRegisterPageForSmallScreen() {

		console.log(`bringRegisterPageForSmallScreen`);
		let registerSectionPage = createPageStructure._register()
		//make register section absolute position
		registerSectionPage.style.position = 'absolute'
		// registerSectionPage.style.backgroundColor = 'red'
		registerSectionPage.style.top = '-100%'
		registerSectionPage.style.right = '0'
		registerSectionPage.style.height = '100%'
		registerSectionPage.style.width = '100%'
		registerSectionPage.style.padding = '10%'
		// add it to the dom 
		APP.appendChild(registerSectionPage)

		// create animation
		qs('.registerSection').animate([
			// keyframes
			{
				top: '-100%',
				backgroundColor: ''
			},
			{
				top: '0',
				backgroundColor: `hsla(0, 0%, 7%, 1)`,
			},
			{
				top: '-10%',
				backgroundColor: `hsla(0, 0%, 16%, 1)`,

			},
			{
				top: '0',
				backgroundColor: `hsla(0, 0%, 16%, 1)`,

			}
		], {
			duration: 900,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});
		_addAuthenticationEventListeners()
	}
	//---> bringLoginPageForSmallScreen
	function _bringLoginPageForSmallScreen() {

		console.log(`bringLoginPageForSmallScreen`);
		let loginSectionPage = createPageStructure._login()
		//make register section absolute position
		loginSectionPage.style.position = 'absolute'
		// registerSectionPage.style.backgroundColor = 'red'
		loginSectionPage.style.top = '0%'
		loginSectionPage.style.left = '100'
		loginSectionPage.style.height = '100%'
		loginSectionPage.style.width = '100%'
		loginSectionPage.style.padding = '10%'
		// add it to the dom 
		APP.appendChild(loginSectionPage)

		// create animation
		qs('.loginSection').animate([
			// keyframes
			{
				left: '100%',
				backgroundColor: ''
			},
			{
				left: '0',
				backgroundColor: `hsla(0, 0%, 7%, 1)`,
			},
			{
				left: '10%',
				backgroundColor: `hsla(0, 0%, 16%, 1)`,

			},
			{
				left: '0',
				backgroundColor: `hsla(0, 0%, 16%, 1)`,

			}
		], {
			duration: 900,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});
		_addAuthenticationEventListeners()

	}


	//--->  add AUTH page event listeners
	function _addAuthenticationEventListeners() {
		let getRegisterPageButtonLargeScreen = qs('.authPage>.sectionOne>.registerButton')
		let getLoginPageButtonLargeScreen = qs('.authPage>.sectionOne>.loginButton')
		let getRegisterPageButtonSmallScreen = qs('.authPage>.sectionOne>div.groupButton>.registerButton')
		let getLoginPageButtonSmallScreen = qs('.authPage>.sectionOne>div.groupButton>.loginButton')
		let upArrow = qs('section.registerSection>img.backArrow')
		let leftArrow = qs('section.loginSection>img.backArrow')
		let registerSection = qs('.registerSection')
		let loginSection = qs('.loginSection')


		if (getLoginPageButtonSmallScreen) {
			addEventListener(getLoginPageButtonSmallScreen, 'click', _bringLoginPageForSmallScreen, {
				once: true
			})
		}
		if (getRegisterPageButtonSmallScreen) {
			addEventListener(getRegisterPageButtonSmallScreen, 'click', _bringRegisterPageForSmallScreen, {
				once: true
			})
		}

		if (getRegisterPageButtonLargeScreen) {
			addEventListener(getRegisterPageButtonLargeScreen, 'click', _bringRegisterPageForLargeScreen, {
				once: true
			});
		}
		if (getLoginPageButtonLargeScreen) {
			addEventListener(getLoginPageButtonLargeScreen, 'click', _bringLoginPageForLargeScreen, {
				once: true
			})
		}


		if (upArrow) {
			addEventListener(upArrow, 'click', _backToHomePageFromRegisterPageInSmallScreen, {
				once: true
			})
		}
		if (leftArrow) {
			addEventListener(leftArrow, 'click', _backToHomePageFromLoginPageInSmallScreen, {
				once: true
			})
		}
		if (registerSection) {
			slideME('up', registerSection)
		}
		if (loginSection) {
			slideME('right', loginSection)
			
		}
	}
	return {
		_addAuthenticationEventListeners
	}
})()





createPageStructure._authentication()
createPageFunctionality._addAuthenticationEventListeners()
// createPageStructure._newOrJoinMeeting()
// createPageStructure._createRoomsPage();

// let cardOne=createPageStructure._createMeetingCard('Meeting One',false,'/assets/icons/google.svg','/assets/icons/facebook.svg')
// let cardTwo=createPageStructure._createMeetingCard('Meeting two',false,'/assets/icons/google.svg','/assets/icons/facebook.svg')

// createPageFunctionality._addCardToRoomsPage(cardOne,cardTwo)
// createPageStructure._createPageOfMeeting()
// let videoCard =createPageStructure._createVideoCard(`marwen`,`true`)
// createPageFunctionality._addVideoToVideoGroup(videoCard)

// let account=createPageStructure._createAccountImageAndName(`hello Marwen`,`/assets/icons/google.svg`)
// let message=createPageStructure._createMessageTemplate(`this is a message from idk how`,account,`2022`)
// createPageFunctionality._addMessageToTheSectionMessages(message)