import '../styles/globals.css';
import '../styles/fonts/fonts.css';

import { ErrorBoundary } from '../components';



// <ErrorBoundary FallbackComponent={ErrorFallback} />

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
