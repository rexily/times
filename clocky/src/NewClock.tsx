import React, {useEffect, useRef, useState} from 'react';

const ColorTimer: React.FC = () => {
    const [greenDuration, setGreenDuration] = useState(5);
    const [redDuration, setRedDuration] = useState(2);
    const [totalDuration, setTotalDuration] = useState(30);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [color, setColor] = useState<'green' | 'red'>('green');
    const timerRef = useRef<number | null>(null);

    const handleNumericInput = (value: string, setter: (val: number) => void) => {
        if (/^\d*$/.test(value)) {
            setter(parseInt(value || '0'));
        }
    };

    useEffect(() => {
        if (!isRunning) return;

        const totalCycle = greenDuration + redDuration;

        timerRef.current = window.setInterval(() => {
            setTimeElapsed((prev) => {
                const newTime = prev + 1;

                const currentCycleTime = newTime % totalCycle;
                setColor(currentCycleTime < greenDuration ? 'green' : 'red');

                if (newTime >= totalDuration) {
                    setIsRunning(false);
                    return totalDuration;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerRef.current!);
    }, [isRunning, greenDuration, redDuration, totalDuration]);

    const handleStart = () => {
        if (timeElapsed < totalDuration) setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeElapsed(0);
        setColor('green');
        if (timerRef.current) clearInterval(timerRef.current);
    };

    return (
        <div style={{
            fontFamily: 'sans-serif',
            padding: '10px',
            border: '2px solid #000',
            margin: '0 auto',
            display: 'flex',
            flex: '1 0 auto',
        }}>
            <div style={{}} >
                <h2 style={{color}}>
                    Текущий цвет: {color.toUpperCase()}
                </h2>
                <p>Прошло времени: {timeElapsed}s / {totalDuration}s</p>

                <div style={{marginBottom: 12}}>
                    <label>
                        Зеленый (сек):
                        <input
                            type="text"
                            value={greenDuration}
                            onChange={(e) => handleNumericInput(e.target.value, setGreenDuration)}
                        />
                    </label>
                    <br />
                    <label>
                        Красный (сек):
                        <input
                            type="text"
                            value={redDuration}
                            onChange={(e) => handleNumericInput(e.target.value, setRedDuration)}
                        />
                    </label>
                    <br />
                    <label>
                        Общее время (сек):
                        <input
                            type="text"
                            value={totalDuration}
                            onChange={(e) => handleNumericInput(e.target.value, setTotalDuration)}
                        />
                    </label>
                </div>

                <button onClick={handleStart} disabled={isRunning}>Старт</button>
                <button onClick={handlePause} disabled={!isRunning}>Пауза</button>
                <button onClick={handleReset}>Сброс</button>
            </div>
        </div>
    );
};

export default ColorTimer;