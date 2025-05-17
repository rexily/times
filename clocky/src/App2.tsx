import './App.css'
import React from "react";

function App2() {

    const [isGreen, setIsGreen] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsGreen((prev) => !prev); // toggle every 2 seconds
        }, 2000);

        return () => clearInterval(interval); // clean up
    }, []);

    return (
        <div style={{ fontSize: "2rem", color: isGreen ? "green" : "red" }}>
            {isGreen ? "Green" : "Red"}
        </div>
    );
}

export default App2
