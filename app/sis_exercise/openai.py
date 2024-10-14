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
            {"role":"user","content": f"Summarize the following list of abstracts to a verey detailed paragraph: {prompt}"}
        ]
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data, verify=False)

        # validate the response was successful
        response.raise_for_status()

        # extract the summary from the response
        summary = response.json().get("choices",[{}])[0].get("message", {}).get("content", "")

        return summary

    except Exception as e:
        return f"An error occurred while getting response from openai: {e}"
    