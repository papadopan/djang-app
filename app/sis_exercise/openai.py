import requests
import os
#sk-DteN809CPy-oNtLtQMFW4pb1ztw1Q70pe-ciU5sxm-T3BlbkFJaHjetI8KZFqub8Q_ynxwOlJw85mRzsZaAEnfmD-u0A

# get the API key from the environment
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

def generate_summary_text(prompt:str) -> str:
    """This function generates a summary of the given text using OpenAI's GPT-4o model."""

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model":"gpt-4o",
        "messages":[
            {"role":"user","content": f"Summarize the following paragraphs: {prompt}"}
        ]
    }

    # if the list of abstracts is empty, return a default message without calling the API
    if not prompt or len(prompt.strip()) == 0:  
        return "No abstracts provided to summarize."

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data, verify=False)

        # validate the response was successful
        response.raise_for_status()

        # extract the summary from the response
        # return a default message in case there is something wrong with the response
        summary = response.json().get("choices",[{}])[0].get("message", {}).get("content", "No summary was provided for your request, please try again")

        return summary

    except Exception as e:
        return f"An error occurred while getting response from openai, please make sure the API key is correct and the service is available.{e}"
    