const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export const api = {
  // Live Chat
  sendMessage: async ({ text, audioFile, userId }) => {
    const fd = new FormData();
    if (text) fd.append('text', text);
    if (userId) fd.append('user_id', userId);
    if (audioFile) fd.append('audio', audioFile);
    const res = await fetch(`${BASE}/chat/send`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },
  getChatHistory: async (userId) => {
    const url = new URL(`${BASE}/chat/history`);
    if (userId) url.searchParams.set('user_id', userId);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  },

  // Disease Diagnosis
  analyzeDisease: async ({ imageFile, crop, symptoms }) => {
    const fd = new FormData();
    if (imageFile) fd.append('image', imageFile);
    if (crop) fd.append('crop', crop);
    if (symptoms) fd.append('symptoms', symptoms);
    const res = await fetch(`${BASE}/disease/analyze`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Failed to analyze image');
    return res.json();
  },

  // Market Prices
  getMarketPrices: async ({ commodity, state, district }) => {
    const url = new URL(`${BASE}/market/prices`);
    if (commodity) url.searchParams.set('commodity', commodity);
    if (state) url.searchParams.set('state', state);
    if (district) url.searchParams.set('district', district);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch prices');
    return res.json();
  },

  // Government Schemes
  searchSchemes: async ({ query, category, state }) => {
    const url = new URL(`${BASE}/schemes/search`);
    if (query) url.searchParams.set('q', query);
    if (category) url.searchParams.set('category', category);
    if (state) url.searchParams.set('state', state);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch schemes');
    return res.json();
  },

  // Smart Utilities
  runUtility: async (tool, payload) => {
    const res = await fetch(`${BASE}/utilities/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, payload })
    });
    if (!res.ok) throw new Error('Utility call failed');
    return res.json();
  },

  // User Profile
  getProfile: async () => {
    const res = await fetch(`${BASE}/users/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },
  updateProfile: async (data) => {
    const res = await fetch(`${BASE}/users/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },
}
