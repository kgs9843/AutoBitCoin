import pandas as pd
import pandas_ta as ta
import matplotlib.pyplot as plt


#4시간봉
#takeProfit = longEntryPrice * 1.02  // 2% 익절
#stopLoss = longEntryPrice * 0.99    // -1% 손절

def heikinAshiStoch(df):

    # Heikin Ashi 캔들 생성
    df['HA_Open'] = ta.sma(df['open'], 2)
    df['HA_Close'] = (df['open'] + df['high'] + df['low'] + df['close']) / 4
    df['HA_High'] = df[['HA_Open', 'HA_Close', 'high']].max(axis=1)
    df['HA_Low'] = df[['HA_Open', 'HA_Close', 'low']].min(axis=1)

    # 200 EMA 계산
    df['EMA200'] = ta.ema(df['close'], length=200)

    # Stochastic RSI 계산
    stoch_rsi = ta.stochrsi(df['close'], length=14) 
    df['StochK'] = stoch_rsi['STOCHRSIk_14_14_3_3']
    df['StochD'] = stoch_rsi['STOCHRSId_14_14_3_3']
   
     # %K 상승 조건
    df['StochK_Up'] = df['StochK'] > df['StochD']

    # 🔹 이전 2개 캔들이 양봉 (Heikin Ashi 기준)
    prevCandleGreen1 = df['HA_Open'].shift(1)<df['HA_Close'].shift(1)
    prevCandleGreen2 = df['HA_Open'].shift(2)<df['HA_Close'].shift(2)
    prevCandleGreen = prevCandleGreen1 & prevCandleGreen2
    

    # Stochastic RSI 과매도 조건 (최근 8개 캔들 중 최저값이 20 이하)
    stochOversold = df['StochK'].rolling(8).min() < 50
    

    # StochK가 StochD를 상향 돌파했는지 확인하는 교차 조건
    crossover = (df['StochK'] > df['StochD']) & (df['StochK'].shift(1) <= df['StochD'].shift(1))
    # 최근 8개 캔들 중에서 Golden Cross가 있었는지 확인
    stochGoldenCross8 = crossover.rolling(8).max() == 1

   

   
    # 🔹 이전 캔들이 양봉 (Heikin Ashi 기준)
    emaCheck1 = df['HA_Close'].shift(1)>df['EMA200'].shift(1)
    emaCheck2 = df['HA_Close'].shift(2)>df['EMA200'].shift(2)
    emaCheck3 = df['HA_Close'].shift(3)>df['EMA200'].shift(3)
    emaCheck4 = df['HA_Close'].shift(4)>df['EMA200'].shift(4)
    emaCheck5 = df['HA_Close'].shift(5)>df['EMA200'].shift(5)
    emaCheck6 = df['HA_Close'].shift(6)>df['EMA200'].shift(6)
    emaCheck7 = df['HA_Close'].shift(7)>df['EMA200'].shift(7)
    emaCheck8 = df['HA_Close'].shift(8)>df['EMA200'].shift(8)
    emaCheck9 = df['HA_Close'].shift(9)>df['EMA200'].shift(9)
    emaCheck10 = df['HA_Close'].shift(10)>df['EMA200'].shift(10)

    emacheck=emaCheck1 & emaCheck2 & emaCheck3 & emaCheck4 & emaCheck5 & emaCheck6 & emaCheck7 & emaCheck8 & emaCheck9 & emaCheck10




    # 최근 3개 캔들의 최고가보다 현재 종가가 높은지 확인
    df['Breakout'] = df['HA_Close'] > df['HA_High'].shift(1).rolling(3).max()

    # 최근 캔들이 EMA200의 ±3% 범위 내에 존재
    withinEMA3Percent = df['HA_Close'] < df['EMA200'] * 1.1

    # 매수 조건
    buyCondition = stochOversold & df['StochK_Up'] & df['Breakout'] & withinEMA3Percent & stochGoldenCross8 & emacheck & prevCandleGreen
    df['BuySignal'] = buyCondition

    return(df['BuySignal'][-1])
    # 그래프 시각화
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(20, 18), sharex=True)

    # Heikin Ashi 캔들 차트
    ax1.set_title('Heikin Ashi + 200 EMA')
    ax1.plot(df.index, df['HA_Close'], label='Heikin Ashi', color='black')
    ax1.plot(df.index, df['EMA200'], label='EMA 200', color='blue', linestyle='dashed')
    ax1.fill_between(df.index, df['HA_Low'], df['HA_High'], color='gray', alpha=0.3, label='High-Low Range')


     # ✅ 매수 신호 추가 (초록색 원으로 표시)
    ax1.scatter(df.index[df['BuySignal']], df['HA_Close'][df['BuySignal']], 
                    color='lime', label='Buy Signal', edgecolors='black', zorder=5, s=20)

    ax1.legend()

    # Stochastic RSI 차트
    ax2.set_title('Stochastic RSI')
    ax2.plot(df.index, df['StochK'], label='%K', color='blue')
    ax2.plot(df.index, df['StochD'], label='%D', color='orange')
    ax2.axhline(20, linestyle='dashed', color='gray', alpha=0.5)
    ax2.axhline(80, linestyle='dashed', color='gray', alpha=0.5)
    ax2.legend()

    plt.show()
