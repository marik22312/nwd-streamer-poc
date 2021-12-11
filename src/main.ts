import './style.css'
import Peer from 'peerjs';

const peerIdInput = document.getElementById('peer-id-input');
const connectButton = document.getElementById('connect-video-button');
const connectMicButton = document.getElementById('connect-mic-button');
const videoDisplay = document.getElementById('video-display');
const audioDisplay = document.getElementById('audio-display');
const myPeerIdDisplay = document.getElementById('my-peer-id');
const peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	// @ts-expect-error
	myPeerIdDisplay.innerText = id;
  });

  // @ts-expect-error
  connectButton.addEventListener('click', async () => {
	  // @ts-expect-error
	  const mediaStream = await navigator.mediaDevices.getDisplayMedia({video: true});
	  // @ts-expect-error
	  const peerID = peerIdInput.value;
	// peer.connect(peerID)
	peer.call(peerID ,mediaStream, {
		metadata: {
			type: 'VIDEO'
		}
  })
});
  // @ts-expect-error
  connectMicButton.addEventListener('click', async () => {
	  const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
	  // @ts-expect-error
	  const peerID = peerIdInput.value;
	// peer.connect(peerID)
	const connection = peer.call(peerID, mediaStream, {
		metadata: {
			type: 'AUDIO'
		}
	})
  })

  peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	console.log('Call', call.metadata.type);
	call.answer()

	switch (call.metadata.type) {
		case 'VIDEO':gi
			console.log('SetVideo')
			call.on('stream', (stream) => {
				// @ts-expect-error
				videoDisplay.srcObject = stream;
			})
			return;
		case 'AUDIO':
			call.on('stream', stream => {
				//@ts-expect-error
				audioDisplay.srcObject = stream;
			})

		default: 
		console.log('Uknown')
	}
  })