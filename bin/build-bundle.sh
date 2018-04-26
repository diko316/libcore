#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))
TOOLS=$(dirname $(readlink -f $0))
ROOT=$(dirname $(dirname $(readlink -f $0)))
CURRENT_DIR=$(pwd)

cd "${ROOT}"

auto-sync

echo "building... ${1}";

case "${1}" in
    "start")
        echo "watching src demo.."
        #${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/src" "${TOOLS}/build-devel.sh"
        npm run start || exit $?
        ;;
        
    "build")
        npm run build || exit $?
        ;;
        
    "build-optimized")
        npm run build-optimized || exit $?
        ;;

    "devel-test")
        npm run devel-test || exit $?
        ;;

    *)
        npm run test || exit $?
        ;;
esac

exit 0
