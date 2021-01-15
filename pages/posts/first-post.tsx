import { IncomingMessage, ServerResponse } from 'http';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export async function getServerSideProps(context: { req: IncomingMessage, res: ServerResponse}) {
    console.log('매 요청마다 실행되는 이 친구는?!')
    return {
        props: {
            // props for your component
            hello: `${context.req.headers.host}${context.req.url}`
        }
    }
}

// Link는 클라이언트측  탐색으로 페이지를 옮김 (html 리로드 없다! = spa) ~ <a>면 전체 페이지 리로드가 일어나겠지?
// 외부 페이지 연결시 그냥 a 사용하기! (Link X) / 클래스 같은 속성 추가시도 link 안 a에 attr을 넣자!
export default function FirstPost() {
    console.log(arguments, 'in FirstPost')
    return (
    <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
            <a>Back to home</a>
            </Link>
        </h2>
    </Layout>
    );
}