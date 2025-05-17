import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Stopwatch2 from "./Stopwatch2.tsx";
import Stopwatch from "./Stopwatch.tsx";
import ColorTimer from "./NewClock.tsx";

createRoot(document.getElementById('root')!).render(
      <ColorTimer />
)
