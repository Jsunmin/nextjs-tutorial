import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css';

const name = 'JSM'
export const siteTitle = 'Next.js Sample Website'


type Props = {
  children: React.ReactNode,
  home?: boolean
};

export default function Layout({ children, home }: Props) {
    console.log(children, home, 'in layout')
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {home ? (
                <>
                    <img
                    src="/images/profile.jpg"
                    className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                    alt={name}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
                ) : (
                <>
                    <Link href="/">
                        <a>
                            <img
                            src="/images/profile.jpg"
                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                            alt={name}
                            />
                        </a>
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                        <Link href="/">
                            <a className={utilStyles.colorInherit}>{name}</a>
                        </Link>
                    </h2>
                </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
        </div>
    );
}

// Important: To use CSS Modules, the CSS file name must end with .module.css  ~  xxx.css시 에러..
// css 모듈: 고유한 클래스명을 자동 생성 (충돌걱정X) & css또한 각페이지당의 파일만 code splitting 되어 전달됨 : To 번들 최소화!