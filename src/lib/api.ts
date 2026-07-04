const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface MemoryNode {
  url: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface SearchResponse {
  success: boolean;
  memories: MemoryNode[];
}

export interface GenericResponse {
  success: boolean;
  message: string;
}

export interface ChatSessionPreview {
  chatId: string;
  title: string;
  updatedAt: string;
  lastMessagePreview: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url: string; snippet: string }[];
}

export interface ChatSessionDetail {
  chatId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  answer: string;
  sources: { title: string; url: string; snippet: string }[];
}

export class ApiClient {
  /**
   * Search saved memories from backend.
   * If query is empty, defaults to a vowel list to fetch all memories.
   */
  public static async fetchMemories(query?: string): Promise<MemoryNode[]> {
    const activeQuery = query && query.trim() !== '' ? query.trim() : 'a e i o u';
    const response = await fetch(`${BASE_URL}/memory/search?q=${encodeURIComponent(activeQuery)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch memories: status ${response.status}`);
    }
    
    const data: SearchResponse = await response.json();
    if (data.success && Array.isArray(data.memories)) {
      return data.memories.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    }
    return [];
  }

  /**
   * Delete a specific memory by webpage URL.
   */
  public static async deleteMemory(url: string): Promise<GenericResponse> {
    const response = await fetch(`${BASE_URL}/memory/forget`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to delete memory: status ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Danger Zone: deletes all memories by fetching the catalog and triggering 
   * parallel forget requests.
   */
  public static async forgetAll(): Promise<GenericResponse> {
    try {
      const memories = await this.fetchMemories();
      if (memories.length === 0) {
        return { success: true, message: 'Memory library is already empty.' };
      }

      await Promise.all(
        memories.map((m) => this.deleteMemory(m.url))
      );

      return { success: true, message: 'All memories deleted successfully.' };
    } catch (err: any) {
      throw new Error(err.message || 'Failed to wipe memories library');
    }
  }

  /**
   * Fetches all chat sessions from backend.
   */
  public static async fetchChats(): Promise<ChatSessionPreview[]> {
    const response = await fetch(`${BASE_URL}/chats`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chats: status ${response.status}`);
    }
    return await response.json();
  }

  /**
   * Creates a new chat session.
   */
  public static async createChat(): Promise<{ chatId: string; title: string }> {
    const response = await fetch(`${BASE_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(`Failed to create chat: status ${response.status}`);
    }
    return await response.json();
  }

  /**
   * Fetches specific chat session details.
   */
  public static async fetchChatDetails(chatId: string): Promise<ChatSessionDetail> {
    const response = await fetch(`${BASE_URL}/chats/${chatId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chat details: status ${response.status}`);
    }
    return await response.json();
  }

  /**
   * Deletes a chat session.
   */
  public static async deleteChat(chatId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${BASE_URL}/chats/${chatId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete chat: status ${response.status}`);
    }
    return await response.json();
  }

  /**
   * Submits a message to an active chat session.
   */
  public static async sendChatMessage(
    chatId: string,
    message: string
  ): Promise<ChatResponse> {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, message }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to generate response: status ${response.status}`);
    }
    return await response.json();
  }
}
