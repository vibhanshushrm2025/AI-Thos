# Making the necessary imports
import os
from together import Together
from newsapi import NewsApiClient
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Loading environment variables and specifying the model path
load_dotenv()
newsapi_client= NewsApiClient(api_key=os.getenv("NEWS_API_KEY"))
model_path = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"

# Defining AI Agent Class
class Agent():
    def __init__(self, model, system_prompt):
        self.client = Together()
        self.model = model
        self.system = system_prompt
        self.op = """
        **Output Requirements**:
        Always respond in a simple text format.
        """
    
    def invoke(self, prompt):
        response = self.client.chat.completions.create(
            model = self.model,
            messages=[
                {"role": "system", "content": self.system},
                {"role": "user", "content": prompt + self.op}
            ]
        )
        return response.choices[0].message.content.strip()

# System prompts for news agent and object creation
news_system = "You are an AI agent that reads the news title and content and simulate outcomes which are ethically correct on a larger scale and suggest corrective measures."
news_agent = Agent(model=model_path, system_prompt=news_system)

def main():
    # Recent news
    current_date = datetime.now().date()
    date_before_a_week = current_date - timedelta(days=7)
    
    # Essential keywords
    keywords = ["Murder", "Terrorist", "Robbery"]
    num_feed=2
    response_list = []
    for keyword in keywords:
        top = newsapi_client.get_everything(q=keyword,from_param=date_before_a_week,to=current_date,language='en')
        for i in range(num_feed):
            response_dict = {}
            response_dict["title"] = top['articles'][i]['title']
            response_dict["content"] = top['articles'][i]['content']
            response_dict["url"] = top['articles'][i]['url']
            prompt = f"The title of the news is {response_dict['title']} and the content is {response_dict['content']}. Simulate ethically correct outcomes and corrective measures."
            response_dict["response"] = news_agent.invoke(prompt=prompt)
            response_list.append(response_dict)
    
    print(response_list)

# Calling main function
if __name__ == "__main__":
    main()