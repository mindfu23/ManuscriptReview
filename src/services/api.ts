const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ReviewResult {
  status: string;
  review_type: string;
  manuscript_name: string;
  word_count: number;
  issues_found: number;
  review_markdown: string;
  generated_at: string;
}

export interface ToneInfo {
  available: string[];
  current: string;
  descriptions: Record<string, string>;
}

export interface AdminSettings {
  tone: string;
  tone_config: Record<string, unknown>;
  available_tones: string[];
}

class ApiClient {
  private baseUrl: string;
  private adminToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAdminToken(token: string) {
    this.adminToken = token;
  }

  clearAdminToken() {
    this.adminToken = null;
  }

  async healthCheck(): Promise<{ status: string; version: string }> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) throw new Error('API health check failed');
    return response.json();
  }

  async getTones(): Promise<ToneInfo> {
    const response = await fetch(`${this.baseUrl}/tones`);
    if (!response.ok) throw new Error('Failed to fetch tones');
    return response.json();
  }

  async reviewManuscript(
    file: File,
    reviewType: 'grammar' | 'style' | 'full' = 'grammar'
  ): Promise<ReviewResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${this.baseUrl}/review?review_type=${reviewType}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Review failed');
    }

    return response.json();
  }

  async adminLogin(password: string): Promise<{ success: boolean; token: string }> {
    const response = await fetch(`${this.baseUrl}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error('Invalid password');
    }

    const result = await response.json();
    this.adminToken = result.token;
    return result;
  }

  async getAdminSettings(): Promise<AdminSettings> {
    if (!this.adminToken) throw new Error('Not authenticated');

    const response = await fetch(`${this.baseUrl}/admin/settings`, {
      headers: {
        Authorization: `Bearer ${this.adminToken}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  }

  async updateTone(tone: string): Promise<{ success: boolean }> {
    if (!this.adminToken) throw new Error('Not authenticated');

    const response = await fetch(`${this.baseUrl}/admin/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.adminToken}`,
      },
      body: JSON.stringify({ tone }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update tone');
    }

    return response.json();
  }
}

export const api = new ApiClient(API_URL);
export default api;
