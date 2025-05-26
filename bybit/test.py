import requests
import pandas as pd

# Bybit API 설정
url = "https://api.bybit.com/v5/market/kline"
symbol = "BTCUSDT"
interval = "30"  # 30분봉
limit = 200  # 최대 200개 요청 가능

# API 요청
params = {
    "symbol": symbol,
    "interval": interval,
    "limit": limit
}

response = requests.get(url, params=params)
data = response.json()

# 데이터 확인
if "result" in data and "list" in data["result"]:
    candles = data["result"]["list"]

    # DataFrame 변환 (7개 컬럼 지정)
    df = pd.DataFrame(candles, columns=["timestamp", "open", "high", "low", "close", "volume", "turnover"])

    # 데이터 타입 변환
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")  # timestamp 변환
    df[["open", "high", "low", "close", "volume", "turnover"]] = df[["open", "high", "low", "close", "volume", "turnover"]].astype(float)

    # 오래된 데이터부터 정렬
    df = df.sort_values(by="timestamp").reset_index(drop=True)

    print(df.tail())  # 데이터 확인
    print(f"총 {len(df)}개의 데이터 수집 완료!")

else:
    print("데이터 수집 실패:", data)
