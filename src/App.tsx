import { useEffect, useState } from "react";

function App() {
    const [rows, setRows] = useState<number[]>([]);
    const [worker, setWorker] = useState<Worker | null>(null);

    const start = () => {
        worker?.postMessage("start");
    };

    useEffect(() => {
        const localWorker = new Worker(
            new URL("./worker.tsx", import.meta.url),
            {
                type: "module",
            },
        );
        localWorker.onmessage = () => {
            const tempRows = [];
            for (let i = 0; i < 10000; i++) {
                tempRows.push(Math.random() * 10000);
            }
            setRows(tempRows);
        };
        setWorker(localWorker);
        return () => {
            localWorker.terminate();
        };
    }, []);

    return (
        <>
            <button onClick={start}>Start</button>
            <ul>
                {rows.map((i, row) => (
                    <ul key={i}>{row}</ul>
                ))}
            </ul>
        </>
    );
}

export default App;
