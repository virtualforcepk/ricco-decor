import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Display face — Cormorant Garamond (high-contrast editorial serif)
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
// Body / UI face — Jost (light geometric sans)
import '@fontsource/jost/300.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'

import './index.css'

// vite-react-ssg drives both the client hydration and the static prerender of
// every route in `routes` (real HTML per page → crawlable + indexable).
export const createRoot = ViteReactSSG({ routes })
