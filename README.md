\documentclass{article}
\usepackage{hyperref}
\usepackage{graphicx}
\usepackage{listings}
\usepackage{xcolor}

% Renkli kod blokları için tanımlamalar
\lstset{
    basicstyle=\ttfamily\footnotesize,
    keywordstyle=\color{blue},
    stringstyle=\color{red},
    commentstyle=\color{green!50!black},
    backgroundcolor=\color{gray!10},
    frame=single,
    breaklines=true,
    numbers=left,
    numberstyle=\tiny\color{gray},
    stepnumber=1,
    tabsize=4
}

\title{Ollama Chatbot \& Model Switching API}
\author{Developed with Flask and React}
\date{\today}

\begin{document}

\maketitle

\section{Introduction}
This project is a chatbot developed using \textbf{Flask} for the backend and \textbf{React} for the frontend. The chatbot allows switching between different models dynamically via API requests. The project runs inside a \textbf{virtual environment (venv)} to ensure dependency isolation.

\section{Installation}
Follow these steps to set up the project locally:

\subsection{Clone the Repository}
\begin{lstlisting}[language=bash]
git clone https://github.com/your-username/OllamaChatBot.git
cd OllamaChatBot
\end{lstlisting}

\subsection{Set Up Virtual Environment}
\begin{lstlisting}[language=bash]
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
\end{lstlisting}

\subsection{Install Dependencies}
\begin{lstlisting}[language=bash]
pip install -r requirements.txt
\end{lstlisting}

\subsection{Run Flask Backend}
\begin{lstlisting}[language=bash]
python app.py
\end{lstlisting}

\subsection{Run React Frontend}
\begin{lstlisting}[language=bash]
cd frontend
npm install
npm start
\end{lstlisting}

\section{Usage}
- The chatbot allows switching between different AI models dynamically.
- API requests can be sent to interact with the chatbot and change models on the fly.
- Example API request:
\begin{lstlisting}[language=bash]
curl -X POST "http://127.0.0.1:5000/switch-model" -H "Content-Type: application/json" -d '{"model": "gpt-4"}'
\end{lstlisting}

\section{Contributing}
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

\section{License}
This project is licensed under the MIT License.

\end{document}
