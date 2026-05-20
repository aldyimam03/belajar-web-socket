import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express(); 
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
    res.send("Web Socket Server is running");
});

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send("Halo! ini pesan dari server!");

    ws.on("message", (message) => {
        // Konversi pesan ke string
        const text = message.toString();

        // Log pesan yang diterima
        console.log(`Received message: ${text}`);

        // Kirim balasan ke klien
        ws.send(`Server menerima: ${text}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("error", (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});