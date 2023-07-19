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
import requests

def delete_face(request):
    if request.method == 'GET':
        my_list=[]
        
        with open(os.path.abspath("data.json"), 'r') as file:
            data=json.load(file)
        http_response = JsonResponse(data, safe=False)
        return http_response
    
    if request.method == 'POST':
        for data in request.POST.getlist('row'):
            row_data=json.loads(data)
            face_id=row_data['faceId']
            face_direction= row_data['face_direction']
            no_mask=row_data['noMask']
            if no_mask==['true']:
                face_type=1
            else:
                face_type=2
            face_type=int(face_type)
            face_id=int(face_id)
            headers = {
                'accept': 'application/json',
            }

            params = {
                'face_direction': face_direction,
                'api_key': 'a0tucTIxazRBS2I3c0FNUm1CbGJwQTRCTzgzakQ2NQ4',
            }
            if face_type==1:
                response = requests.delete(
                    'https://n2mcsr9e71.execute-api.ap-northeast-1.amazonaws.com/prod/api/v1/data/214748365/face/{}'.format(face_id),
                    params=params,
                    headers=headers,
                )
            if face_type==2:
                response = requests.delete(
                    'https://n2mcsr9e71.execute-api.ap-northeast-1.amazonaws.com/prod/api/v1/data/214748366/face/{}'.format(face_id),
                    params=params,
                    headers=headers,
                )
            status_code=response.status_code
            status_code=200

            if status_code==201 or status_code==200:
                file_path = os.path.abspath("data.json")
                with open(file_path, "r") as file:
                        existing_data = json.load(file)

                index_to_delete = None
                for index, item in enumerate(existing_data):
                    if int(item['faceId']) ==face_id:
                        index_to_delete = index
                        break

                if index_to_delete is not None:
                    existing_data.pop(index_to_delete)
                with open(os.path.abspath("data.json"), 'w') as file:
                    json.dump(existing_data, file)

    if status_code==201 or status_code==200:
        message="Face Deleted Successfully"
        return JsonResponse({
            'face_id':face_id,
            'delete': message,
        })
    else:
        message="Error in Deleting the Face"
        return render({
            'delete': message,
        })
    