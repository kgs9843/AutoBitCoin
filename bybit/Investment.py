import ccxt
import pandas as pd
from heikinAshiStoch2 import heikinAshiStoch
from dotenv import load_dotenv
import time
import os
import requests
import datetime

# 환경 변수 로드
load_dotenv()

#디스코드 메시지 전송
def send_message(msg):
    """디스코드 메세지 전송"""
    now = datetime.datetime.now()
    message = {"content": f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] {str(msg)}"}
    requests.post(os.getenv("DISCORD_WEBHOOK_URL"), data=message)
    print(message)



#포지션 정리
def close_position(symbol):
    """BTCUSDT 선물 포지션이 있다면 종료"""
    try:
        # 📌 선물 포지션 조회
        positions = exchange.fetch_positions()  

        

        if not positions or len(positions) == 0:
            print(f"⚠️ {symbol} 포지션 없음.")
        else:
            for position in positions:  # 여러 개의 포지션이 있을 수 있음
                if position['symbol'] == "BTC/USDT:USDT":  # 심볼 비교
                    size = float(position['contracts'])  # 보유 계약 수량
                    side = position['side']  # 롱 or 숏
                    mark_price = float(position['markPrice'])  # 현재 마켓 가격

                    print(f"DEBUG: 현재 {position['symbol']} 포지션 - {side}, {size}개")

                    if size > 0:
                        print(f"현재 {position['symbol']} {side} 포지션 {size}개 보유 중 → 종료 시도")

                        # 롱이면 숏으로 종료, 숏이면 롱으로 종료
                        close_side = 'sell' if side == 'long' else 'buy'

                        # # 🔹 지정가 주문 가격 설정 (현재 가격보다 약간 유리한 가격)
                        # limit_price = mark_price * (0.999 if close_side == 'sell' else 1.001)
                        
                        # 🔹 지정가 주문 가격 설정 (현재 가격보다 약간 유리한 가격)
                        limit_price = mark_price 
                        
                
                        # 📌 지정가(limit) 주문 시도
                        print(f"🟡 {position['symbol']} 지정가({limit_price}) 종료 시도...")
                        order = exchange.create_order(
                            symbol=position['symbol'],
                            type="limit",
                            side=close_side,
                            amount=size,
                            price=limit_price
                        )
                        print(f"✅ {position['symbol']} 지정가 팔기 성공: {order}")
    

                        # 지정가 주문 후 5초 대기
                        time.sleep(5)

                        # 지정가 주문이 체결되지 않았다면 시장가로 주문 전환
                        if order['status'] in ['open', 'pending']:
                            print(f"⚠️ 지정가 주문 미체결, 시장가로 전환합니다.")
                            order = exchange.create_order(
                                symbol=position['symbol'],
                                type="market",
                                side=close_side,
                                amount=size
                            )
                            print(f"✅ {position['symbol']} 시장가 팔기 성공: {order}")

                       

                        # print(f"✅ {position['symbol']} 포지션 종료 완료: {order}")
                        break  # 포지션 종료 후 루프 탈출
            else:
                print(f"⚠️ {symbol} 포지션 없음.")

    except Exception as e:
        print(f"❌ 포지션 종료 중 오류 발생: {e}")





# 주문 함수
def place_order(position, margin_percent,symbol):
    """롱/숏 포지션을 지정 증거금으로 진입하는 함수"""
    balance = exchange.fetch_balance()
    usdt_balance = balance["total"]["USDT"]  # 사용 가능한 USDT

    # 현재 가격 가져오기
    ticker = exchange.fetch_ticker(symbol)
    current_price = ticker["last"]


    # 증거금 적용
    margin = usdt_balance * (margin_percent / 100)

    # 주문 수량 계산 (레버리지 1배)
    order_size = margin / current_price

    # 손절 및 익절 설정
    if position == "long":
        take_profit = current_price * 1.02
        stop_loss = current_price * 0.99
        side = "buy"
    else:  # short
        take_profit = current_price * 0.98
        stop_loss = current_price * 1.01
        side = "sell"

    # 지정가 or 시장가 주문 결정
    try:
        # 지정가 주문 (Maker 수수료 고려)
        order = exchange.create_order(symbol, "limit", side, order_size, current_price)
    except Exception:
        # 지정가 주문 실패 시 시장가 주문 (Taker 수수료 적용)
        order = exchange.create_order(symbol, "market", side, order_size,)

    send_message(f"[{position.upper()}] 진입! 수량: {order_size:.6f} BTC, 가격: {current_price}")

    # 손절/익절 설정
    exchange.create_order(symbol, "limit", "sell" if position == "long" else "buy",
                          order_size, take_profit, {"reduceOnly": True})  # 익절
    exchange.create_order(symbol, "stop", "sell" if position == "long" else "buy",
                          order_size, stop_loss, {"stopPrice": stop_loss, "reduceOnly": True})  # 손절







# Bybit API 객체 생성
exchange = ccxt.bybit({
    "apiKey": os.getenv("BYBIT_ACCESS_KEY"),
    "secret": os.getenv("BYBIT_SECRET_KEY"),
    "options": {"defaultType": "future"}  # 선물거래
})


# 심볼과 타임프레임 설정
symbol = "BTCUSDT"  # 원하는 거래쌍 설정
timeframe = "30m"  # 30분봉
limit = 1800  # 180개 데이터

# Bybit에서 캔들 데이터 가져오기
ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)

# 데이터프레임 변환
df = pd.DataFrame(ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"])

# 날짜 변환 (timestamp → datetime)
df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")

# HeikinAshiStoch 함수 호출
BuySignal,SellSignal=heikinAshiStoch(df)  # df를 전달해서 모멘텀
print(BuySignal,SellSignal)



BuySignal=True

# 롱/숏 포지션 실행
if BuySignal:
    close_position(symbol)
    place_order("long", 100,symbol)  # 롱 포지션, 증거금 100%
elif SellSignal:
    close_position(symbol)
    place_order("short", 80,symbol)  # 숏 포지션, 증거금 80%
else:
    print("매매 신호 없음. 대기 중...")








# 잔고 조회 테스트
# try:
#     balance = exchange.fetch_balance()
#     print(balance)
# except Exception as e:
#     print(f"잔고를 가져오는 중 오류 발생: {e}")