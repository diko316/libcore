#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))
CURRENT_DIR=$(pwd)
TARGET=${ROOT}/dist

cd "${ROOT}"

if [ -d ${TARGET} ]; then
    
    if chown $(stat -c '%u:%g' ${TARGET}) -R ${TARGET}/*; then
        echo "* Built all sources to output directory."
    else
        echo "! No builds as for now."
    fi
    exit 0

fi


echo "! Unable to build. ${TARGET} directory do not exist or not a directory."
exit 1
