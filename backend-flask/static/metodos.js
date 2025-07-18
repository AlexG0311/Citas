async function incrementCounter() {
    const response = await fetch('/increment', { method: 'POST' });
    const data = await response.json();
    document.getElementById('counter').innerText = `Contador: ${data.counter}`;
}