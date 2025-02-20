# 최소한의 기능
import os
from dotenv import load_dotenv
import pyupbit
import json
import google.generativeai as genai
import sys
import time

load_dotenv()



a=input()
if(a!=9843):
    sys.exit()




#업비트 로그인
access = os.getenv("UPBIT_ACESS_KEY")  
secret = os.getenv("UPBIT_SCRET_KEY")
upbit = pyupbit.Upbit(access, secret)


# https://github.com/sharebook-kr/pyupbit
# 업비트 차트 데이터 가져오기(30일봉)
# df로 나옴


def ai_trading():
    
    df = pyupbit.get_ohlcv("KRW-BTC",count=30,interval="day")#30일간 시가/고가/저가/종가/거래량
    # AI에게 데이터 제공하고 판단 받기


    genai.configure(api_key=os.getenv("OPENAI_API_KEY"))

    # Create the model
    generation_config = {
    "response_mime_type": "application/json"
    }

    model = genai.GenerativeModel(
    model_name="gemini-2.0-pro-exp-02-05",
    generation_config=generation_config,
    system_instruction="You're a Bitcoin investing expert.\nTell me whether to buy, sell, or hold based on the chart data provided.\n\nResponse format : JSON_schema\nResponse Example:\n{\"decision:\"buy\", \"reson\" : \"some technical reason\"}\n{\"decision:\"sell\", \"reson\" : \"some technical reason\"}\n{\"decision:\"hold\", \"reson\" : \"some technical reason\"}",
    )

    chat_session = model.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            df.to_json()
        ],
        },
        {
        "role": "model",
        "parts": [
            "```json\n{\n\"decision\": \"hold\",\n\"reason\": \"The provided data shows a period of high volatility with significant price swings both upwards and downwards. While there are some periods of growth, there are also noticeable declines. This makes it difficult to establish a clear trend, and therefore risky to either buy or sell. Holding allows waiting for a more definitive market direction.\"\n}\n```\n",
        ],
        },
    ]
    )

    # 응답 받기
    response = chat_session.send_message("Analyze the chart and tell me whether to buy, sell, or hold.")


    result = json.loads(response.text)
    print(result["decision"])
    
    myKRW = upbit.get_balances("KRW")
    myBTC = upbit.get_balances("BTC")

    if(result["decision"]=="buy"):
        if(myKRW*0.95>5000):
            print(upbit.buy_market_order("KRW-BTC", myKRW*0.95))
            print('buy', result["reason"])
        else:
            print("5000원 이하")
    elif(result["decision"]=="sell"):
        currentBTC = pyupbit.get_orderbook(ticker="KRW-BTC")['orderbook_units'][0]['ask_price']
        if(myBTC*currentBTC>5000):
            print(upbit.sell_market_order("KRW-BTC", myBTC))
            print('sell', result["reason"])
        else:
            print("5000원 이하")
    elif(result["decision"]=="hold"):
        print('hold', result["reason"])




while True:
    ai_trading()
    time.sleep(18,000)