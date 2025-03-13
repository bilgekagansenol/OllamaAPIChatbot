from flask import Flask, request, jsonify
from flask_cors import CORS
from ollama_llm import OllamaLLM

app = Flask(__name__)
CORS(app)  # React frontend'in API'ye erişmesine izin ver

# Çektiğiniz modellere göre model isimlerini buraya ekleyin.
available_models = ["aya", "mistral", "naruto", "deepseek-r1:14b", "qwen2.5:14b", "llama3.2"]

@app.route('/api/models', methods=['GET'])
def get_models():
    return jsonify(available_models)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    model_choice = data.get('model')
    
    if not prompt or not model_choice:
        return jsonify({"error": "Prompt ve model gereklidir"}), 400
    
    try:
        # Seçilen model ile Ollama API'sine bağlanıyoruz.
        llm = OllamaLLM(model=model_choice)
        response = llm(prompt)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
