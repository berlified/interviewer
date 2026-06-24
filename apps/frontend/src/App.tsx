import { use, useState } from "react";
import "../styles/globals.css"
import { Form } from "./components/Form";
import { Interview } from "./components/Interview";
import { Results } from "./components/Result";
import { Toaster } from "sonner";

export function App() {

  
  const [page, setPage] = useState<"form" | "interview" | "results">("form")

  return (
    <div>
      <Toaster />
      {page == "form" && <Form />}
      {page == "interview" && <Interview />}
      {page == "results" && <Results />}
      
    </div> 
  )
}

export default App;