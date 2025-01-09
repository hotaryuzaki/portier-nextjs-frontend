import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;