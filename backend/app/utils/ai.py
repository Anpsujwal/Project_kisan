import os
from typing import List, Optional
import google.generativeai as genai


_configured = False


def _ensure_config():
    global _configured
    if _configured:
        return
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError("GOOGLE_API_KEY env var not set")
    genai.configure(api_key=api_key)
    _configured = True


def generate_text(prompt: str, system: Optional[str] = None) -> str:
    _ensure_config()
    model = genai.GenerativeModel("gemini-2.5-flash")
    parts = []
    if system:
        parts.append({"role": "user", "parts": [system]})
    parts.append({"role": "user", "parts": [prompt]})
    resp = model.generate_content(parts)
    return resp.text or ""


def generate_json(prompt: str, schema: Optional[dict] = None) -> str:
    _ensure_config()
    model = genai.GenerativeModel("gemini-2.5-flash")
    resp = model.generate_content(prompt)
    return resp.text or ""


def vision_analyze(image_bytes: bytes, prompt: str) -> str:
    _ensure_config()
    model = genai.GenerativeModel("gemini-2.5-flash")
    resp = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes},
    ])
    return resp.text or ""


def embed_texts(texts: List[str]) -> List[List[float]]:
    _ensure_config()
    vectors: List[List[float]] = []
    for t in texts:
        resp = genai.embed_content(model="text-embedding-004", content=t)
        # SDK may return dict with key 'embedding' or an object with .embedding
        if isinstance(resp, dict) and "embedding" in resp:
            vectors.append(resp["embedding"]) 
        else:
            vectors.append(getattr(resp, "embedding", []))
    return vectors
