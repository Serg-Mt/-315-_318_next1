import { Nav } from '../components/Nav';


export default function App({ Component, pageProps }) {
  return <>
    <header>
      <Nav/>
    </header>
    <hr />
    <Component {...pageProps} />
    <hr />
    <footer>
      (с)2025
    </footer>

  </>
}