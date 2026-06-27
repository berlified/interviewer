import { BACKEND_URL } from "@/config";
import { useEffect, useRef } from "react"
import { useParams } from "react-router"
import { DeepgramClient } from "@deepgram/sdk";
const client = new DeepgramClient();



export function Interview() {

    const {interviewId} = useParams();
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => { 

        (async () => {
            // Creating a new WebRTC peer connection
        const pc = new RTCPeerConnection();

        // Set up to play remote audio from the model || send audio from openAI to browser.
        audioRef.current = document.createElement("audio");
        audioRef.current.autoplay = true;

        pc.ontrack = (e) => (audioRef.current!.srcObject = e.streams[0]!);

        // Add local audio track for microphone input in the browser || access microphone
        const ms = await navigator.mediaDevices.getUserMedia({
        audio: true,
        });

        const socket= new WebSocket('wss://api.deepgram.com/v1/listen', [
            'token',
            '2f83ea0b8035d55574939d8c7d70473967684c1c'
        ]);

        socket.onopen = () => {
            const mediaRecorder = new MediaRecorder(ms, { mimeType: 'audio/webm'});
            mediaRecorder.start(250);
            mediaRecorder.addEventListener('dataavailable', (event) => {
                socket.send(event.data);
            })
        }

        socket.onmessage = (message) => {
            const received = JSON.parse(message.data);
            const transcript = received.channel.alternatives[0].transcript;

            if(transcript) {
                console.log(transcript);
            }
        }

        // add microphone to the call.
        pc.addTrack(ms.getTracks()[0]!);

        // Set up data channel for sending and receiving events
        // const dc = pc.createDataChannel("oai-events");

        // Start the session using the Session Description Protocol (SDP)
        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);
        console.log("hi!")

        const sdpResponse = await fetch(`${BACKEND_URL}/api/v1/session/${interviewId}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
            "Content-Type": "application/sdp",
        },
        });

        console.log("helloee")
        const answer = {
        type: "answer" as "answer",
        sdp: await sdpResponse.text(),
        };
        await pc.setRemoteDescription(answer);
        })();
    }, [interviewId])
    
    return <div>
        <audio autoPlay ref={audioRef}>
            
        </audio>
        Interview section and page
    </div>
}