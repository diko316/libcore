'use strict';

import browsersync from 'rollup-plugin-browsersync';

export default
    function configure(config) {
        config.plugins.
            push(browsersync({
                    server: 'dist'
                }));
    }