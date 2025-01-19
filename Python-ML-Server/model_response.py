from dotenv import load_dotenv
from together import Together
import os
import json

load_dotenv()
client = Together()
def genres(pr,fr):
    prompt = """
    You are the operator of a runaway trolley hurtling down a track. Ahead, five workers are tied to the track and unable to move. If you do nothing, the trolley will kill all five workers. However, you notice a lever that can divert the trolley onto a different track. On this second track, there is one worker tied down who would be killed instead.
    """

    def ethical_choice(fw):
        if fw == "d":
            res = "Prioritize deontological ethics and tell the course of action."
        elif fw == "u":
            res = "Prioritize utilitarian ethics and tell the course of action."
        elif fw == "v":
            res = "Prioritize virtue ethics and tell the course of action."
        else:
            res = "Tell the course of action."
        
        return res

    response = client.chat.completions.create(
        model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages=[{"role": "user", "content": str(pr) + ethical_choice(fr) + """ Always respond in JSON as \{"response": model_response\} where model_response is the response from model"""}],
    )
    print(response.choices[0].message.content.strip())
    dic  = json.loads(response.choices[0].message.content.strip())
    dic["prompt"] = prompt

    json_file = "response.json"
    with open(json_file, "w") as outfile: 
        json.dump(dic, outfile)

    print(f"Response saved in {json_file}")
    return dic


genres(1,2)