from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "TripMind API Online", "developer": "admin"}