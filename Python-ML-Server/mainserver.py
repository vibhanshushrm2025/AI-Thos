from flask import Flask, jsonify, request
from model_response import genres
from flask_cors import CORS
from datagen import datagen
from resgen import resgen
from profileanalysis import profile
import requests
import json
from newsapi1 import newsgen
app = Flask(__name__)
CORS(app)



# Define a simple route
@app.route('/')
def home():
    return "Welcome to the Flask server!"

# Define a route to return JSON data
@app.route('/api/data', methods=['GET'])
def get_data():
#     data = [
#   {
#     "question": "A self-driving car encounters a situation where it must either swerve to avoid a pedestrian and hit a tree, risking passenger injury, or stay on course and hit the pedestrian. What should it do?",
#     "options": {
#       "swerve": ["D", "V"],
#       "stay_on_course": ["U"]
#     }
#   },
#   {
#     "question": "An AI algorithm detects a controversial post that could incite violence but may also silence legitimate political discourse if removed. What action should it take?",
#     "options": {
#       "remove_post": ["U", "V"],
#       "preserve_post": ["D"]
#     }
#   },
#   {
#     "question": "A drone in a war zone identifies a target but detects civilians nearby. Should it proceed with the strike?",
#     "options": {
#       "proceed_with_strike": ["U"],
#       "abort_strike": ["D", "V"]
#     }
#   },
#   {
#     "question": "An autonomous hiring system finds two equally qualified candidates. One is a veteran, and the other has a gap in their employment due to caregiving responsibilities. Who should it choose?",
#     "options": {
#       "choose_veteran": ["D", "V"],
#       "choose_caregiver": ["U", "V"]
#     }
#   },
#   {
#     "question": "A healthcare AI system has limited resources to allocate a life-saving treatment to one of two patients. One is elderly with a terminal illness, and the other is younger with chronic health issues. Who should it treat?",
#     "options": {
#       "treat_elderly": ["D"],
#       "treat_younger": ["U", "V"]
#     }
#   },
#   {
#     "question": "A robot in a factory detects a malfunction that could lead to a minor injury for one worker or a halt in production that would cost the company millions. What should it prioritize?",
#     "options": {
#       "prioritize_safety": ["D", "V"],
#       "prioritize_production": ["U"]
#     }
#   },
#   {
#     "question": "An AI news generator finds that a sensationalized, factually questionable headline will gain significant engagement. Should it publish the story?",
#     "options": {
#       "publish_story": ["U"],
#       "withhold_story": ["D", "V"]
#     }
#   },
#   {
#     "question": "A self-driving car must decide between running a red light to rush a passenger to the hospital or waiting and potentially endangering their life. What should it do?",
#     "options": {
#       "run_red_light": ["U"],
#       "wait_at_light": ["D", "V"]
#     }
#   },
#   {
#     "question": "A robot assistant overhears private conversations that reveal harmful intentions. Should it report this information to authorities?",
#     "options": {
#       "report_conversation": ["U", "V"],
#       "keep_private": ["D"]
#     }
#   },
#   {
#     "question": "An AI teacher notices that some students struggle with specific concepts but providing extra help would delay the overall curriculum. What should it do?",
#     "options": {
#       "help_struggling_students": ["D", "V"],
#       "continue_curriculum": ["U"]
#     }
#   },
#   {
#     "question": "A delivery drone encounters bad weather that may cause a delay, impacting customers. Should it proceed on its route or wait until conditions improve?",
#     "options": {
#       "proceed_with_route": ["U"],
#       "wait_for_safety": ["D", "V"]
#     }
#   },
#   {
#     "question": "An autonomous police robot detects a minor violation, such as littering. Should it issue a fine or let the offender off with a warning?",
#     "options": {
#       "issue_fine": ["D"],
#       "give_warning": ["U", "V"]
#     }
#   },
#   {
#     "question": "A recommendation algorithm finds that promoting controversial content increases engagement but also fosters divisive behavior. Should it promote the content?",
#     "options": {
#       "promote_content": ["U"],
#       "avoid_content": ["D", "V"]
#     }
#   },
#   {
#     "question": "An autonomous warehouse system can increase efficiency by working faster but risks overloading workers with tasks. What should it prioritize?",
#     "options": {
#       "maximize_efficiency": ["U"],
#       "maintain_worker_wellbeing": ["D", "V"]
#     }
#   },
#   {
#     "question": "A smart thermostat detects a minor fault in its system but needs to shut down for maintenance, leaving users without climate control temporarily. Should it shut down?",
#     "options": {
#       "shut_down": ["D", "V"],
#       "continue_running": ["U"]
#     }
#   }
# ]
    data=datagen()
    return jsonify(data)

@app.route('/api/getres', methods=['POST'])
def post_res():
    incoming_data = request.json  # Expect JSON data in the body
    resdata= resgen(incoming_data['prompt'],incoming_data['framework'])
    response = {
        "received": resdata,
        "status": "data processed successfully"
    }
    return jsonify(response), 201



# Define a route to handle POST requests
@app.route('/api/getProfile', methods=['POST'])
def post_data():
    incoming_data = request.json  # Expect JSON data in the body
    
    response = profile(incoming_data['u'],incoming_data['d'],incoming_data['v'])
    return jsonify(response), 201

@app.route('/api/news',methods=['GET'])
def news():
    res=newsgen()
    return res
    


# Run the server
if __name__ == '__main__':
    app.run(debug=True)
