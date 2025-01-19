# Making the necessary imports
from dotenv import load_dotenv
from together import Together
import os
import json

# Loading environment variables and specifying the model path
load_dotenv()
model_path = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"

def profile(u,d,v):

# Defining AI Agent Class
    class Agent():
        def __init__(self, model, system_prompt):
            self.client = Together()
            self.model = model
            self.system = system_prompt
            self.op = """ Always respond in JSON as \{"response": model_response\} where model_response is the response from model."""
        
        def invoke(self, prompt):
            response = self.client.chat.completions.create(
                model = self.model,
                messages=[
                    {"role": "system", "content": self.system},
                    {"role": "user", "content": prompt + self.op}
                ]
            )
            return json.loads(response.choices[0].message.content.strip())
        
    # System prompts for analysis agent and object creation
    analysis_system = "You are an AI agent that provides an analysis of a user for a used based on the scores obtained in utilitarian ethics, deontological ethics, and virtue ethics."
    analysis_agent = Agent(model=model_path, system_prompt=analysis_system)

    
    prompt = "Utilitariarism score: "+str(u)+"Deontological score : "+str(d)+"virtue score : "+str(v)+"all scores add to hundred"
    response_dict = {}
    response_dict["scores"] = prompt
    response_dict["response"] = analysis_agent.invoke(prompt=prompt)["response"]
    print(f"{response_dict['response']}\n")
    return response_dict

    