import requests

OPENAI_API_KEY = "sk-ajckfxo0yK_potdZEFZgalO8Gwov1XJ9rJGBArRSYqT3BlbkFJUurgPuc1U161SbQl1PKhgS4FPf9TmsP9-UYzkIFasA"

def generate_summary_text(prompt):
    """This function generates a summary of the given text using OpenAI's GPT-4o model."""

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model":"gpt-4o",
        "messages":[
            {"role":"user","content": f"Summarize the following list of abstracts to a very detailed paragraph: {prompt}"}
        ]
    }

    # if the list of abstracts is empty, return a default message without calling the API
    if not prompt or len(prompt) == 0:
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
        return f"An error occurred while getting response from openai: {e}"
    