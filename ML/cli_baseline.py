from dotenv import load_dotenv
from together import Together
import os
import json

load_dotenv()
model_path = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"

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

utilitarian_system = "You are an AI agent that prioritizes utilitarian ethics and tells the course of action for a given situtation."
deontological_system = "You are an AI agent that prioritizes deontological ethics and tells the course of action for a given situtation."
virtue_system = "You are an AI agent that prioritizes virtue ethics and tells the course of action for a given situtation."
default_system = "You are an AI agent that is similar to a human who prioritzes themselves over others and the societal good and tells the course of action for a given situation."

utilitarian_agent = Agent(model=model_path, system_prompt=utilitarian_system)
deontological_agent = Agent(model=model_path, system_prompt=deontological_system)
virtue_agent = Agent(model=model_path, system_prompt=virtue_system)
custom_agent = Agent(model=model_path, system_prompt=default_system)
default_agent = Agent(model=model_path, system_prompt=default_system)

def main():
    prompt = input("Enter the prompt describing the moral dilemma:\n")
    framework = input("Enter the psychological framework: 'u' -> Utilitarianism, 'd' -> Deontology, 'v' -> Virtue, 'a' -> All of the above and press enter for skipping this step\n")

    response_dict = {}
    if framework == 'u':
        response_dict["prompt"] = prompt
        response_dict['response'] = utilitarian_agent.invoke(prompt=prompt)["response"]
    elif framework == 'd':
        response_dict["prompt"] = prompt
        response_dict["response"] = deontological_agent.invoke(prompt=prompt)["response"]
    elif framework == 'v':
        response_dict["prompt"] = prompt
        response_dict["response"] = virtue_agent.invoke(prompt=prompt)["response"]
    elif framework == 'a':
        response_dict["prompt"] = prompt
        response_dict["response"] = "\nUtilitarianism: " + utilitarian_agent.invoke(prompt=prompt)["response"] + \
        "\nDeontology: " + deontological_agent.invoke(prompt=prompt)["response"] + \
        "\nVirtue: " + virtue_agent.invoke(prompt=prompt)["response"] + \
        "\nDefault: " + default_agent.invoke(prompt=prompt)["response"]
    elif framework == 'c':
        user_bias = input("\nEnter the required traits or parameters of the morailty:\n")
        response_dict["prompt"] = prompt
        custom_agent.system = f"You are an AI agent that is similar to a human with the following bias: {user_bias}."
        response_dict["response"] = custom_agent.invoke(prompt=prompt)["response"]
    else:
        response_dict = default_agent.invoke(prompt=prompt)
        response_dict["prompt"] = prompt

    print(f"{response_dict['response']}\n")

    json_file = "response.json"
    with open(json_file, "w") as outfile: 
        json.dump(response_dict, outfile)

    print(f"Response saved in {json_file}")

if __name__ == "__main__":
    main()