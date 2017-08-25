#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))

cd "${ROOT}"

case "${1}" in
    "start")
        export BUILD_MODE=devel
        node_modules/.bin/rollup --config &&
            node webpack.dev.server.js || exit $?
        ;;
        
    "build")
        export BUILD_MODE=production
        node_modules/.bin/rollup --config || exit $?
        ;;
        
    "build-optimized")
        export BUILD_MODE=compressed
        node_modules/.bin/rollup --config || exit $?
        ;;
        
    *)
        export BUILD_MODE=unit-test
        xvfb-run node_modules/.bin/karma start karma.config.js || exit $?
        #node_modules/.bin/karma start karma.config.js || exit $?
        ;;
esac

exit 0
