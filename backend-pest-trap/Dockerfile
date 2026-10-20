# 1. Gunakan base image Python yang ringan
FROM python:3.10-slim

# 2. Tentukan folder kerja di dalam container
WORKDIR /app

# 3. Instal dependensi grafis Linux (Wajib untuk OpenCV & YOLO)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 4. Salin requirements dan instal library
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Salin seluruh file backend (termasuk app.py, best.pt, model.pkl)
COPY . .

# 6. Buka port 5000
EXPOSE 5000

# 7. Jalankan server Flask
CMD ["python", "app.py"]