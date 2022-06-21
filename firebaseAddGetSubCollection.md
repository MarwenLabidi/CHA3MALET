	        <!-- get collection data -->

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


		// //create two subCollection
		// const docRef = doc(db, `ROOMS`, roomName);
		// const docSubcollectionRef = collection(docRef, 'ICE_CANDIDATES');
		// const docSubcollectionRef2 = collection(docRef, 'ICE_CANDIDATES-responce');

		//---> Add a new document in subcollection "ICE_CANDIDATES"
		//---> use set if you want specigy the document name
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




							//TODO create 3 sub collections calls messages users
					// add yourself to the user and admin role when you get out from the room the room it after a spesific amount of time
					//add image to the user photoAccountCardimgae
					// console.log('photoAccountCardimgae: ', photoAccountCardimgae);
					const docRef = doc(db, `ROOMS`, roomName);
					const docSubcollectionCALLS = collection(docRef, 'CALLS');
					const docSubcollectionMESSAGES = collection(docRef, 'MESSAGES');
					const docSubcollectionJOINED_USERS = collection(docRef, 'JOINED_USERS');
					
					addDoc(docSubcollectionCALLS, {}).then(response => {
						console.log("Document written with ID: ", response);
					}	
					).catch(error => {
						console.error("Error adding document: ", error);
					}	)
					addDoc(docSubcollectionMESSAGES, {}).then(response => {
						console.log("Document written with ID: ", response);
					}	
					).catch(error => {
						console.error("Error adding document: ", error);
					}	)
					addDoc(docSubcollectionJOINED_USERS, {}).then(response => {
						console.log("Document written with ID: ", response);
					}	
					).catch(error => {
						console.error("Error adding document: ", error);
					}	)



