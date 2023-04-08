import Dashboard from "../layout/Dashboard"
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css'
import { AppContextProvider } from "../context/AppContext";
import Notify from "../components/Snackbar";
import Loader from "../components/Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import MUITheme from "../theme/MUITheme";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.events.on('routeChangeStart', () => setLoading(true));
        router.events.on('routeChangeComplete', () => setLoading(false));
        router.events.on('routeChangeError', () => setLoading(false));
    }, []);

    return (
        <>
            <Head>
                <title>MedicApp</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <AppContextProvider>
                <MUITheme>
                    {
                        ['/login', '/_error', '/'].includes(router.pathname)
                            ? <Component {...pageProps} />
                            : <Dashboard>
                                {
                                    loading
                                        ? <Spinner minHeight="80vh" />
                                        : (
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={router.route}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Component {...pageProps} />
                                                </motion.div>
                                            </AnimatePresence>
                                        )
                                }
                            </Dashboard>
                    }
                    <Loader />
                    <Notify />
                </MUITheme>
            </AppContextProvider>
        </>
    )
}