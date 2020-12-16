import Head from "next/head";
import { useSocketIO } from "../hooks/useSocketio";

const url = `https://be-dice-reborn.herokuapp.com/`;

export default function App() {
  const { socket, socketConnected } = useSocketIO(url);

  return (
    <div>
      <Head>
        <title>Be dice app</title>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>

      <main>
        <p>Debug page</p>
        <p>Connection status: {socketConnected.toString()}</p>
      </main>
      <button
        onClick={() => {
          if (socket.connected) {
            socket.disconnect();
          } else {
            socket.connect();
          }
        }}
      >
        {socket?.connected ? `Disconnect` : `Connect`}
      </button>

      <footer>Footer</footer>
    </div>
  );
}
