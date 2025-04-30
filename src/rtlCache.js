// src/rtlCache.js
import createCache from '@emotion/cache'
import StylisPluginRtl from 'stylis-plugin-rtl'

const rtlCache = createCache({
    key: 'mui-rtl', // This key is important for Material-UI's integration
    stylisPlugins: [StylisPluginRtl],
})

export default rtlCache
