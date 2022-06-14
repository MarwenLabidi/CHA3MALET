let {
	qs,
	qsa,
	createElement,
	addGlobalEventListener,
	addEventListener,
	removeEventListener,
	insertAfter,
	slideME,
	generateVerificationCode,
	createHTMLTemplateMailTemplate
} = await import("./utilities.js");
const APP = qs('#app')

// fireBase config
import {
	initializeApp
} from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
	query,
	setDoc
} from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage";
// import { create } from "tar";



const firebaseConfig = {
	apiKey: "AIzaSyBLGVitcjxSggmupKBaxAM9mHD4ygg48Nw",
	authDomain: "cha3mlet-conference-app.firebaseapp.com",
	projectId: "cha3mlet-conference-app",
	storageBucket: "cha3mlet-conference-app.appspot.com",
	messagingSenderId: "990797560961",
	appId: "1:990797560961:web:33d0c1a811954866682180",
	measurementId: "G-4K73E2K1MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();



let countLoginClick = 0
let USERNAME = null
let EMAIL = null
let PHOTO_URL = null




const createPageStructure = (() => {
	//---> add back arrow to the top of element selected
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
			text: 'Or Register With'
		})
		let inputUserName = createElement('input', {
			class: 'inputUserName',
			placeholder: 'User Name',
			type: 'text',
			required: true,
			pattern: "^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" //  username is 3-20 characters, long no _ or . at the beginning,no __ or _. or ._ or .. inside, allowed characters,no _ or . at the end
		})
		let inputEmail = createElement('input', {
			class: 'inputEmail',
			type: 'email',
			placeholder: 'Email',
			required: true,
			pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" // mail pattern
		})
		let inputPassword = createElement('input', {
			class: 'inputPassword',
			type: 'password',
			placeholder: 'Password',
			required: true,
			pattern: ".*.{8,}$" //Minimum eight characters

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
			placeholder: 'Email',
			required: true,
			pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" // mail pattern
		})
		let inputPassword = createElement('input', {
			class: 'inputPassword',
			type: 'password',
			placeholder: 'Password',
			required: true,
			pattern: ".*.{8,}$" //Minimum eight characters
		})
		let loginButton = createElement('button', {
			class: 'loginButton',
			text: 'Login'
		})
		let orLoginWith = createElement('p', {
			class: 'orLoginWith',
			text: 'Or Login With'
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
				innerHTML: 'Don\'t Have An Account? <a href="#">REGISTER</a>'
			})


			let brand = _brandName()
			loginSection.append(brand)
			insertAfter(dontHaveAccount, inputPassword)
			_addBackArrowToTheTopOfElements(loginSection)

		}
		return loginSection
	}
	//---> authentication page
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
	//-[]                                             
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
	//-[]                                                                   
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


	//---> create a panel to controls the video callback
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
	//---> CREATE groupButton chat and participant
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
			class: 'participant'
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
	function _createMessageTemplate(messageContent, userAccountImagePath,userAccountNameTxt, dateOfMessagesO) {
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
	
		let userAccountImageAndName= createElement('div', {
			class: 'userAccountImageAndName',
		})
		let userAccountImage = createElement('img', {
			class: 'userAccountImage',
			src: userAccountImagePath
		})
		let userAccountName = createElement('p', {
			class: 'userAccountName',
			text: userAccountNameTxt
		})
		let dateOfMessages = createElement('p', {
			class: 'userAccountDate',
			text: dateOfMessagesO
		})

		userAccountImageAndName.appendChild(userAccountImage)
		userAccountImageAndName.appendChild(userAccountName)
		messageTemplateHeader.appendChild(userAccountImageAndName)
		messageTemplateHeader.appendChild(dateOfMessages)
		messageTemplate.appendChild(messageTemplateHeader)
		messageTemplate.appendChild(messageTemplateMessageContent)



		return messageTemplate
	}
	function _createMessageTemplateForMe(messageContent){
		let messageTemplateMessageContentForMe = createElement('p', {
			class: 'messageTemplateMessageContentForMe',
			text: messageContent
		})
		return messageTemplateMessageContentForMe
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





	//---> create right side section and add group button and group message and bar drag to it
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
	//----> final function to create meeting app
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
		// if (window.innerWidth > 900) {
		let rightSideSectionChatsAndParticipants = _createRightSideSectionChatsAndParticipants()
		pageOfMeeting.appendChild(rightSideSectionChatsAndParticipants)

		// }
		APP.append(pageOfMeeting)
	}

	//---> create account setting page for small screens
	function _createAccountSettingPageSmallScreens() {
		let accountSettingPageSmallScreens = createElement('div', {
			class: 'accountSettingPageSmallScreens'
		})
		_addBackArrowToTheTopOfElements(accountSettingPageSmallScreens)
		let profilePhotoAndChangeImgIcon = createElement('div', {
			class: 'profilePhotoAndChangeImgIcon'
		})
		let profilePhoto = createElement('img', {
			class: 'profilePhoto',
			src: '/assets/icons/user-two.svg'
		})
		let changePhotoIcon = createElement('img', {
			class: 'changePhotoIcon',
			src: '/assets/icons/COCO-Bold-Insta.svg'
		})
		profilePhotoAndChangeImgIcon.appendChild(profilePhoto)
		profilePhotoAndChangeImgIcon.appendChild(changePhotoIcon)
		accountSettingPageSmallScreens.appendChild(profilePhotoAndChangeImgIcon)

		let profileName = createElement('h1', {
			class: 'profileName',
			text: 'Name'
		})
		accountSettingPageSmallScreens.appendChild(profileName)

		let bodyAccountSetting = createElement('div', {
			class: 'bodyAccountSetting'
		})
		let logOutSection = createElement('div', {
			class: 'logOutSection'
		})
		let editNameSection = createElement('div', {
			class: 'editNameSection'
		})
		let changePasswordSection = createElement('div', {
			class: 'changePasswordSection'
		})
		let logOutIcon = createElement('img', {
			class: 'logOutIcon',
			src: '/assets/icons/logOut.svg'
		})
		let editNameIcon = createElement('img', {
			class: 'editNameIcon',
			src: '/assets/icons/COCO-Bold-Edit.svg'
		})
		let changePasswordIcon = createElement('img', {
			class: 'changePasswordIcon',
			src: '/assets/icons/COCO-Bold-Unlock.svg'
		})
		let logOutText = createElement('p', {
			class: 'logOutText',
			text: 'Log Out'
		})
		let editNameText = createElement('p', {
			class: 'editNameText',
			text: 'Edit Name'
		})
		let changePasswordText = createElement('p', {
			class: 'changePasswordText',
			text: 'Change Password'
		})
		logOutSection.appendChild(logOutIcon)
		logOutSection.appendChild(logOutText)
		editNameSection.appendChild(editNameIcon)
		editNameSection.appendChild(editNameText)
		changePasswordSection.appendChild(changePasswordIcon)
		changePasswordSection.appendChild(changePasswordText)
		bodyAccountSetting.appendChild(editNameSection)
		bodyAccountSetting.appendChild(changePasswordSection)
		bodyAccountSetting.appendChild(logOutSection)
		accountSettingPageSmallScreens.appendChild(bodyAccountSetting)
		return accountSettingPageSmallScreens
	}
	//---> create not found email or password error and reset your password error and the verification code s incorrect

	function _createErrorMessage(errType) {
		let errorMessage = createElement('div', {
			class: 'errorMessage'
		})
		if (errType === "notFoundEmailOrPassword") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'Ops !!!The Email or Password is incorrect'
			})
			errorMessage.appendChild(errorMessageText)
		} else if (errType === "resetYourPassword") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'if you forgot your password !!!'
			})
			let resetYourPassword = createElement('p', {
				class: 'resetYourPassword',
				text: 'Reset Your Password'
			})

			errorMessage.appendChild(errorMessageText)
			errorMessage.appendChild(resetYourPassword)
		} else if (errType === "verificationCodeIncorrect") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'Ops !!!The Verification Code is incorrect'
			})
			errorMessage.appendChild(errorMessageText)
		} else if (errType === "userNamePattern") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'User Name must be more than 3 and less than characters and no spaces and charachters'
			})
			errorMessage.appendChild(errorMessageText)
		} else if (errType === "eMailPattern") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'wrong email format'
			})
			errorMessage.appendChild(errorMessageText)
		} else if (errType === "passwordPattern") {
			let errorMessageText = createElement('p', {
				class: 'errorMessageText',
				text: 'Password must be at least 8 characters long'
			})
			errorMessage.appendChild(errorMessageText)
		} else {
			console.log(`no error message type found`);
		}

		return errorMessage
	}
	//---> create dialog boxes for the app
	//account setting dialog box for large screens
	// verification code dialog box 
	//successfully created account dialog box
	//create new room dialog box
	// join room dialog
	function _verificationCodeInput() {
		let verificationInput = createElement('div', {
			class: 'verificationInput'

		})
		let input1 = createElement('input', {
			class: 'input1',
			// type: 'number',
		})
		let input2 = createElement('input', {
			class: 'input2',
			// type: 'number',
		})
		let input3 = createElement('input', {
			class: 'input3',
			// type: 'number',
		})
		let input4 = createElement('input', {
			class: 'input4',
			// type: 'number',
		})
		verificationInput.appendChild(input1)
		verificationInput.appendChild(input2)
		verificationInput.appendChild(input3)
		verificationInput.appendChild(input4)
		return verificationInput

	}

	function _createDialogBox(dialogType) {
		let dialogBox = createElement('dialog', {
			class: 'dialogBox',
			// open: true,
		})
		if (dialogType === 'accountSetting') {
			let profileName = createElement('h1', {
				class: 'profileName',
				text: 'Name'
			})
			let bodyAccountSetting = createElement('div', {
				class: 'bodyAccountSetting'
			})
			let logOutSection = createElement('div', {
				class: 'logOutSection'
			})
			let editNameSection = createElement('div', {
				class: 'editNameSection'
			})
			let changePasswordSection = createElement('div', {
				class: 'changePasswordSection'
			})
			let changeProfilePhotoSection = createElement('div', {
				class: 'changeProfilePhotoSection'
			})
			let logOutIcon = createElement('img', {
				class: 'logOutIcon',
				src: '/assets/icons/logOut.svg'
			})
			let changePhotoIcon = createElement('img', {
				class: 'changePhotoIcon',
				src: '/assets/icons/COCO-Bold-Insta.svg'
			})
			let editNameIcon = createElement('img', {
				class: 'editNameIcon',
				src: '/assets/icons/COCO-Bold-Edit.svg'
			})
			let changePasswordIcon = createElement('img', {
				class: 'changePasswordIcon',
				src: '/assets/icons/COCO-Bold-Unlock.svg'
			})
			let logOutText = createElement('p', {
				class: 'logOutText',
				text: 'Log Out'
			})
			let changeProfilePhotoText = createElement('p', {
				class: 'changeProfilePhotoText',
				text: 'Change Profile Photo'
			})
			let editNameText = createElement('p', {
				class: 'editNameText',
				text: 'Edit Name'
			})
			let changePasswordText = createElement('p', {
				class: 'changePasswordText',
				text: 'Change Password'
			})
			logOutSection.appendChild(logOutIcon)
			logOutSection.appendChild(logOutText)
			editNameSection.appendChild(editNameIcon)
			editNameSection.appendChild(editNameText)
			changePasswordSection.appendChild(changePasswordIcon)
			changePasswordSection.appendChild(changePasswordText)
			changeProfilePhotoSection.appendChild(changePhotoIcon)
			changeProfilePhotoSection.appendChild(changeProfilePhotoText)
			bodyAccountSetting.appendChild(changeProfilePhotoSection)
			bodyAccountSetting.appendChild(editNameSection)
			bodyAccountSetting.appendChild(changePasswordSection)
			bodyAccountSetting.appendChild(logOutSection)
			dialogBox.appendChild(profileName)
			dialogBox.appendChild(bodyAccountSetting)
			dialogBox.classList.add('accountSettingDialogBox')
		} else if (dialogType === 'verificationCode') {
			let verificationCodeH3 = createElement('h3', {
				class: 'verificationCodeH3',
				text: 'We sent you a verification code to your email address'
			})
			let verificationCodeP = createElement('p', {
				class: 'verificationCodeP',
				text: 'Please enter the code below to verify'
			})


			let verificationCodeInput = _verificationCodeInput()
			let verificationCodeSubmit = createElement('button', {
				class: 'verificationCodeSubmit',
				text: 'Submit'
			})
			dialogBox.appendChild(verificationCodeH3)
			dialogBox.appendChild(verificationCodeP)
			dialogBox.appendChild(verificationCodeInput)
			dialogBox.appendChild(verificationCodeSubmit)

		} else if (dialogType === 'successfullyCreatedAccount') {
			let successIcon = createElement('img', {
				class: 'successIcon',
				src: '/assets/icons/ico---24---gestures-&-emotions---clap.svg'
			})
			let successTitle = createElement('h1', {
				class: 'successTitle',
				text: 'Successfully Created Account'
			})
			let continueButton = createElement('button', {
				class: 'continueButton',
				text: 'Continue'
			})
			dialogBox.appendChild(successIcon)
			dialogBox.appendChild(successTitle)
			dialogBox.appendChild(continueButton)
		} else if (dialogType === 'createNewRoom') {
			let checkBox = createElement('input', {
				class: 'checkBox',
				type: 'checkbox'
			})
			let checkBoxBlock = createElement('div', {
				class: 'checkBoxBlock'
			})
			let checkBoxLabel = createElement('label', {
				class: 'checkBoxLabel',
				text: ' Private Room'
			})
			let inputNameroom = createElement('input', {
				class: 'inputNameroom',
				type: 'text',
				placeholder: 'Room Name'
			})
			let createRoomButton = createElement('button', {
				class: 'createRoomButton',
				text: 'Create'
			})
			checkBoxBlock.appendChild(checkBox)
			checkBoxBlock.appendChild(checkBoxLabel)
			dialogBox.appendChild(checkBoxBlock)
			dialogBox.appendChild(inputNameroom)
			dialogBox.appendChild(createRoomButton)
		} else if (dialogType === 'joinRoom') {
			let joinRoomH3 = createElement('h3', {
				class: 'joinRoomH3',
				text: 'Enter the room code below'
			})
			let joinRoomInput = createElement('input', {
				class: 'joinRoomInput',
				placeholder: 'Room Code'
			})
			let joinRoomButton = createElement('button', {
				class: 'joinRoomButton',
				text: 'Join'
			})
			dialogBox.appendChild(joinRoomH3)
			dialogBox.appendChild(joinRoomInput)
			dialogBox.appendChild(joinRoomButton)
		} else if (dialogType === 'uploadImg') {
			let uploadImgButton = createElement('button', {
				class: 'uploadImgButton',
				text: 'Upload'
			})
			dialogBox.appendChild(uploadImgButton)
		} else if (dialogType === 'done') {
			let doneIcon = createElement('img', {
				class: 'doneIcon',
				src: '/assets/icons/ico---24---gestures-&-emotions---clap.svg'
			})
			let doneTitle = createElement('h1', {
				class: 'doneTitle',
				text: 'Done'
			})
			let continueButton = createElement('button', {
				class: 'continueButton',
				text: 'ok'
			})
			dialogBox.appendChild(doneIcon)
			dialogBox.appendChild(doneTitle)
			dialogBox.appendChild(continueButton)
		} else if (dialogType === 'changeName') {
			let changeNameH3 = createElement('h3', {
				class: 'changeNameH3',
				text: 'Enter your new name below'
			})
			let changeNameInput = createElement('input', {
				class: 'changeNameInput',
				placeholder: 'New Name'
			})
			let changeNameButton = createElement('button', {
				class: 'changeNameButton',
				text: 'Change'
			})
			dialogBox.appendChild(changeNameH3)
			dialogBox.appendChild(changeNameInput)
			dialogBox.appendChild(changeNameButton)
		} else if (dialogType === 'changePassword') {
			let changePasswordH3 = createElement('h3', {
				class: 'changePasswordH3',
				text: 'Enter your new password below'
			})
			let changePasswordInput = createElement('input', {
				class: 'changePasswordInput',
				placeholder: 'New Password'
			})
			let changePasswordInput2 = createElement('input', {
				class: 'changePasswordInput2',
				placeholder: 'Old Password'
			})
			let changePasswordButton = createElement('button', {
				class: 'changePasswordButton',
				text: 'Change '
			})
			dialogBox.appendChild(changePasswordH3)
			dialogBox.appendChild(changePasswordInput2)
			dialogBox.appendChild(changePasswordInput)

			dialogBox.appendChild(changePasswordButton)
		} else if (dialogType === 'resetPassword') {
			let resetPasswordH3 = createElement('h3', {
				class: 'resetPasswordH3',
				text: 'We sent a reset mail to your email address'
			})
			let resetPasswordH5 = createElement('h5', {
				class: 'resetPasswordH5',
				text: 'Please check you span section if you dont found it'
			})
			let closeButton = createElement('button', {
				class: 'closeButton',
				text: 'close '
			})
			dialogBox.appendChild(resetPasswordH3)
			dialogBox.appendChild(resetPasswordH5)
			dialogBox.appendChild(closeButton)
		} else if (dialogType === 'askAboutProfilePhoto') {
			let resetPasswordH3 = createElement('h2', {
				class: 'askAboutProfilePhotoH2',
				text: 'Do You Want To Upload a Profile Photo ?'
			})

			let yesButton = createElement('button', {
				class: 'yesButton',
				text: 'yes '
			})
			let noButton = createElement('button', {
				class: 'noButton',
				text: 'no '
			})
			dialogBox.appendChild(resetPasswordH3)
			dialogBox.appendChild(noButton)
			dialogBox.appendChild(yesButton)

		} else {
			console.log('no dialog type found')
		}
		return dialogBox
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
		_createPageOfMeeting,
		_createAccountSettingPageSmallScreens,
		_createErrorMessage,
		_createDialogBox,
		_createMessageTemplate,
		_createMessageTemplateForMe,
		_createAccountImageAndName
	}
})()

const createPageFunctionality = (() => {
	//-[]                                                             
	//---> add meeting card to the room page
	function _addCardToRoomsPage(...rooms) {
		let roomGroup = qs('.roomGroup')
		rooms.forEach((roomCard) => {
			roomGroup.appendChild(roomCard)
		})
	}
	//---> add messages t chat 
	function _addMessageToChatSection(chat) {
		let chatSection = qs('.messageSection')
		chatSection.appendChild(chat)
	}
	//---> add participant to participantsction 
	function _addParticipatToParticipantSection(participant) {
		let participantSection = qs('.bar')
		participantSection.appendChild(participant)
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
//-[]                                                                                                   
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
		let participantSection = qs('.bar')
		console.log('participantSection: ', participantSection);
		participantSection.appendChild(participant)
	}

	//--->  bringRegisterPageForLargeScreen
	function _bringRegisterPageForLargeScreen() {
		console.log(`bringRegisterPageForLargeScreen`);
		let registerSectionPage = createPageStructure._register()
		//make register section absolute position
		registerSectionPage.style.position = 'absolute'
		registerSectionPage.style.top = '-100%'
		registerSectionPage.style.right = '0'
		registerSectionPage.style.height = '100%'
		registerSectionPage.style.width = '50%'

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
		qs('.authPage>.sectionOne>.registerButton').remove()
		//create button login
		let loginButton = createElement('button', {
			class: 'loginButton',
			text: 'Login'
		})
		qs('.authPage>.sectionOne').appendChild(loginButton);
		_addAuthenticationEventListeners()
	}
	//--->  bringLoginPageForLargeScreen
	function _bringLoginPageForLargeScreen() {
		console.log(`bringLoginPageForLargeScreen`);
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
		let registerButton = createElement('button', {
			class: 'registerButton',
			text: 'register'
		})
		qs('.authPage>.sectionOne').appendChild(registerButton);
		qs('.authPage>.sectionOne>.loginButton').remove()
		_addAuthenticationEventListeners()


	}
	//----> up arrow back to home from register in small screens
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
		registerSectionPage.style.top = '-100%'
		registerSectionPage.style.height = '100vh'
		registerSectionPage.style.width = '100vw'
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
		loginSectionPage.style.top = '0%'
		loginSectionPage.style.left = '100'
		loginSectionPage.style.height = '100vh'
		loginSectionPage.style.width = '100vw'
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
	//---> bringRegisterPageFromLinkInLoginPage

	function _bringRegisterPageFromLinkInLoginPage() {
		console.log(`bringRegisterPageFromLinkInLoginPage`);
		qs('.loginSection').remove();
		qs('.authPage>.sectionOne>div.groupButton>.registerButton').click()

	}
	//----> firebase authentication and MetaMask
	// login
	function _loginFireBase() {
		console.log(`-loginFireBase`);
		countLoginClick++
		let inputLoginEmail = qs('.loginSection>.inputEmail')
		let inputLoginPassword = qs('.loginSection>.inputPassword')
		EMAIL = inputLoginEmail.value

		// match input regex
		// uncomment the regex for email
		let patternEmail = inputLoginEmail.getAttribute("pattern");
		let regexEmail = new RegExp(patternEmail);
		if (!regexEmail.test(inputLoginEmail.value)) {
			// Pattern does not matches!
			inputLoginEmail.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
			let errorMessage = createPageStructure._createErrorMessage(`eMailPattern`)
			if (qs('.errorMessageText')) {
				qs('.errorMessageText').remove()
			}
			insertAfter(errorMessage, qs('.inputPassword'))
			return
		}
		let patternPassword = inputLoginPassword.getAttribute("pattern");
		let regexPassword = new RegExp(patternPassword);
		if (!regexPassword.test(inputLoginPassword.value)) {
			// Pattern does not matches!
			inputLoginPassword.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
			let errorMessage = createPageStructure._createErrorMessage(`passwordPattern`)
			if (qs('.errorMessageText')) {
				qs('.errorMessageText').remove()
			}
			insertAfter(errorMessage, qs('.inputPassword'))
			return
		}
		//firebase login 
		//  uncomment sign int
		signInWithEmailAndPassword(auth, inputLoginEmail.value, inputLoginPassword.value)
			.then((userCredential) => {
				// Signed in 
				//  get data from firebase
				getDocs(collection(db, 'USERS')).then(querySnapshot => {
					querySnapshot.forEach((doc) => {
						if (doc.id == EMAIL) {

							USERNAME = doc.data().USERNAME
							console.log('USERNAME: ', USERNAME);
						}
					});
				});


				const user = userCredential.user;
				console.log('user: ', user);
				// ...
				transitionBetweenAuthenAndNewAndjoinMeetingPage()
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log('errorCode: ', errorCode);
				const errorMessage = error.message;
				console.log('errorMessage: ', errorMessage);
				let errorMessages
				if (countLoginClick < 3) {
					if (qs('.errorMessageText')) {
						qs('.errorMessageText').remove()
					}
					if (qs('.resetYourPassword')) {
						qs('.resetYourPassword').remove()
					}

					errorMessages = createPageStructure._createErrorMessage(`notFoundEmailOrPassword`)
					insertAfter(errorMessages, qs('.inputPassword'))
				} else {
					countLoginClick = 0
					qs('.errorMessageText').remove()
					errorMessages = createPageStructure._createErrorMessage(`resetYourPassword`)
					insertAfter(errorMessages, qs('.inputPassword'))
					_addAuthenticationEventListeners()

				}
			});


	}

	function _registerFireBase() {
		console.log(`-registerFireBase`);
		let inputRegisterUserName = qs('.registerSection>.inputUserName')
		let inputRegisterEmail = qs('.registerSection>.inputEmail')
		let inputRegisterPassword = qs('.registerSection>.inputPassword')
		// check the pattern
		//  match the regex in the input
		// uncomment this to check the pattern
		let patternUserName = inputRegisterUserName.getAttribute("pattern");
		let regexUserName = new RegExp(patternUserName);
		if (!regexUserName.test(inputRegisterUserName.value)) {
			// Pattern does not matches!
			inputRegisterUserName.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
			let errorMessage = createPageStructure._createErrorMessage(`userNamePattern`)
			if (qs('.errorMessageText')) {
				qs('.errorMessageText').remove()
			}
			insertAfter(errorMessage, qs('.orRegisterWith'))
			// qs('.registerSection').append(errorMessage)
			return
		}
		let patternEmail = inputRegisterEmail.getAttribute("pattern");
		let regexEmail = new RegExp(patternEmail);
		if (!regexEmail.test(inputRegisterEmail.value)) {
			// Pattern does not matches!
			inputRegisterEmail.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
			let errorMessage = createPageStructure._createErrorMessage(`eMailPattern`)
			if (qs('.errorMessageText')) {
				qs('.errorMessageText').remove()
			}
			insertAfter(errorMessage, qs('.orRegisterWith'))
			return
		}
		let patternPassword = inputRegisterPassword.getAttribute("pattern");
		let regexPassword = new RegExp(patternPassword);
		if (!regexPassword.test(inputRegisterPassword.value)) {
			// Pattern does not matches!
			inputRegisterPassword.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
			let errorMessage = createPageStructure._createErrorMessage(`passwordPattern`)
			if (qs('.errorMessageText')) {
				qs('.errorMessageText').remove()
			}
			insertAfter(errorMessage, qs('.orRegisterWith'))
			return
		}

		const CODE = generateVerificationCode()


		// setup email verification first with code
		function sendVerificationMail(userMail, code) {
			console.log(`sendVerificationMail`);
			emailjs.init("nz22SjHkHngIkm7_W");
			let templateParams = {
				to_mail: inputRegisterEmail.value,
				message: createHTMLTemplateMailTemplate(CODE)
			};

			emailjs.send('default_service', 'template_lurnigu', templateParams)
				.then(function (response) {
					console.log('SUCCESS!', response.status, response.text);
				}, function (error) {
					console.log('FAILED...', error);
				});


		}

		function listenToKeyPressInInputVerificationCode(e) {
			console.log(`listenToKeyPressInInputVerificationCode`);
			console.log(e.key);
			if (e.key === 'Backspace' || e.key === 'Delete') {
				return
			}
			if (e.target.value.length > 1) {
				e.target.value = e.key
			}
			if (!e.target.nextSibling) {
				qs('.verificationCodeSubmit').focus();
				return;
			}
			e.target.nextSibling.focus();

		}
		// create the paste functionality
		function pasteEventInInput(e) {
			e.preventDefault();
			console.log(`pasteEventInInput`);
			let content = e.clipboardData.getData('text').split('')
			let nextTarget = e.target
			content.forEach((element, index) => {
				if (!nextTarget) {
					qs('.verificationCodeSubmit').focus();
					return;
				}
				nextTarget.value = element
				nextTarget.focus()
				nextTarget = nextTarget.nextSibling
			})
		}

		function registerButtonFunctionSubmitCode() {

			console.log(`registerButtonFunction`);
			// GET THE input values
			let userInputCode = ''
			qsa('.verificationInput > input').forEach((input) => {
				userInputCode += input.value
			})
			// check if the user input length is 4 to execute
			if (userInputCode.length < 4) {
				return
			}
			userInputCode = +userInputCode

			if (userInputCode === CODE) {

				createUserWithEmailAndPassword(auth, inputRegisterEmail.value, inputRegisterPassword.value)
					.then((userCredential) => {
						// Signed in 
						const user = userCredential.user;
						// add the username to the database
						USERNAME = inputRegisterUserName.value
						EMAIL = inputRegisterEmail.value


						try {
							// Add a new document in collection "cities"
							setDoc(doc(db, "USERS", EMAIL), {
								USERNAME
							}).then(response => {
								console.log("Document written with ID: ", response);
							});
						} catch (e) {
							console.error("Error adding document: ", e);
						}

						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						console.log('errorCode: ', errorCode);
						const errorMessage = error.message;
						console.log('errorMessage: ', errorMessage);
						// ..
						qs('.dialogBox').remove()
						inputRegisterEmail.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
					});

				//  delete verifiction dialog and show success dialog
				// add event lister to continue button
			} else {
				// empty the inputs field and show pop up  of error
				qsa('.verificationInput > input').forEach((input) => {
					input.value = ''
					input.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr_Red-100');
				})
				let errorMessage = createPageStructure._createErrorMessage(`verificationCodeIncorrect`)
				if (qs('.errorMessageText')) {
					qs('.errorMessageText').remove()
				}
				insertAfter(errorMessage, qs('.verificationInput'))
			}
		}
		//pop up window with verification code
		// type : accountSetting verificationCode successfullyCreatedAccount createNewRoom joinRoom uploadImg done changeName changePassword
		// uncomment the send mail function
		sendVerificationMail(inputRegisterEmail.value, CODE)
		showMeDialogBox('verificationCode')
		qsa('.verificationInput > input').forEach((input) => {
			addEventListener(input, 'keyup', listenToKeyPressInInputVerificationCode)
			addEventListener(input, 'paste', pasteEventInInput)
		})
		addEventListener(qs('.verificationCodeSubmit'), 'click', registerButtonFunctionSubmitCode)

	}
	// facebook authentication

	function _facebookLoginFireBase() {
		console.log(`__facebookLoginFireBase`);
		signInWithPopup(auth, providerFacebook)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;
				console.log('user: ', user);

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				const credential = FacebookAuthProvider.credentialFromResult(result);
				console.log('credential: ', credential);
				const accessToken = credential.accessToken;
				console.log('accessToken: ', accessToken);
				//email  displayName photoURL
				USERNAME = user.displayName
				console.log('USERNAME: ', USERNAME);
				EMAIL = user.email
				console.log('user.photoURL: ', user.photoURL);
				transitionBetweenAuthenAndNewAndjoinMeetingPage()
				PHOTO_URL = user.photoURL
				qs('.iconAccount').src = PHOTO_URL
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				console.log('errorCode: ', errorCode);
				const errorMessage = error.message;
				console.log('errorMessage: ', errorMessage);
				// The email of the user's account used.
				const email = error.customData.email;
				console.log('email: ', email);
				// The AuthCredential type that was used.
				const credential = FacebookAuthProvider.credentialFromError(error);
				console.log('credential: ', credential);

				// ...
			});

	}

	function _googleLoginFireBase() {
		console.log(`__googleLoginFireBase`);
		signInWithPopup(auth, providerGoogle)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);

				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log('user: ', user);
				USERNAME = user.displayName
				console.log('USERNAME: ', USERNAME);
				EMAIL = user.email
				console.log('user.photoURL: ', user.photoURL);
				transitionBetweenAuthenAndNewAndjoinMeetingPage()
				PHOTO_URL = user.photoURL
				qs('.iconAccount').src = PHOTO_URL
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				console.log('errorCode: ', errorCode);
				const errorMessage = error.message;
				console.log('errorMessage: ', errorMessage);
				// The email of the user's account used.
				// const email = error.customData.email;
				// console.log('email: ', email);
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log('credential: ', credential);
				// ...
			});
	}

	function _metaMaskLogin() {
		console.log(`_metaMaskLogin`);
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			console.log(`mobile browser`);
			alert(` This feature only available in laptop and desktop devices `)
		} else {
			console.log(`desktop browser`);
			if (typeof window.ethereum !== 'undefined') {
				console.log('MetaMask is installed!');
				ethereum.request({
					method: 'eth_requestAccounts'
				}).then((accounts) => {
					USERNAME = accounts[0]
					EMAIL = `METAMASK`
					console.log('USERNAME: ', USERNAME);
					transitionBetweenAuthenAndNewAndjoinMeetingPage()
				})
			} else {
				//dialogue box to install meta mask extention and show the link of the extention
				alert(` MetaMask is not installed! \n Please install MetaMask to use this feature. \n Click on the link below to install MetaMask. \n https://metamask.io/ `)
			}

		}
	}


	function _logOutFromFireBase() {
		console.log(`logOutFromFireBase`);
		auth.signOut().then(function () {
			// Sign-out successful.
			console.log('signOut successful');
		}).catch(function (error) {
			// An error happened.
			console.log('signOut error: ', error);
		});
	}

	function showMeDialogBox(type, normal = true) {
		if (qs('.dialogBox')) {
			qs('.dialogBox').remove()
		}
		let dialog = createPageStructure._createDialogBox(type)
		APP.appendChild(dialog)
		if (normal) {
			qs('.dialogBox').showModal();
		} else {
			qs('.dialogBox').show();
		}
	}

	function transitionBetweenAuthenAndNewAndjoinMeetingPage() {

		qs('title').innerHTML = 'CHA3MALET'
		console.log(`transitionBetweenAuthenAndNewAndjoinMeetingPage`);
		if (qs('.dialogBox')) {

			qs('.dialogBox').remove()
		}
		createPageStructure._newOrJoinMeeting()
		let newJoinMeetingPage = qs('.newJoinMeetingPage')
		// make the animation  and delelte the auth page and change the position from absolute to static
		newJoinMeetingPage.animate([
			// keyframes
			{
				left: '100%',
				backgroundColor: `hsla(0, 0%, 0%, 1)`,

			},
			{
				left: '0%',
				backgroundColor: `hsla(0, 0%, 16%, 1)`,
			}
		], {
			duration: 800,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});

		setTimeout(() => {
			if (qs('.registerSection')) {
				qs('.registerSection').remove()

			}
			if (qs('.loginSection')) {
				qs('.loginSection').remove()

			}
			if (qs('.authPage')) {

				qs('.authPage').remove()
			}
			qs('.newJoinMeetingPage').style.position = 'static'

		}, 500);

		addEventListener(qs('.iconAccount'), 'click', showAccountSetting)
		addEventListener(qs('.newMeeting'), 'click', createNewMeetingRoom)
		addEventListener(qs('.joinMeeting'), 'click', joinNewMeetingRoom)
	}

	function _resetYourPassword() {
		console.log(`reset mail`);
		showMeDialogBox('resetPassword')
		qs('.closeButton').addEventListener('click', () => {
			qs('.dialogBox').close();
		})
		// uncomment the code bellow
		qs(".resetYourPassword").addEventListener('click', () => {
			console.log(`reset your password`);
			let emailAddress = inputEmail.value;
			sendPasswordResetEmail(auth, emailAddress)
				.then(function () {
					// Email sent.
					console.log(`done`);
				})
				.catch(function (error) {
					console.log(`not sent yet`);
					console.log('error: ', error);
					// An error happened.
				});
		})
	}

	function uploadImageToDB() {
		console.log(`uploadImageToDB`);
		showMeDialogBox('uploadImg')
		addEventListener(qs('.uploadImgButton'), 'click', uploadProfilePhoto)

	}

	function continueButton() {
		qs('.dialogBox').remove()
	}
	// upload profile photo 
	function uploadProfilePhoto() {
		console.log(`upload profile photo`);
		let photoUpload = createElement('input', {
			type: 'file',
			className: 'photoUpload'
		})
		photoUpload.click()
		photoUpload.addEventListener('change', () => {
			console.log(`photo upload`);
			let file = photoUpload.files[0];
			qs('.iconAccount').src = URL.createObjectURL(file)
			console.log('file: ', file);
			console.log(typeof (file));
			const storage = getStorage();
			const storageRef = ref(storage, EMAIL);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on('state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					console.log('error: ', error);
					// Handle unsuccessful uploads
				},
				() => {
					console.log(`uploaded succesfuly`);
					qs('.dialogBox').remove()
					showMeDialogBox('done')
					addEventListener(qs('.continueButton'), 'click', continueButton)
				}
			);


		})
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
		let registerLinkInLoginSmallScreen = qs('.dontHaveAccount>a')
		let loginButton = qs('.loginSection>.loginButton')
		let registerButton = qs('.registerSection>.registerButton')
		let facebookLoginButton = qs('.loginSection>.groupFacebookGoogleMetaMask>.iconFacebook')
		let googleLoginButton = qs('.loginSection>.groupFacebookGoogleMetaMask>.iconGoogle')
		let metaMaskLoginButton = qs('.loginSection>.groupFacebookGoogleMetaMask>.iconMetaMask')
		let facebookRegisterButton = qs('.registerSection>.groupFacebookGoogleMetaMask>.iconFacebook')
		let googleRegisterButton = qs('.registerSection>.groupFacebookGoogleMetaMask>.iconGoogle')
		let metaMaskRegisterButton = qs('.registerSection>.groupFacebookGoogleMetaMask>.iconMetaMask')


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
		if (registerLinkInLoginSmallScreen) {
			addEventListener(registerLinkInLoginSmallScreen, 'click', _bringRegisterPageFromLinkInLoginPage)
		}
		if (loginButton) {
			addEventListener(loginButton, 'click', _loginFireBase)
		}
		if (registerButton) {
			addEventListener(registerButton, 'click', _registerFireBase)
		}
		if (facebookLoginButton) {
			addEventListener(facebookLoginButton, 'click', _facebookLoginFireBase)
		}
		if (googleLoginButton) {
			addEventListener(googleLoginButton, 'click', _googleLoginFireBase)
		}
		if (metaMaskLoginButton) {
			addEventListener(metaMaskLoginButton, 'click', _metaMaskLogin)
		}
		if (facebookRegisterButton) {
			addEventListener(facebookRegisterButton, 'click', _facebookLoginFireBase)
		}
		if (googleRegisterButton) {
			addEventListener(googleRegisterButton, 'click', _googleLoginFireBase)
		}
		if (metaMaskRegisterButton) {
			addEventListener(metaMaskRegisterButton, 'click', _metaMaskLogin)
		}
		// use built in methode and show dialog mail
		if (qs(".resetYourPassword")) {
			addEventListener(qs(".resetYourPassword"), 'click', _resetYourPassword)
		}

	}
	// join and new meeting room functionality  accountSettingDialogBox
	//---> account setting
	function _backToRoomPageFromAccountSetting() {

		// console.log(`backToHomePageFromRegisterPageInSmallScreen`);
		qs('.accountSettingPageSmallScreens').animate([
			// keyframes
			{
				top: '0',
			},
			{
				top: '-120%',
			}
		], {
			duration: 800,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity

		});

		setTimeout(() => {
			qs('.accountSettingPageSmallScreens').remove()
		}, 1000);
	}

	function editProfileName() {
		console.log('edit profile name')
		showMeDialogBox('changeName')
		//changeNameButton changePasswordButton changeNameInput changePasswordInput changePasswordInput2
		addEventListener(qs('.changeNameButton'), 'click', changeNameButton)

		function changeNameButton() {
			console.log(`changeNameButton`);
			if (!qs('.changeNameInput').value) {
				return
			}

			try {
				// Add a new document in collection "cities"
				setDoc(doc(db, "USERS", EMAIL), {
					USERNAME: qs('.changeNameInput').value
				}).then(response => {
					qs('.dialogBox').remove()
					console.log("Document written with ID: ", response);
					showMeDialogBox('done')
					qs('.continueButton').addEventListener('click', () => {

						qs('.dialogBox').remove()
						window.location.reload();

					})

				});
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}


		//chekck if the mail in the firestore first
		// console.log(db);
		// console.log('usersCollectionRef: ', usersCollectionRef);
		// if yes, then update the name
		// if no, then create a the mail to fireStore and create username
	}

	function changeProfilePhoto() {
		console.log('change profile photo')
		uploadImageToDB()
	}

	function changePassword() {
		console.log('change password')
		showMeDialogBox('changePassword')
		addEventListener(qs('.changePasswordButton'), 'click', changePasswordButton)

		function changePasswordButton() {
			console.log(`change password`);
			let oldPassword = qs('.changePasswordInput2').value
			let newPassword = qs('.changePasswordInput').value
			if (!qs('.changePasswordInput').value) {
				return
			}
			const user = auth.currentUser;
			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				oldPassword
			)
			reauthenticateWithCredential(auth.currentUser, credential).then(() => {
				// User re-authenticated.
				console.log('User re-authenticated: ');
				updatePassword(user, newPassword).then(() => {
					// Update successful.
					console.log(' Update successful: ');
					qs('.dialogBox').remove()
					showMeDialogBox('done')
					qs('.continueButton').addEventListener('click', () => qs('.dialogBox').remove())
				}).catch((error) => {
					console.log('error: ', error);
					// An error ocurred
				});
			}).catch((error) => {
				console.log('error: ', error);
				// An error ocurred
				// ...
			});


		}
	}

	function logOutProfile() {
		console.log('log out profile')
		_logOutFromFireBase()
		//refrech page javascript
		location.reload()

	}

	function closeAccountSettingDialogueBox(e) {
		//add evet listener to the dialogue box button editNameSection changePasswordSection logOutSection changeProfilePhotoSection
		if (qs('.editNameSection')) {

			addEventListener(qs('.editNameSection'), 'click', editProfileName, {
				once: true
			})
		}
		if (qs('.changePasswordSection')) {
			addEventListener(qs('.changePasswordSection'), 'click', changePassword, {
				once: true
			})

		}

		if (qs('.logOutSection')) {
			addEventListener(qs('.logOutSection'), 'click', logOutProfile, {
				once: true
			})
		}

		if (qs('.changeProfilePhotoSection')) {
			addEventListener(qs('.changeProfilePhotoSection'), 'click', changeProfilePhoto, {
				once: true
			})
		}



		if (e.target !== qs('.accountSettingDialogBox') && e.target !== qs('.profileName') && e.target !== qs('.iconAccount')) {
			console.log(`close account setting dialogue box`);
			if (qs('.accountSettingDialogBox')) {

				qs('.accountSettingDialogBox').close()
			}
			removeEventListener(qs('body'), 'click', closeAccountSettingDialogueBox)
		}
	}

	function showAccountSetting() {
		console.log(`showAccountSetting`);
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// show mobile page version  _createAccountSettingPageSmallScreens()
			let AccountSettingPageSmallScreens = createPageStructure._createAccountSettingPageSmallScreens()
			APP.appendChild(AccountSettingPageSmallScreens)
			qs('.profilePhoto').src = qs('.iconAccount').src
			qs('.profileName').innerHTML = USERNAME
			if (PHOTO_URL) {
				qs('.profilePhoto').src = PHOTO_URL
			}
			qs('.accountSettingPageSmallScreens').animate([
				// keyframes
				{
					top: '-100%',
					// backgroundColor: ''
				},
				{
					top: '0',
					// backgroundColor: `hsla(0, 0%, 7%, 0.5)`,
				},
				{
					top: '-10%',
					// backgroundColor: `hsla(0, 0%, 7%, 0.5)`,

				},
				{
					top: '0',
					// backgroundColor: `hsla(0, 0%, 7%, 0.5)`,

				}
			], {
				duration: 900,
				fill: 'both',
				easing: 'ease-in-out'
				// iterations: Infinity

			});
			addEventListener(qs('.accountSettingPageSmallScreens>img.backArrow'), 'click', _backToRoomPageFromAccountSetting, {
				once: true
			})
			slideME('up', qs('.accountSettingPageSmallScreens'))
			addEventListener(qs('.editNameSection'), 'click', editProfileName)
			addEventListener(qs('.changePasswordSection'), 'click', changePassword)
			addEventListener(qs('.logOutSection'), 'click', logOutProfile)
			addEventListener(qs('.changePhotoIcon'), 'click', changeProfilePhoto)
		} else {
			showMeDialogBox('accountSetting', false)
			qs('.profileName').innerHTML = USERNAME
			addEventListener(qs('body'), 'click', closeAccountSettingDialogueBox)

		}
		if (EMAIL == `METAMASK`) {
			qs('.editNameSection').remove()
			qs('.changePasswordSection').remove()
			qs('.changeProfilePhotoSection').remove()
		}

	}
	//TODO create new room
	function createNewMeetingRoom() {
		console.log(`createNewMeetingRoom`);
		showMeDialogBox('createNewRoom')
		addEventListener(qs('.checkBox'), 'click', checkBoxF)

		//NOTE uncommen the first and delete the seconde

		// addEventListener(qs('.createRoomButton'), 'click', createRoom)
		addEventListener(qs('.createRoomButton'), 'click', getVideoAndTextChatRoomPage)



		function checkBoxF() {
			if (qs('.checkBox').checked == true) {
				console.log(`checked`);
				let inputPasswordroom = createElement('input', {
					class: 'inputPasswordroom',
					type: 'text',
					placeholder: 'Room Password'
				})
				insertAfter(inputPasswordroom, qs('.inputNameroom'))
			} else {
				console.log(`unchecked`);
				qs('.inputPasswordroom').remove()
			}
		}

		function createRoom() {
			let roomName = qs('.inputNameroom').value
			let roomInfo = null
			if (!qs('.inputNameroom').value) {
				return
			}
			console.log(`create room`);
			if (qs('.checkBox').checked == true) {
				roomInfo = {
					privateRoom: true,
					password: qs('.inputPasswordroom').value
				}

			} else {
				roomInfo = {
					privateRoom: false,
					password: ``
				}
			}
			//create a collection
			try {
				// Add a new document in collection "cities"
				setDoc(doc(db, "ROOMS", roomName), {
					roomInfo
				}).then(response => {
					console.log("Document written with ID: ", response);
					getVideoAndTextChatRoomPage()
				});
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}

		function getVideoAndTextChatRoomPage() {
			//TODO bring the video and text page
			console.log(`getVideoAndTextChatRoomPage`);
			qs('.dialogBox').remove()

			createPageStructure._createPageOfMeeting()
			var pageOfMeeting = document.querySelector('.pageOfMeeting');
			qs('.newJoinMeetingPage').style.opacity = '0'
			pageOfMeeting.animate([
				// keyframes
				{
					opacity: '0'
				},
				{
					opacity: '1'
				}
			], {
				duration: 700,
				fill: 'both',
				easing: 'ease-in-out'
				// iterations: Infinity
				
			});
			setTimeout(() => {
				qs('.newJoinMeetingPage').remove()
			pageOfMeeting.style.position = 'static'
			}, 1000)
			//FIXME delete that after messages are implemented
			//  -[] add message to the section
			// let messageTemplate = createPageStructure._createMessageTemplate(`Welcome to the room this is my first message`, `/assets/icons/user-two.svg`, `Marwen Labidi`, `${new Date().toLocaleString()}`)
			// let messageTemplateForMe=createPageStructure._createMessageTemplateForMe(`i sent this messg knowwh `)
			// _addMessageToChatSection(messageTemplate)
			// _addMessageToChatSection(messageTemplateForMe)
			//-[] add participants to the section
			// let participants=createPageStructure._createAccountImageAndName(`Marwen Labidi`,`/assets/icons/user-two.svg`)
			// _addParticipantToTheSectionParticipants(participants)
		}

		// //create two subCollection
		// const docRef = doc(db, `ROOMS`, roomName);
		// const docSubcollectionRef = collection(docRef, 'ICE_CANDIDATES');
		// const docSubcollectionRef2 = collection(docRef, 'ICE_CANDIDATES-responce');

		//TODO Add a new document in subcollection "ICE_CANDIDATES"
		//NOTE use set if you want specigy the document name
		// addDoc(docSubcollectionRef, {}).then(response => {
		// 	console.log("Document written with ID: ", response);
		// }	
		// ).catch(error => {
		// 	console.error("Error adding document: ", error);
		// }	)

		// addDoc(docSubcollectionRef2, {})
		// .then(response => {
		// 	console.log("Document written with ID: ", response);
		// }	
		// ).catch(error => {
		// 	console.error("Error adding document: ", error);
		// }	)
	}				
	//TODO join room
	function joinNewMeetingRoom() {
		console.log(`joinNewMeetingRoom`);
		//_createRoomsPage()
		createPageStructure._createRoomsPage()
		var roomPage = document.querySelector('.roomPage');
		qs('.newJoinMeetingPage').style.opacity = '0'
		roomPage.animate([
			// keyframes
			{
				opacity: '0'
			},
			{
				opacity: '1'
			}
		], {
			duration: 700,
			fill: 'both',
			easing: 'ease-in-out'
			// iterations: Infinity
			
		});
		setTimeout(() => {
			qs('.newJoinMeetingPage').remove()
		roomPage.style.position = 'static'
		}, 1000)

		//get collection data

		// getDocs(collection(db, `ROOMS`))
		// 	.then(querySnapshot => {
		// 		querySnapshot.forEach((doc) => {
		// 			// console.log(`${doc.id} => ${doc.data().name}`);
		// 			console.log(`${doc.id} => ${doc.data().roomInfo.privateRoom}`);
		// 		});
		// 	})
		// 	.catch(error => {
		// 		console.log('error: ', error);
		// 	});

		//get subCollection data
		// const subColRef = collection(db, "ROOMS", "rooomo namou", "ICE_CANDIDATES");
		// getDocs(subColRef)
		// 	.then(querySnapshot => {
		// 		querySnapshot.forEach((doc) => {
		// 			console.log(`${doc.id} => ${doc.data()}`);
		// 		});
		// 	})
		// 	.catch(error => {
		// 		console.log('error: ', error);
		// 	});

	}
	return {
		_addAuthenticationEventListeners,
		transitionBetweenAuthenAndNewAndjoinMeetingPage
	}
})()

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log('user: ', user);
		EMAIL = user.email
		console.log('EMAIL: ', EMAIL);
		getDocs(collection(db, `USERS`))
			.then(querySnapshot => {
				querySnapshot.forEach((doc) => {
					// console.log(`${doc.id} => ${doc.data().USERNAME}`);
					if (doc.id == EMAIL) {
						USERNAME = doc.data().USERNAME
						console.log('USERNAME: ', USERNAME);
					}
				});
			})
			.catch(error => {

				USERNAME = user.displayName
			});

		// get the username from the database
		const q = query(collection(db, EMAIL));
		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.id, " => ", doc.data());
				USERNAME = doc.data().USERNAME
				console.log('USERNAME: ', USERNAME);
			})
		})
		PHOTO_URL = user.photoURL
		console.log('PHOTO_URL: ', PHOTO_URL);
		createPageFunctionality.transitionBetweenAuthenAndNewAndjoinMeetingPage()
		//get profile photo
		const storage = getStorage();
		const storageRef = ref(storage, EMAIL);
		getDownloadURL(storageRef)
			.then((url) => {
				// Insert url into an <img> tag to "download" profilePhoto
				if (qs('.iconAccount')) {

					qs('.iconAccount').src = url;
				} else {

					qs('.profilePhoto').src = url;
				}
			})
			.catch((error) => {
				if (qs('.iconAccount')) {

					qs('.iconAccount').src = user.photoURL
				} else {

					qs('.profilePhoto').src = user.photoURL
				}

			});
	} else {
		// User is signed out
		console.log(' user is signed out: ', user);
		createPageStructure._authentication()
		createPageFunctionality._addAuthenticationEventListeners()
	}
});