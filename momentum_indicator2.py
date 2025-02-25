import pandas_ta as ta
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


def hlc3(HA_High, HA_Low, HA_Close):
    """HLC3 계산 함수 (Typical Price)"""
    return (HA_High + HA_Low + HA_Close) / 3

def calculate_vwap(df, period_days=100):
    """
    100일 단위로 VWAP을 초기화하며 계산하는 함수
    :param df: 데이터프레임 (HA_Open, HA_High, HA_Low, HA_Close, volume 포함)
    :param period_days: VWAP을 초기화할 주기 (기본값: 100일)
    :return: VWAP이 추가된 데이터프레임
    """
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





def calculate_squeeze_momentum(df, bb_length=20, bb_mult=2.0, kc_length=20, kc_mult=1.5):
    """
    스퀴즈 모멘텀 지표(Squeeze Momentum Indicator) 계산
    :param df: 데이터프레임 (HA_Open, HA_High, HA_Low, HA_Close, volume 포함)
    :return: SQZ_ON, SQZ_OFF, Momentum 컬럼 추가된 데이터프레임
    """
    # 볼린저 밴드 계산
    df['SMA_20'] = df['HA_Close'].rolling(window=bb_length).mean()
    df['BB_Std'] = df['HA_Close'].rolling(window=bb_length).std()
    df['BB_Upper'] = df['SMA_20'] + (bb_mult * df['BB_Std'])
    df['BB_Lower'] = df['SMA_20'] - (bb_mult * df['BB_Std'])
    
    # 켈트너 채널 계산
    df['EMA_20'] = df['HA_Close'].ewm(span=kc_length, adjust=False).mean()
    df['ATR'] = (df['HA_High'] - df['HA_Low']).rolling(window=kc_length).mean()  # 간단한 ATR 계산
    df['KC_Upper'] = df['EMA_20'] + (kc_mult * df['ATR'])
    df['KC_Lower'] = df['EMA_20'] - (kc_mult * df['ATR'])

    # 스퀴즈 ON/OFF 조건
    df['SQZ_ON'] = (df['BB_Lower'] > df['KC_Lower']) & (df['BB_Upper'] < df['KC_Upper'])
    df['SQZ_OFF'] = ~df['SQZ_ON']


    # 변동성 조건 (SQZ_OFF이면서 SQZ_ON이 아님)
    df['High_Volatility'] = ~df['SQZ_OFF'] & ~df['SQZ_ON']  # 변동성 큰 경우 (검은색 점)
    df['Low_Volatility'] = df['SQZ_OFF']  # 변동성 작은 경우 (회색 점)

    # 트레이딩뷰 공식 기반 모멘텀 계산
    HA_Highest_HA_High = df['HA_High'].rolling(window=kc_length).max()
    HA_Lowest_HA_Low = df['HA_Low'].rolling(window=kc_length).min()
    HA_Close_sma = df['HA_Close'].rolling(window=kc_length).mean()
    middle_line = (HA_Highest_HA_High + HA_Lowest_HA_Low + HA_Close_sma) / 3
    df['Momentum'] = df['HLC3'] - middle_line.rolling(window=kc_length).mean()

    # 색상 계산 (트레이딩뷰 스타일)
    df['Momentum_Prev'] = df['Momentum'].shift(1)
    df['Momentum_Color'] = np.where(df['Momentum'] > 0, 
        np.where(df['Momentum'] > df['Momentum_Prev'], 'lightgreen', 'darkgreen'), 
        np.where(df['Momentum'] < df['Momentum_Prev'], 'orange', 'red')
    )

    return df


def momentum_indicator(df):


    # Heikin Ashi 캔들 생성
    #df['HA_Open'] = ta.sma(df['open'], 2)
    df['HA_Close'] = (df['open'] + df['high'] + df['low'] + df['close']) / 4
    df['HA_Open'] = (df['HA_Close'].shift(2) + df['HA_Close']) / 2
    df['HA_High'] = df[['HA_Open', 'HA_Close', 'high']].max(axis=1)
    df['HA_Low'] = df[['HA_Open', 'HA_Close', 'low']].min(axis=1)
    df['HLC3'] = hlc3(df['HA_High'], df['HA_Low'], df['HA_Close'])  # HLC3(Typical Price) 계산

    # # VWAP 계산
    df = calculate_vwap(df, period_days=100)



    df = calculate_squeeze_momentum(df)
    # EMA 200 계산
    df['EMA_200'] = ta.ema(df['HA_Close'], length=200)


    # ✅ 매수 신호 감지 (SQZ가 양수 전환 & 변동성 OFF에서 ON으로 변경)
    df['BuySignal'] = (df['Momentum'] > 0) & (df['HA_Close']>=df['VWAP_100']*0.98)

    # ✅ 매도 신호 감지 (SQZ가 양수 전환 & 변동성 OFF에서 ON으로 변경)
    ##98~97사이
    df['SellSignal'] = (df['HA_Close'] <= df['VWAP_100'] * 0.98) | ((df['Momentum'] < 0) & (df['Momentum'].shift(1) > 0))

    # return(df['BuySignal'][-1], df['SellSignal'][-1])

    # 그래프 그리기
    fig, axes = plt.subplots(2, 1, figsize=(20, 18), sharex=True)

    # 가격 그래프 및 EMA 200 추가
    axes[0].plot(df.index, df['HA_Close'], label='Close Price', marker='o', linestyle='-', color='black', linewidth=0.1, markersize=1)
    axes[0].plot(df.index, df['EMA_200'], label='EMA 200', color='green', linewidth=1.5)  # EMA 200 추가
    axes[0].plot(df.index, df['VWAP_100'], label='VWAP', color='blue', linewidth=1.5, linestyle='dashed')  # VWAP 추가
    axes[0].fill_between(df.index, df['HA_Low'], df['HA_High'], color='gray', alpha=0.3, label='High-Low Range')
    
    # ✅ 매수 신호 추가 (초록색 원으로 표시)
    axes[0].scatter(df.index[df['BuySignal']], df['HA_Close'][df['BuySignal']], 
                    color='lime', label='Buy Signal', edgecolors='black', zorder=5, s=20)

    # ✅ 매도 신호 추가 (초록색 원으로 표시)
    axes[0].scatter(df.index[df['SellSignal']], df['HA_Close'][df['SellSignal']], 
                    color='red', label='Sell Signal', edgecolors='black', zorder=5, s=20)

    axes[0].set_ylabel("가격 (KRW)")
    axes[0].legend(loc='upper left')
    axes[0].grid()

    # Squeeze Momentum Indicator 그래프
    for i in range(len(df)):
        color = df.iloc[i]['Momentum_Color']
        axes[1].bar(df.index[i], df.iloc[i]['Momentum'], color=color, width=0.8)
    # 변동성 점 찍기
    
    axes[1].scatter(df.index[df['Low_Volatility']], [0] * sum(df['Low_Volatility']), 
                color='blue', label='Low Volatility', s=1)


    axes[1].set_ylabel("SQZ Momentum")
    axes[1].legend(loc='upper left')
    axes[1].grid()

    # 그래프 설정
    plt.xticks(rotation=45)
    plt.xlabel("날짜")
    plt.suptitle("BTC 4hours , Squeeze Momentum, Volatility with Buy Signals")
    plt.show()
    