import openai
import os

openai.api_key = "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"

def get_response(prompt):
    response = openai.Completion.create(
        engine="gpt-4-engine-name", # Replace with the correct GPT-4 engine name
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )
    
    message = response.choices[0].text.strip()
    return message




