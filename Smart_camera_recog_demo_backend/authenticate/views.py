from django.shortcuts import render
from django.http import HttpResponse
import os
import json
from PIL import Image
import numpy as np
import cv2
import base64
import subprocess
from django.http import JsonResponse

# Create your views here.
json_backend_data=[]
def generate_image():
        absolute_path = os.path.abspath("scripts/txtFacePacketsDetails.txt")
        file = open(absolute_path, "r")
        data = file.read()
        # print(data)
        if data:
            print("read data")
            json_data = json.loads(data)
            face_id = json_data['data']['faceInfo']['faceId']
            name = json_data['data']['faceInfo']['identityString']
            status=json_data['data']['faceInfo']['identifyStatus']
            packet_data = json_data['data']['packet_data']
            print(status,type(status))
            if status==1:
            # print(status)

                array = np.array(packet_data, dtype=np.uint8)
                image = np.reshape(array,(64, 64, 3))
                retval, buffer = cv2.imencode('.jpg', image)
                base64_image = base64.b64encode(buffer).decode('utf-8')
                image_dynamic_url = "image/jpg"
                image_dynamic_url = image_dynamic_url + ";" if image_dynamic_url else ";"
                input_image = "data:%sbase64,%s" % (image_dynamic_url, base64_image)
                if [face_id,input_image,name] not in json_backend_data:
                    json_backend_data.append([face_id,input_image,name])
                print(json_backend_data)


global process
def start_sh():
    try:
        script_path = os.path.abspath("register/start_test_device.sh")
        process=subprocess.run(["bash", script_path], check=True)
        print("Script started successfully.")
        
    except subprocess.CalledProcessError as e:
        print(f"Script failed to start. Error: {e}")

function_executed = False
def authenticate(request):
    print(request)
    if request.method == 'GET':
        print("GET Method START")
        generate_image()
        print("genearte image called")
        start_sh()
        print("calling json response")
        print({"message":json_backend_data})
        
        return JsonResponse({"message":json_backend_data})
    
    elif request.method=='POST':
        print("[POST] called")