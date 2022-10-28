import Dashboard from "../layout/Dashboard"

export default function MyApp({ Component, pageProps }) {
    return (
        <Dashboard>
            <Component {...pageProps} />
        </Dashboard>
    )
}