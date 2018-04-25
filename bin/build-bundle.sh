#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))
TOOLS=$(dirname $(readlink -f $0))
ROOT=$(dirname $(dirname $(readlink -f $0)))
CURRENT_DIR=$(pwd)

cd "${ROOT}"

echo "building... ${1}";

case "${1}" in
    "start")
        ${TOOLS}/run-sync.sh
        echo "watching src demo.."
        ${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/src" "${TOOLS}/build-devel.sh" &
        npm run start || exit $?
        ;;
        
    "sync-demo")
        ${TOOLS}/run-sync.sh
        export BUILD_MODE=demo
        node_modules/.bin/rollup --config 'rollup.config.demo.js' || exit $?
        ;;
        
    "build")
        auto-sync
        export BUILD_MODE=production
        node_modules/.bin/rollup --config || exit $?
        echo "built.";
        ;;
        
    "build-optimized")
        export BUILD_MODE=compressed
        node_modules/.bin/rollup --config || exit $?
        ;;

    "devel-test")
        ${TOOLS}/run-sync.sh
        npm run devel-test || exit $?
        ;;

    *)
        ${TOOLS}/run-sync.sh
        npm run test || exit $?
        ;;
esac

exit 0
