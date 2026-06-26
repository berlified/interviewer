import { BACKEND_URL } from "@/config";
import { useEffect, useRef } from "react"
import { useParams } from "react-router"

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