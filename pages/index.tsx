import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, aPost } from '../lib/posts'

// getStaticProps함수를 선언하면, 인자가 붙는다. ~ 아래 함수에서는, allPostsData
export async function getStaticProps() {
  console.log('사전 렌더링을 도와주는 얘는 언제 실행될까?')
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
/*
 * getStaticProps: 이것은 서버 측 에서만 실행 되기 때문에 가능 합니다. 클라이언트 측에서는 실행되지 않습니다.
 * 브라우저 용 JS 번들에도 포함되지 않습니다. 즉, 브라우저로 보내지 않고도 직접 데이터베이스 쿼리와 같은 코드를 작성할 수 있습니다.
 * 선언된 특정 페이지에서만 실행되며, 프로덕션에서는 빌드된 상황에서만 실행된다 (아마 최초 한번?!) ~ 데브때에는 매 요청당 수행!
 */


type props = {
  allPostsData: [
    aPost
  ]
};
export default function Home({ allPostsData }: props) {
  console.log(arguments, 'home running')
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a dev version website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}


// Static Generation (Recommended): The HTML is generated at build time and will be reused on each request. ( 사용자 선택 전에 미리 렌더 가능하냐? - 개인화가 없냐? - 정적 렌더 )
// Server-side Rendering: The HTML is generated on each request. ( 개인화되어 데이터가 달라진다 -> ssr ㄱㅊ )
// ~ nextj로 두 개 mix 가능!
