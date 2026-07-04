# 🧠 InfinityAI Dashboard

The dashboard provides a premium, responsive web application built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. It is the user-facing workspace where you can search through your saved memories and chat with your AI assistant.

---

## 🛠️ How It Works

1. **AI Chat Hub (`/chat`, `/chat/[chatId]`)**:
   * A premium, ChatGPT-like conversation screen supporting multi-line inputs, smooth scroll animations, and markdown formatting.
   * Renders source cards below bubbles, allowing you to trace back any AI citation directly to the original article.
2. **Persistent Sidebar Navigation**:
   * Lists your active chat sessions sorted by date, with custom overlays to dynamically delete and manage history.
   * Auto-generates concise, topic-based chat titles dynamically based on your first message.
3. **Memory Library Catalog (`/memories`)**:
   * Lists every webpage saved to your database, featuring dynamic search bars to filter items and options to permanently forget entries.
4. **Chrome Extension Setup Guide (`/settings`)**:
   * Integrates an step-by-step tutorial screen directly inside the user settings UI to walk new users through installing the companion Chrome Extension from GitHub.

---

## ⚙️ Development Environment
* Run local server: `npm run dev` (starts on `http://localhost:3000`)
* Build Next.js application: `npm run build`
