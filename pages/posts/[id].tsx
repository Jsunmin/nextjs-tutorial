import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData, aPost } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

/**
 * 동적 라우팅 페이지
 * 1, 렌더할 리액트 컴포넌트가 있어야 하고
 * 2, getStaticPaths로 동적 변수가 포함하는 선택지들을 제공해야 하며 (배열)
 * 3, getStaticProps(요청시 실행되는)로 선택된 동적 변수에 대한 디테일 작업을 처리한다!!
 * 
 * 작업순서는 2 -> 3 -> 1
 */


// 목록은 단순한 문자열 배열 X, params키가 필수로 존재하는 객체 배열이어야 함! 그렇지 않으면 getStaticPaths 실패
//  Error: Additional keys were returned from `getStaticPaths` in page "/posts/[id]". URL Parameters intended for this dynamic route must be nested under the `params` key, i.e.:

// In development (npm run dev or yarn dev), getStaticPaths runs on every request.
// In production, getStaticPaths runs at build time.
export function getStaticPaths() {
    // 1번째 실행
    const paths = getAllPostIds()
    // 동적 경로중 ...을 쓰면, 모든 경로를 포착하도록 할 수 있음 (mix도 가능!)
    console.log('1 getStaticPaths', paths)
    return {
      paths,
      fallback: false
      // 참고 fallback
      // false: 없으면 404 / true: 대체html / 'blocking':  cached for future requests so it only happens once per path.
    }
}

type params = {
    // params는 필수이다!
    params: {
        id: string
    }
};
export async function getStaticProps({ params }: params) {
    // 2번째 실행
    console.log('2 getStaticProps', params)
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}


export default function Post({ postData }: {postData: aPost}) {
    console.log('3 Post', postData)
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
  }