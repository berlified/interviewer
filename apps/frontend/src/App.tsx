import { use, useState } from "react";
import "../styles/globals.css"
import { Form } from "./components/Form";
import { Interview } from "./components/Interview";
import { Results } from "./components/Result";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";

export function App() {

  
  const [page, setPage] = useState<"form" | "interview" | "results">("form")

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Form />}/>
          <Route path="/interview/:id" element={<Interview />}/>
          <Route path="/result/:id" element={<Results />}/>
      </Routes>
    </BrowserRouter>
      
    
  )
}

export default App;