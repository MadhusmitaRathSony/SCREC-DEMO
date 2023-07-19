#!/usr/bin/env bash
# stop script on error
set -e

# # Check to see if AWS Device SDK for Python is already installed, install if not
# if ! python -c "import AWSIoTPythonSDK" &> /dev/null; then
#   printf "\nInstalling AWS SDK...\n"
#   pushd SCR-yogesh-pytest-IoT-Stack.NestedStack
#   pip install AWSIoTPythonSDK
#   result=$?
#   popd
#   if [ $result -ne 0 ]; then
#     printf "\nERROR: Failed to install SDK.\n"
#     exit $result
#   fi
# fi
# #!/bin/bash

# Check if AWS IoT package is installed
if python -c "import awsiotsdk" &> /dev/null; then
    echo "AWS Device SDK for Python is already installed."
else
    # Install AWS IoT package
    if command -v pip &> /dev/null; then
        pip install awsiotsdk
        echo "AWS Device SDK for Python installed successfully."
    else
        echo "pip is not installed. Please install pip before proceeding."
        exit 1
    fi
fi

# run pub/sub sample app using certificates downloaded in package
printf "\nRunning pub/sub sample application...\n"
python ./scripts/basicPubSub_443.py -id SCR-yogesh-pytest-Test-Camera-2 -e a2ejbkgs7492dl-ats.iot.ap-northeast-1.amazonaws.com -r /home/user1/Madhu/Demo_SCR/Smart_camera_recog_demo_backend/scripts/root-CA.cert -c /home/user1/Madhu/Demo_SCR/Smart_camera_recog_demo_backend/scripts/TestCamera1.cert.pem -k /home/user1/Madhu/Demo_SCR/Smart_camera_recog_demo_backend/scripts/TestCamera1.private.key -pt "SCR/yogesh/pytest/FacePacketFull/214748365" -st "SCR/yogesh/pytest/IdentificationStream/214748365"

# Use following stub to measure Round trip time, by feeding saved log file to Perf Utility.
# python ./scripts/basicPubSubRoundTrip.py -id SCR-yogesh-pytest-Test-Camera-1 -e a2ejbkgs7492dl-ats.iot.ap-northeast-1.amazonaws.com -r ./scripts/root-CA.crt -c ./scripts/TestCamera1.cert.pem -k ./scripts/TestCamera1.private.key \
# --siteId "214748365" --fps 10  -prj "SCR" -env "yogesh"  -branch "pytest"   &> aws_roundTrip_10FPS.logs

# Use following stub to use PORT 443 instead of 8883 (SEN LINE)
# python ./scripts/basicPubSub_443.py -id SCR-yogesh-pytest-Test-Camera-1 -e a2ejbkgs7492dl-ats.iot.ap-northeast-1.amazonaws.com -r ./scripts/root-CA.crt -c ./scripts/TestCamera1.cert.pem  -k ./scripts/TestCamera1.private.key -pt "SCR/yogesh/pytest/FacePacketFull/214748365" -st "SCR/yogesh/pytest/IdentificationStream/214748365"