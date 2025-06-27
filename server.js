import { app } from './app.js';

const PORT_SERVER = 3000
app.listen(PORT_SERVER, () => {
    console.log(`${Date.now().toString()}: Server Running at http://localhost:${PORT_SERVER}`);
});