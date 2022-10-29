import Dashboard from "../layout/Dashboard"
import Head from "next/head"
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>MedicApp</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {
                ['/login', '/_error'].includes(router.pathname) ? <Component {...pageProps} /> : <Dashboard><Component {...pageProps} /></Dashboard>
            }
        </>
    )
}