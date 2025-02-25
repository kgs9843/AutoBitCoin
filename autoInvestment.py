import pandas as pd
import pyupbit
from dotenv import load_dotenv
import os
import datetime
import requests
import pandas_ta as ta
#from momentum_indicator import momentum_indicator
from momentum_indicator2 import momentum_indicator
from heikinAshiStoch import heikinAshiStoch
import time

#디스코드 메시지 전송
def send_message(msg):
    """디스코드 메세지 전송"""
    now = datetime.datetime.now()
    message = {"content": f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] {str(msg)}"}
    requests.post(os.getenv("DISCORD_WEBHOOK_URL"), data=message)
    print(message)






# # momentum_indicator 함수 호출
# BuySignal,SellSignal=momentum_indicator(df)  # df를 전달해서 모멘텀 지표와 차트를 출력
# print(BuySignal, SellSignal)



# # HeikinAshiStoch 함수 호출
# BuySignal=heikinAshiStoch(df)  # df를 전달해서 모멘텀 지표와 차트를 출력
# print(BuySignal)




# 환경 변수 로드
load_dotenv()

# 업비트 API 키 로드
access = os.getenv("UPBIT_ACCESS_KEY")  
secret = os.getenv("UPBIT_SECRET_KEY")
upbit = pyupbit.Upbit(access, secret)

# 업비트 차트 데이터 가져오기 
df = pyupbit.get_ohlcv("KRW-BTC", count=555, interval="day")

# #3시간 단위
# df.index = pd.to_datetime(df.index)  # 인덱스가 Datetime 형식인지 확인
# df = df.resample('2H').agg({
#     'open': 'first',
#     'high': 'max',
#     'low': 'min',
#     'close': 'last',
#     'volume': 'sum',
#     'value': 'sum'
# })





# # HeikinAshiStoch 함수 호출
# BuySignal=heikinAshiStoch(df)  # df를 전달해서 모멘텀 지표와 차트를 출력
# print(BuySignal)





myKRW = upbit.get_balance("KRW")

send_message(f"구매 시그널 : {BuySignal}")

print(myKRW)

# if(BuySignal):
#     if(myKRW*0.95>5000):
#         send_message("====비트코인 구매 ====")
        
#         # 현재 가격 조회
#         currentPrice = pyupbit.get_current_price("KRW-BTC")
#         send_message(f"매수지점 : {currentPrice}")
        
#         # 매수 주문 실행
#         try:
#             buy_order = upbit.buy_market_order("KRW-BTC", myKRW * 0.95)
#             print(buy_order)
#             send_message(f"매수 주문 실행 완료: {buy_order}")
#         except Exception as e:
#             send_message(f"⚠ 매수 주문 실패: {str(e)}")
#             exit()

        
#          # 익절(2%) 및 손절(-1%) 가격 설정
#         takeProfit = currentPrice * 1.02
#         stopLoss = currentPrice * 0.99

#         time.sleep(1) # 1 초 딜레이

#         myBTC = upbit.get_balance("KRW-BTC")

#         if myBTC == 0:
#             send_message("❌ 매수 후 BTC 잔고가 0! 주문 실패 가능성 있음.")
        
#         # 매도 주문 (지정가 매도)
#         sell_order = upbit.sell_limit_order("KRW-BTC", takeProfit, myBTC) 
#         print(sell_order)
#         send_message(f"익절 지정가 매도 주문 완료: {sell_order}")


#         # ✅ 손절을 위한 모니터링 시작
#         while True:
#             time.sleep(2)  # 2초마다 가격 체크
#             currentPrice = pyupbit.get_current_price("KRW-BTC")
            
#             if currentPrice <= stopLoss:
#                 send_message("❌ 손절 조건 충족! 시장가 매도 실행")
#                 try:
#                     sell_sl_order = upbit.sell_market_order("KRW-BTC", myBTC)
#                     print(f"손절 주문: {sell_sl_order}")
#                     send_message(f"손절 주문 실행 완료: {sell_sl_order}")
#                 except Exception as e:
#                     send_message(f"⚠ 손절 주문 실패! 에러: {str(e)}")
#                 break  # 손절 후 루프 종료
#     else:
#         send_message("❌ 5000원 이하로 거래 불가")
