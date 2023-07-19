import binascii
import os
import sys
from django.shortcuts import render
from django.http import HttpResponse
import base64
import datetime
# from datetime import time
import time
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import requests
import cv2
import threading
import subprocess
from PIL import Image
import numpy as np

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data=request.FILES
        response =  upload_image(request)
        return response
    
    if request.method == 'GET':
        with open(os.path.abspath('data.json'), 'r') as file:
            data=json.load(file)
        http_response = JsonResponse(data, safe=False)
        return http_response
                    
def upload_image(request):

        face_id=request.POST.get('face_id')
        name=request.POST.get('name')
        face_id=str(face_id)
        name=str(name)
        image_files = request.FILES.getlist('images')

        for image_file in image_files:
            image_data = image_file.read()
            status,fd,face_type,feature=generate_feature_vector(request,image_data)

        if status==201 or status==200:
            status_code=register_face(request,face_id,fd,feature,name,face_type)
            if status_code==201 or status_code==200:
                file_path = os.path.abspath("data.json")
                with open(file_path, "r") as file:
                    existing_data = json.load(file)
                    if face_type==1:
                        noMask=False
                    else:
                        noMask=True
                    for value in feature['feature_vectors']:
                        data={"faceId":face_id,"name":name,"face_direction":value['face_direction'],"noMask":noMask,"numFaceImages":5,"availableNumFaceImages":3}
                    
                        existing_data.append(data)
                        print(existing_data)
                        with open(file_path, "w") as file:
                            json.dump(existing_data, file)

                return JsonResponse({ "face_id": face_id,
                "message":"Registration Successfull"
                })
            else:
                message="Error in Registration of Face"
                return JsonResponse({
                    'message': message

            })
            
        else:
            message="Error in Registration of Face"
            return JsonResponse({
                'message': message

            })
feature={'feature_vectors': []}
def generate_feature_vector(request,image):
    

    headers = {'Content-Type': 'image/jpg',}
    params = {'verbose': '0','face_type': '0',}
    data=image
  
    response = requests.post('https://n2mcsr9e71.execute-api.ap-northeast-1.amazonaws.com/prod/api/v1/data/facefeature/generate',
                                params=params,
                                headers=headers,
                                data=data,
                                verify=False)
    
    status_code=response.status_code
    res = json.loads(response.text)

    fid=request.POST.get('face_id')
    name=request.POST.get('name')
    name=str(name)
    fid=str(fid)

    if status_code==int(200) or status_code==int(201):
        try:
            fv=res["feature_vector"]
            fd=res["face_direction"]
            face_type=res["face_type"]

            content = json.dumps({fd:fv})
            new_entry = {
                'face_direction': fd,
                'feature_vector': fv,
            }
            feature['feature_vectors'].append(new_entry)
            return status_code,fd,face_type,feature
        except Exception as e:
                print(e)
                return 1,1,1,1
    else:
        return 1,1,1,1

def register_face(request,face_id,fd,feature,name,face_type):
    
    try:

        headers = {'accept': 'application/json','Content-Type': 'application/json'}

        params = {
            'api_key': 'a0tucTIxazRBS2I3c0FNUm1CbGJwQTRCTzgzakQ2NQ4',
        }

        json_data = {
            'face_id': face_id,
            'face_string': name, 
            'feature_vectors':feature['feature_vectors']
            ,
            'registration_type': 0,
            'score':0.5
        }
        if face_type==2:
            response = requests.post(
                'https://n2mcsr9e71.execute-api.ap-northeast-1.amazonaws.com/prod/api/v1/data/214748365/face',
                params=params,
                headers=headers,
                json=json_data,
            )
            return response.status_code
    except Exception as e:
        print(e)
        return 1
        
    if face_type==1:
        response = requests.post(
            'https://n2mcsr9e71.execute-api.ap-northeast-1.amazonaws.com/prod/api/v1/data/214748366/face',
            params=params,
            headers=headers,
            json=json_data,
        )
        return response.status_code


