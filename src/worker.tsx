function tick() {
    postMessage("go");
    for (let i = 0; i < 20; i++) {
        console.log(i);
    }
}

addEventListener("message", () => {
    setInterval(tick, 5);
});
