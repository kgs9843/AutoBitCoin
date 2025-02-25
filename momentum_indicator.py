import pandas_ta as ta
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


def hlc3(high, low, close):
    """HLC3 계산 함수 (Typical Price)"""
    return (high + low + close) / 3

def calculate_vwap(df, period_days=100):
    """
    100일 단위로 VWAP을 초기화하며 계산하는 함수
    :param df: 데이터프레임 (open, high, low, close, volume 포함)
    :param period_days: VWAP을 초기화할 주기 (기본값: 100일)
    :return: VWAP이 추가된 데이터프레임
    """
    df['HLC3'] = hlc3(df['high'], df['low'], df['close'])  # HLC3(Typical Price) 계산
    df['VWAP_100'] = np.nan  # 초기 VWAP 값
    
    cumulative_vwap = 0
    cumulative_volume = 0
    
    for i in range(len(df)):
        if i % period_days == 0:  # 100일마다 초기화
            cumulative_vwap = 0
            cumulative_volume = 0
        
        cumulative_vwap += df.loc[df.index[i], 'HLC3'] * df.loc[df.index[i], 'volume']
        cumulative_volume += df.loc[df.index[i], 'volume']
        
        df.loc[df.index[i], 'VWAP_100'] = cumulative_vwap / cumulative_volume if cumulative_volume != 0 else np.nan
    
    return df

#4시간봉 사용용


def momentum_indicator(df):

    # Squeeze Momentum Indicator (SQZ) 계산
    squeeze_result = ta.squeeze(df['high'], df['low'], df['close'], append=True)

    df['SQZ'] = squeeze_result.iloc[:, 0]  # 첫 번째 컬럼이 SQZ일 가능성이 높음
    df['SQZ_ON'] = squeeze_result['SQZ_ON']
    df['SQZ_OFF'] = squeeze_result['SQZ_OFF']

    # VWAP 계산
    df = calculate_vwap(df, period_days=100)

    # EMA 200 계산
    df['EMA_200'] = ta.ema(df['close'], length=200)

    # SQZ 변동성 색상 설정
    df['VolatilityColor'] = df.apply(
        lambda row: 'black' if row['SQZ_ON'] == 1 else ('red' if row['SQZ_OFF'] == 1 else 'blue'), axis=1
    )

    print(df)

    # ✅ 매수 신호 감지 (SQZ가 양수 전환 & 변동성 OFF에서 ON으로 변경)
    df['BuySignal'] = (df['SQZ'] > 0) & (df['VolatilityColor'].shift(1) == 'black') & (df['VolatilityColor'] == 'red') & (df['close']>df['EMA_200'])

    # ✅ 매도 신호 감지 (SQZ가 양수 전환 & 변동성 OFF에서 ON으로 변경)
    df['SellSignal'] = (df['SQZ'] < 0) & (df['SQZ'].shift(1) >0)

    #return(df['BuySignal'][-1], df['SellSignal'][-1])

    # 그래프 그리기
    fig, axes = plt.subplots(2, 1, figsize=(20, 18), sharex=True)

    # 가격 그래프 및 EMA 200 추가
    axes[0].plot(df.index, df['close'], label='Close Price', marker='o', linestyle='-', color='black', linewidth=0.1, markersize=1)
    axes[0].plot(df.index, df['EMA_200'], label='EMA 200', color='green', linewidth=1.5)  # EMA 200 추가
    axes[0].plot(df.index, df['VWAP_100'], label='VWAP', color='blue', linewidth=1.5, linestyle='dashed')  # VWAP 추가
    axes[0].fill_between(df.index, df['low'], df['high'], color='gray', alpha=0.3, label='High-Low Range')
    
    # ✅ 매수 신호 추가 (초록색 원으로 표시)
    axes[0].scatter(df.index[df['BuySignal']], df['close'][df['BuySignal']], 
                    color='lime', label='Buy Signal', edgecolors='black', zorder=5, s=20)

    # ✅ 매도 신호 추가 (초록색 원으로 표시)
    axes[0].scatter(df.index[df['SellSignal']], df['close'][df['SellSignal']], 
                    color='red', label='Sell Signal', edgecolors='black', zorder=5, s=20)

    axes[0].set_ylabel("가격 (KRW)")
    axes[0].legend(loc='upper left')
    axes[0].grid()

    # Squeeze Momentum Indicator 그래프
    axes[1].bar(df.index, df['SQZ'], color=['darkviolet' if x > 0 else 'plum' for x in df['SQZ']], width=0.1, alpha=1, label='SQZ Indicator')
    axes[1].scatter(df.index, [0]*len(df), c=df['VolatilityColor'], label='Volatility Points', zorder=5, s=1)
    axes[1].set_ylabel("SQZ Momentum")
    axes[1].legend(loc='upper left')
    axes[1].grid()

    # 그래프 설정
    plt.xticks(rotation=45)
    plt.xlabel("날짜")
    plt.suptitle("BTC 4hours , Squeeze Momentum, Volatility with Buy Signals")
    plt.show()
    