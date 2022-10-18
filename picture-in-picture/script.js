const videoElement = document.querySelector('#video');
const buttonElement = document.querySelector('#button');

// promp to select media stream, pass to video element, then play
async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.addEventListener('loadedmetadata', ()=> {
			videoElement.play();
		})
	} catch (error) {
		console.log(error);
	}


}

buttonElement.addEventListener('click', async () => {
	// disable button
	buttonElement.disabled = true;

	// Start Picture in Picture
	await videoElement.requestPictureInPicture();
	// reset button
	buttonElement.disabled = false;
});

selectMediaStream();