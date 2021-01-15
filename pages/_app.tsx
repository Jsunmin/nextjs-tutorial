import { AppProps } from 'next/app';
import '../styles/global.css'

// 만약 모든 페이지에 어떤 CSS를 로드하고 싶다면 pages 밑에 _app.js 라는 파일을 만들어서 이렇게 적어야 한다.
export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
  