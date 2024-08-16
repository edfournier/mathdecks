import { createServer } from "vite";

const server = await createServer({
    root: process.cwd(), 
    server: { port: 5173 }
});
await server.listen();

console.log("Vite server is running on port 5173");