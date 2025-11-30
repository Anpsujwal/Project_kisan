from fastapi import APIRouter, File, Form, UploadFile
from ..utils.ai import vision_analyze

router = APIRouter()


@router.post("/disease/analyze")
async def analyze_disease(
    image: UploadFile = File(...),
    crop: str | None = Form(None),
    symptoms: str | None = Form(None),
):
    img_bytes = await image.read()
    prompt = (
        "You are an agronomist. Analyze the crop disease from the image. "
        "Return concise JSON with keys: disease, confidence (0-100), treatment, pesticides (array), prevention. "
        f"Crop: {crop or ''}. Symptoms: {symptoms or ''}."
    )
    text = vision_analyze(img_bytes, prompt)
    # very light parse: try to extract fields heuristically if not perfect JSON
    result = {
        "disease": None,
        "confidence": None,
        "treatment": None,
        "pesticides": [],
        "prevention": None,
    }
    try:
        import json
        data = json.loads(text)
        if isinstance(data, dict):
            result.update({k: data.get(k) for k in result.keys()})
    except Exception:
        pass
    if result["disease"] is None:
        # fallback minimal extraction
        result["disease"] = (text.split("\n")[0] or "Possible disease").strip()
    return result
