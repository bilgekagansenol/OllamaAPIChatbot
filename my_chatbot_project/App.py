import gradio as gr
from ollama_llm import OllamaLLM

# Çektiğiniz modellere göre model isimlerini buraya ekleyin.
available_models = ["aya","mistral","naruto","deepseek-r1:14b","qwen2.5:14b","llama3.2"]

def chatbot_response(prompt: str, model_choice: str) -> str:
    # Seçilen model ile Ollama API'sine bağlanıyoruz.
    llm = OllamaLLM(model=model_choice)
    return llm(prompt)

# Gradio arayüzü tanımlanıyor.
iface = gr.Interface(
    fn=chatbot_response,
    inputs=[
        gr.Textbox(lines=5, placeholder="Sorunuzu buraya yazın..."),
        gr.Dropdown(choices=available_models, label="Model Seçimi")
    ],
    outputs=gr.Textbox(label="Cevap"),
    title="Ollama & LangChain Chatbot",
    description="Yerel olarak çektiğiniz Ollama modelleriyle çalışan chatbot."
)

if __name__ == "__main__":
    iface.launch()
