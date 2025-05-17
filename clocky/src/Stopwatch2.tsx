import { useEffect, useState, useRef } from "react";

type Phase = "green" | "red";

const Stopwatch = ({
                       greenDuration = 5,
                       redDuration = 2,
                       totalDuration = 30,
                   }: {
    greenDuration?: number;
    redDuration?: number;
    totalDuration?: number;
}) => {
    const [running, setRunning] = useState(false);
    const [totalTimeLeft, setTotalTimeLeft] = useState(totalDuration);
    const [phase, setPhase] = useState<Phase>("green");
    const [phaseTimeLeft, setPhaseTimeLeft] = useState(greenDuration);
    const [redDuration1, setRedDuration1] = useState<number>(redDuration);
    const [isChanging, setIsChanging] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        if (!running && totalTimeLeft > 0) {
            setRunning(true);
        }
    };

    const stop = () => {
        setRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const reset = () => {
        stop();
        setTotalTimeLeft(totalDuration);
        setPhase("green");
        setPhaseTimeLeft(greenDuration);
    };

    const handleChangeGreen = (e) => {
        setPhaseTimeLeft(e.target.value);
    }

    const handleChangeRed = (e) => {
        setRedDuration1(e.target.value);
    }


    const handleChangeTotalTime = (e) => {
        setTotalTimeLeft(e.target.value);
    }

    useEffect(() => {
        if (!running) return;

        intervalRef.current = setInterval(() => {
            setTotalTimeLeft((prevTotal) => {
                if (prevTotal <= 1) {
                    clearInterval(intervalRef.current!);
                    setRunning(false);
                    return 0;
                }
                return prevTotal - 1;
            });

            setPhaseTimeLeft((prevPhaseTime) => {
                if (prevPhaseTime <= 1) {
                    const nextPhase = phase === "green" ? "red" : "green";
                    const nextDuration = nextPhase === "green" ? phaseTimeLeft : redDuration1;
                    setPhase(nextPhase);
                    return nextDuration;
                }
                return prevPhaseTime -1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running, phase, phaseTimeLeft, redDuration1]);

    return (
        <div style={{ textAlign: "center", fontSize: "1.5rem", padding: "1rem" }}>
            <div style={{ color: phase === "green" ? "green" : "red", fontSize: "2rem" }}>
                {phase.toUpperCase()}
            </div>
            <div>Total Time Left: {totalTimeLeft}s</div>
            <div>Phase Time Left: {phaseTimeLeft}s</div>

            <div style={{ marginTop: "1rem" }}>
                <button onClick={start} disabled={running}>Start</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
                {!isChanging && (<button onClick={() => setIsChanging(true)}>CHANGE</button>)}


            </div>

            {isChanging && (
                <div style={{ marginTop: "50px", display: "flex", flexDirection: "column" }} >
                    <input placeholder={'GREEN'} type="text" onChange={handleChangeGreen} value={phaseTimeLeft} />
                    <input placeholder={'RED'} type="text" onChange={handleChangeRed} value={redDuration1} />
                    <input placeholder={'Total time'} type="text" onChange={handleChangeTotalTime} value={totalTimeLeft} />
                    <button onClick={() => setIsChanging(false)} >SAVE OPTIONS</button>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
