import requests

class OllamaLLM:
    def __init__(self, model: str, base_url: str = "http://localhost:11434/api/generate"):
        """
        model: Kullanmak istediğiniz modelin adı.
        base_url: Ollama'nın generate endpoint'i.
        """
        self.model = model
        self.base_url = base_url

    def __call__(self, prompt: str) -> str:
        payload = {
            "model": self.model,
            "prompt": prompt,
            "max_tokens": 100,
            "stream": False  # Yanıtı tek seferde almak için streaming'i kapatıyoruz.
        }
        response = requests.post(self.base_url, json=payload)
        if response.status_code == 200:
            data = response.json()
            # Yanıt metni "response" anahtarında geliyor.
            return data.get("response", "Yanıt bulunamadı.")
        else:
            return f"API Hatası: {response.status_code} - {response.text}"
