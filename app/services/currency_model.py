"""Rule-based currency verification placeholder (to be replaced by EfficientNet)."""

from __future__ import annotations

from typing import Any, BinaryIO

import cv2
import numpy as np


def _load_image(file: BinaryIO | bytes) -> np.ndarray:
    if hasattr(file, "read"):
        data = file.read()
    else:
        data = file
    arr = np.frombuffer(data, dtype=np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Could not decode image. Upload a valid image file.")
    return image


def preprocess(image: np.ndarray) -> np.ndarray:
    """Resize to 224x224 and normalize to [0, 1]."""
    resized = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)
    normalized = resized.astype(np.float32) / 255.0
    return normalized


def _laplacian_variance(gray_u8: np.ndarray) -> float:
    return float(cv2.Laplacian(gray_u8, cv2.CV_64F).var())


def _color_histogram_variance(image_bgr: np.ndarray) -> float:
    variances: list[float] = []
    for channel in cv2.split(image_bgr):
        hist = cv2.calcHist([channel], [0], None, [256], [0, 256])
        hist = hist.flatten() / max(hist.sum(), 1.0)
        variances.append(float(np.var(hist)))
    return float(np.mean(variances))


def _estimate_features(
    sharpness: float,
    hist_var: float,
    image_bgr: np.ndarray,
) -> dict[str, bool]:
    """Heuristic stand-ins for security features until the CNN is trained."""
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 80, 160)
    edge_density = float(np.mean(edges > 0))

    hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV)
    hue_std = float(np.std(hsv[:, :, 0]))

    return {
        "watermark": sharpness > 80 and edge_density > 0.04,
        "security_thread": edge_density > 0.06 and hist_var > 1e-5,
        "microprint": sharpness > 120,
        "serial_pattern": edge_density > 0.05 and sharpness > 60,
        "color_shift": hue_std > 18 and hist_var > 8e-6,
    }


def analyze_currency(file: BinaryIO | bytes) -> dict[str, Any]:
    """
    Preprocess the note image and return a temporary rule-based verdict.

    Uses Laplacian sharpness and color-histogram variance as proxies for
    print quality. Replace with EfficientNet inference later.
    """
    image = _load_image(file)
    _ = preprocess(image)  # CNN-ready tensor path kept for future model swap

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    sharpness = _laplacian_variance(gray)
    hist_var = _color_histogram_variance(image)
    features = _estimate_features(sharpness, hist_var, image)

    feature_score = sum(1 for present in features.values() if present) / len(features)

    # Sharp, colorful, feature-rich images lean genuine; blurry/flat lean fake.
    quality = min(1.0, sharpness / 250.0) * 0.55 + min(1.0, hist_var / 2e-5) * 0.25
    score = 0.55 * quality + 0.45 * feature_score

    if score >= 0.45:
        verdict = "genuine"
        confidence = round(55.0 + score * 40.0, 2)
    else:
        verdict = "fake"
        confidence = round(55.0 + (1.0 - score) * 40.0, 2)

    confidence = float(max(50.0, min(95.0, confidence)))

    return {
        "verdict": verdict,
        "confidence": confidence,
        "features": features,
    }
