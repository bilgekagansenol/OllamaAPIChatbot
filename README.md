# Ollama Chatbot & Model Switching API

This project is a chatbot built using **Flask** for the backend and **React** for the frontend. The chatbot allows switching between different AI models dynamically via API requests. The project runs inside a **virtual environment (venv)** to ensure dependency isolation.

## Features
- Switch between different AI models dynamically.
- REST API support for chatbot interactions.
- Flask-based backend with React frontend.
- Virtual environment (venv) for dependency management.

## Installation

### Clone the Repository
```bash
git clone https://github.com/your-username/OllamaChatBot.git
cd OllamaChatBot
```

### Set Up Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run Flask Backend
```bash
python app.py
```

### Run React Frontend
```bash
cd frontend
npm install
npm start
```

## Usage
- The chatbot allows switching between different AI models dynamically.
- API requests can be sent to interact with the chatbot and change models on the fly.
- Example API request:
```bash
curl -X POST "http://127.0.0.1:5000/switch-model" -H "Content-Type: application/json" -d '{"model": "gpt-4"}'
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.
