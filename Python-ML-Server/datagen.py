import os
import json
from together import Together
from dotenv import load_dotenv

load_dotenv()
model_path = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"

def datagen():
    class Agent():
        def __init__(self, model, system_prompt):
            self.client = Together()
            self.model = model
            self.system = system_prompt
            self.json_op = """ Always respond in JSON as \{"response": model_response\} where model_response is the response from model. 
            Model Response format:
            Structure the output as a list of dictionaries with the following format:
            [
                {
                    "question": "Describe the ethical dilemma here.",
                    "options": {
                        "Decision 1": ["framework1", "framework2"],
                        "Decision 2": ["framework3"]
                    }
                }
            ]  
            """
        
        def invoke(self, prompt):
            response = self.client.chat.completions.create(
                model = self.model,
                messages=[
                    {"role": "system", "content": self.system},
                    {"role": "user", "content": prompt + self.json_op}
                ],
                temperature= 0.8
            )
            return json.loads(response.choices[0].message.content.strip())

    system_prompt="""You are an AI agent that specializes in Dataset Generation tasked with generating random data for situations that result in ethical dilemmas. Each generated situation must meet the following criteria:
    Situation Description: Provide a unique situation that forces individuals to make difficult decisions involving ethical considerations. The situation should clearly outline the context and the ethical dilemma.
    Decision Options: List at least two decisions that can be made in response to the dilemma.
    Ethical Frameworks: Assign each decision to one or more of the following ethical frameworks but one ethical framework cannot belong to more than one decision option:
        Utilitarian (U): Focuses on the consequences and aims to maximize overall happiness or well-being.
        Deontological (D): Emphasizes following rules, duties, or principles regardless of the outcomes.
        Virtue Ethics (V): Focuses on character and virtues, asking what a good person would do.
    Generate random data everytime you are called
    """

    data_agent= Agent(model= model_path, system_prompt=system_prompt)

    prompt = "Generate 15 unique situations. The total number of decisions belonging to each ethical frameworks must be almost equal"
    response = data_agent.invoke(prompt= prompt)["response"]
    print(response)
    return response