from dotenv import load_dotenv
from together import Together
import os
import json

load_dotenv()
client = Together()

response = client.chat.completions.create(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages=[{"role": "user", "content": "What are some fun things to do in New York? Always respond in JSON."}],
)

json_start = response.find("{")
json_end = response.rfind("}") + 1
json_data = json.loads(response_text[json_start:json_end])
print(json.loads(response.choices[0].message.content))