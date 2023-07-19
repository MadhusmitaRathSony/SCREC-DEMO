"""
/*
 * Copyright 2010-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
"""

import os
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import time
import argparse
import json
import ssl
import paho.mqtt.client as mqtt


IoT_protocol_name = "x-amzn-mqtt-ca"
AllowedActions = ['both', 'publish', 'subscribe']
sample_data_file = open('/home/user1/Madhu/Demo_SCR/Smart_camera_recog_demo_backend/scripts/sample-data.json', )
sample_data = json.load(sample_data_file)
hinako_full_face = sample_data['fpfull_hinako']
subscribe_mid = "a"



    # Custom MQTT message callback
def customCallback(client, userdata, message):
    print("Received a new message: ")
    # print(message.payload)
    print("from topic: ")
    print(message.topic)
    print(len(message.payload),"message.payload")
    print("--------------\n\n")
    # Absolute path of the file or directory
    absolute_path = "/home/user1/Madhu/Demo_SCR/Smart_camera_recog_demo_backend/scripts/txtFacePacketsDetails.txt"
    current_directory = os.getcwd()
    relative_file_path = os.path.relpath(absolute_path, current_directory)
    file = open(relative_file_path, "w")
    file.write(message.payload.decode('utf-8'))





def on_subscribe_clbk(client, userdata, mid, granted_qos):
    print("client=", client)
    print("subscribe_mid=", subscribe_mid)
    print("mid=", mid)
    print("granted_qos=", granted_qos)
    print("Received a new message: ", userdata)


# Read in command-line parameters
parser = argparse.ArgumentParser()
parser.add_argument("-e", "--endpoint", action="store", required=True, dest="host", help="Your AWS IoT custom endpoint")
parser.add_argument("-r", "--rootCA", action="store", required=True, dest="rootCAPath", help="Root CA file path")
parser.add_argument("-c", "--cert", action="store", dest="certificatePath", help="Certificate file path")
parser.add_argument("-k", "--key", action="store", dest="privateKeyPath", help="Private key file path")
parser.add_argument("-id", "--clientId", action="store", dest="clientId", default="basicPubSub",
                    help="Targeted client id")
parser.add_argument("-pt", "--publishTopic", action="store", dest="publishTopic", default="FacePacketFull",
                    help="Publish topic")
parser.add_argument("-st", "--subscribeTopic", action="store", dest="subscribeTopic", default="IdentificationStream",
                    help="Subscribe topic")
parser.add_argument("-m", "--mode", action="store", dest="mode", default="both",
                    help="Operation modes: %s"%str(AllowedActions))
parser.add_argument("-M", "--message", action="store", dest="message", default="Hello World!",
                    help="Message to publish")

args = parser.parse_args()
host = args.host
rootCAPath = args.rootCAPath
certificatePath = args.certificatePath
privateKeyPath = args.privateKeyPath
port = 443
clientId = args.clientId
publishTopic = args.publishTopic
subscribeTopic = args.subscribeTopic
print(subscribeTopic)


def ssl_alpn():
    try:
        print("open ssl version:{}".format(ssl.OPENSSL_VERSION))  # debug print opnessl version
        ssl_context = ssl.create_default_context()
        ssl_context.set_alpn_protocols([IoT_protocol_name])
        ssl_context.load_verify_locations(cafile=rootCAPath)
        ssl_context.load_cert_chain(certfile=certificatePath, keyfile=privateKeyPath)
        return ssl_context
    except Exception as e:
        print("exception ssl_alpn()")
        raise e


print("Trying to connect")
mqtt_client = mqtt.Client(client_id=clientId)
context_ssl = ssl_alpn()
mqtt_client.tls_set_context(context=context_ssl)
print("start connect")
mqtt_client.connect(host=host, port=443)
print("connect success")
mqtt_client.on_subscribe = on_subscribe_clbk
mqtt_client.on_message = customCallback
mqtt_client.loop_start()

if args.mode == 'both' or args.mode == 'subscribe':
    print("trying to subscribe")
    subscribe_mid = mqtt_client.subscribe(topic=subscribeTopic, qos=1)
    print("subscribe success")
time.sleep(2)

#Publish to the same topic in a loop forever
# print("WHILE LOOP Start")
# loopCount = 0
# while True:

     # messageJson = json.dumps(hinako_full_face)
     # mqtt_client.publish(topic=publishTopic, payload=messageJson)
     # mqtt_client.subscribe(topic=subscribeTopic)
     #print('Published to topic: %s, Sequence: %s\n' % (subscribeTopic, loopCount))
     #loopCount += 1
    #  time.sleep(2)
