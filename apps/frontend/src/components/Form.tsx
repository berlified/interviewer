import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react";
import { toast } from "sonner"
import { BACKEND_URL } from "@/config";
import axios from "axios";
 

export function Form() {

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

    async function onSubmit() {
        if(!github || !linkedin) {
            toast.warning("Please provide Github and Linkedin URL", {
                position: "top-center"
              })
              return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/pre-interview`, {
             linkedin,
             github 
        })
    }

    return <div className="h-screen w-screen flex justify-center items-center">
    <div>

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 justify-center flex">
        Ai interview Kickstart
      </h2>

      <Input placeholder="Linkedin URL" onChange={e => setLinkedin(e.target.value)} className="p-4 mt-2"/>

      <Input placeholder="Github URL "  onChange={e => setGithub(e.target.value)} className="p-4 mt-2"/>

      <div className="flex justify-center p-4">
        <Button onClick={onSubmit}> Start interview </Button>
      </div>
      
    </div>
  </div>
}
