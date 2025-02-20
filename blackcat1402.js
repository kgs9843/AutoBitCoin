    // ____  __    ___   ________ ___________  ___________ __  ____ ___ 
   // / __ )/ /   /   | / ____/ //_/ ____/   |/_  __<  / // / / __ |__ \
  // / __  / /   / /| |/ /   / ,< / /   / /| | / /  / / // /_/ / / __/ /
 // / /_/ / /___/ ___ / /___/ /| / /___/ ___ |/ /  / /__  __/ /_/ / __/ 
// /_____/_____/_/  |_\____/_/ |_\____/_/  |_/_/  /_/  /_/  \____/____/  

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © blackcat1402

//@version=5

// PINE V5 Version of Pandas TA - A Technical Analysis Library in Python 3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// @description PINE v5 Counterpart of Pandas TA - A Technical Analysis Library in Python 3 at https://github.com/twopirllc/pandas-ta
// @description Pandas Technical Analysis (Pandas TA) is an easy to use library that leverages the Pandas package with more than 130 Indicators and Utility functions and more than 60 TA Lib Candlestick Patterns. 

library("pandas_ta", overlay = false)


// Binary to number
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Binary to number
// @function Convert a bool series into number series
// @param  b --> bool series
// @returns 0/1 series --> bton output series

export  bton( bool b) =>
	out = b ? 1 : 0
	out
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// out= bton(close>open)
// plot_bton = plot(out, 'bton', color=color.new(color.green, 0), linewidth=1)


// Weighted Closing Price (WCP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Weighted Closing Price (WCP)
// @function Weighted Closing Price is the weighted price given: high, low and double the close, as WCP = (2 * close + high + low) / 4
// @function  https://www.fmlabs.com/reference/default.htm?url=WeightedCloses.htm
// @param  na
// @returns wcp --> wcp output series

export  wcp() =>
	wcp = (2 * close + high + low) / 4
	wcp
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//wcp_= wcp()
//plot_wcp = plot(wcp_, 'wcp', color=color.new(color.green, 0), linewidth=1)




// Condition counter
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Condition counter
// @function Count condition true numbers
// @param  cond --> bool series
// @param length --> period length
// @returns xcn series --> xcn output series

export  count(bool cond,  simple int length) =>
    count = 0
    for i = 1 to length by 1
        if cond[i - 1]
            count += 1
            count
        else
            count += 0
            count
    count
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out = count(close>open, 13)
//plot_count = plot(out, 'count', color=color.new(color.green, 0), linewidth=1)


// Between
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Between
// @function between(A,B,C) means that when A is between B and C, it returns 1, B<A<C or C<A<B, otherwise it returns 0
// @param  a --> a series
// @param  b --> b series
// @param  c --> c series
// @returns xbt series --> xbt output series

export  xbt( float a, float b, float c) =>
    //define max handling k line number kmax
    kmax = 1000
    out = false
    for i = 0 to kmax by 1
        out := a[kmax - i] >= b[kmax - i] and a[kmax - i] <= c[kmax - i] or a[kmax - i] >= c[kmax - i] and a[kmax - i] <= b[kmax - i] ? true : false
        out
    out
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xbt(5,1, 13)
//plot_xbt = plot(bton(out), 'xbt', color=color.new(color.green, 0), linewidth=1)



// Even Better SineWave (EBSW)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// @function Even Better SineWave (EBSW)
// @function This indicator measures market cycles and uses a low pass filter to remove noise. 
// @function Its output is bound signal between -1 and 1 and the maximum length of a detected trend is limited by its length input.
// @param price -->  Series of price
// @param length -->  It's max cycle/trend period. Values between 40-48 work like expected with minimum value: 39. Default: 40.
// @returns [Wave, Trigger] --> fast and slow lines for ebsw

export ebsw(float price, int length) =>
    //Vars
	alpha1 = 0.00
	HP = 0.00
	a1 = 0.00
	b1 = 0.00
	c1 = 0.00
	c2 = 0.00
	c3 = 0.00
	Filt = 0.00
	count = 0.00
	Wave = 0.00
	Pwr = 0.00
	Trigger = 0.00
	pi = 2 * math.asin(1)
	
	//HighPass filter cyclic components whose periods are shorter than length input
	alpha1 := (1 - math.sin(2*pi / length)) / math.cos(2*pi /  length)
	HP := .5*(1 + alpha1)*(price - nz(price[1])) + alpha1*nz(HP[1])
	//Smooth with a Super Smoother Filter
	a1 := math.exp(-1.414*3.14159 / 10)
	b1 := 2*a1*math.cos(1.414*pi / 10)
	c2 := b1
	c3 := -a1*a1
	c1 := 1 - c2 - c3
	Filt := c1*(HP + nz(HP[1])) / 2 + c2*nz(Filt[1]) + c3*nz(Filt[2])
	//3 Bar average of Wave amplitude and power
	Wave := (Filt + nz(Filt[1]) + nz(Filt[2])) / 3
	Pwr := (Filt*Filt + nz(Filt[1])*nz(Filt[1]) + nz(Filt[2])*nz(Filt[2])) / 3
	//Normalize the Average Wave to Square Root of the Average Power
	Wave := Wave / math.sqrt(Pwr)
	Trigger := nz(Wave[1])
	[Wave, Trigger]
	
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//[Wave, Trigger] = ebsw(close, 40)
//plot1 = plot(Wave, 'Wave', color=color.new(color.yellow, 0), linewidth=1)
//plot2 = plot(Trigger, 'Trigger', color=color.new(color.fuchsia, 0), linewidth=1)
//fill(plot1, plot2, color=Wave > Trigger ? color.new(color.yellow, 60) : color.new(color.fuchsia, 60))




// Awesome Oscillator (AO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// @function Awesome Oscillator (AO)
// @function The Awesome Oscillator is an indicator used to measure a security's momentum.
// @function AO is generally used to affirm trends or to anticipate possible reversals.
// @function median = (high + low) / 2; AO = SMA(median, fast) - SMA(median, slow)
// @param fastLength -->  The short period. Default: 5
// @param slowLength -->  The long period. Default: 34
// @returns ao --> ao output series

export ao(simple int fastLength = 5, simple int slowLength = 34) =>
    ao = ta.sma(hl2, fastLength) - ta.sma(hl2, slowLength)
    ao


// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//ao_ = ao(5, 34)
//plot_ao = plot(ao_, 'ao', color=color.new(color.yellow, 0), linewidth=1)


// Absolute Price Oscillator (APO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Absolute Price Oscillator (APO)
// @function The Absolute Price Oscillator is an indicator used to measure a security's momentum. 
// @function  It is simply the difference of two Exponential Moving Averages (EMA) of two different periods. Note: APO and MACD lines are equivalent.
// @function  APO = SMA(close, fast) - SMA(close, slow)
// @param price -->  Series of price
// @param fastLength -->  The short period. Default: 12
// @param slowLength -->  The long period. Default: 26
// @returns ao --> ao output series

export apo(float price, simple int fastLength = 12, simple int slowLength = 26) =>
    apo = ta.sma(price, fastLength) - ta.sma(price, slowLength)
    apo
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//apo_ = apo(close,12, 26)
//plot_apo = plot(apo_, 'apo', color=color.new(color.yellow, 0), linewidth=1)




// Dynamic shifted values
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Dynamic shifted values
// @function Dynamic shifted values with series parameters
// @param  values --> source series
// @param length --> period length
// @returns xrf series --> xrf output series

export  xrf(float values, int length) =>
    r_val = float(na)
    if length >= 1
        for i = 0 to length by 1
            if na(r_val) or not na(values[i])
                r_val := values[i]
                r_val
    r_val
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xrf(close, 13)
//plot_xrf = plot(out, 'xrf', color=color.new(color.green, 0), linewidth=1)


// Bias (BIAS)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Bias (BIAS)
// @function Rate of change between the source and a moving average.
// @function BIAS = (close - MA(close, length)) / MA(close, length) = (close / MA(close, length)) - 1
// @param price -->  Series of price
// @param length -->  The series period. Default: 26
// @returns bias --> bias output series

export bias(float price, simple int length = 26) =>
	bma = ta.sma(price, length)
    bias = (price / bma) - 1
	bias

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//bias_ = bias(close, 26)
//plot_bias = plot(bias_, 'bias', color=color.new(color.yellow, 0), linewidth=1)



// Balance of Power (BOP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Balance of Power (BOP)
// @function Balance of Power measure the market strength of buyers against sellers.
// @function BOP = scalar * (close - open) / (high - low)
// @param scalar --> scaling factor for bop output series, default =1
// @returns bop --> bop output series

export bop(simple int scalar = 1) =>
    high_low_range = high - low
    close_open_range = close - open
    bop = scalar * close_open_range / high_low_range
	bop

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//bop_ = bop(1)
//plot_bop = plot(bop_, 'bop', color=color.new(color.yellow, 0), linewidth=1)


// BRAR (BRAR)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function BRAR (BRAR)
// @function BNo internet resources on definitive definition.
// @function  HO_Diff = high - open;   OL_Diff = open - low; HCY = high - close[-1]; CYL = close[-1] - low; HCY[HCY < 0] = 0; CYL[CYL < 0] = 0; AR = scalar * SUM(HO, length) / SUM(OL, length);BR = scalar * SUM(HCY, length) / SUM(CYL, length)
// @param length --> The period. Default: 26
// @param scalar --> How much to magnify. Default: 100
// @returns br, ar --> ar br output series

export brar(simple int length = 26, simple int scalar = 100) =>
    hcy = high - nz(close[1])
    cyl = nz(close[1]) - low

    hcy := hcy < 0 ? 0 : hcy  // Zero negative values
    cyl := cyl < 0 ? 0 : cyl  // ""

    ar = scalar * math.sum(high - open, length)
    ar /= math.sum(open - low, length)

    br = scalar * math.sum(hcy, length)
    br /= math.sum(cyl, length)
	[ar, br]

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [ar_, br_] = brar(26, 100)
// plot_ar = plot(ar_, 'ar', color=color.new(color.green, 0), linewidth=1)
// plot_br = plot(br_, 'br', color=color.new(color.red, 0), linewidth=1)


// Commodity Channel Index (CCI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Commodity Channel Index (CCI)
// @function Commodity Channel Index is a momentum oscillator used to primarily identify overbought and oversold levels relative to a mean.
// @function tp = typical_price = hlc3 = (high + low + close) / 3;  mean_tp = SMA(tp, length); mad_tp = MAD(tp, length); CCI = (tp - mean_tp) / (c * mad_tp)
// @param  It's period. Default: 14
// @returns cci --> cci output series

export cci(simple int length = 14) =>
	c =  0.015
    typical_price = hlc3
    mean_typical_price = ta.sma(typical_price, length)
    mad_typical_price = ta.dev(typical_price, length)

    cci = typical_price - mean_typical_price
    cci /= c * mad_typical_price
	cci

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// cci_ = cci(14)
// plot_cci = plot(cci_, 'cci', color=color.new(color.green, 0), linewidth=1)



// Chande Forcast Oscillator (CFO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Chande Forcast Oscillator (CFO)
// @function The Forecast Oscillator calculates the percentage difference between the actual price and the Time Series Forecast (the endpoint of a linear regression line).
// @function CFO = scalar * (close - LINERREG(length, tdf=True)) / close
// @param price -->  Series of price
// @param length -->  The series period. Default: 9
// @returns cfo --> cfo output series

export cfo(float price, simple int length = 9) =>
	_cfo = 0.00
	_cfo := 100 * (price - ta.linreg(price, length,0))
	_cfo /= price
	_cfo

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// cfo_ = cfo(close, 9)
// plot_cfo = plot(cfo_, 'cfo', color=color.new(color.green, 0), linewidth=1)



// Center of Gravity (CG)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Center of Gravity (CG)
// @function The Center of Gravity Indicator by John Ehlers attempts to identify turning points while exhibiting zero lag and smoothing.
// @function http://www.mesasoftware.com/papers/TheCGOscillator.pdf
// @param price -->  Series of price
// @param length -->  The length of the period. Default: 10
// @returns cg --> cg output series

export cg(float price, simple int length = 10) =>
    numeratorSum = 0.0
    denominatorSum = 0.0

    for i = 0 to length - 1 by 1
        numeratorSum += (i + 1) * nz(price[i])
        denominatorSum += nz(price[i])
        denominatorSum

    cgo = denominatorSum != 0 ? -numeratorSum / denominatorSum + (length + 1) / 2 : 0
    cgo

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// cg_ = cg(close, 10)
// plot_cg = plot(cg_, 'cg', color=color.new(color.green, 0), linewidth=1)



// Chande Momentum Oscillator (CMO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Chande Momentum Oscillator (CMO)
// @function Attempts to capture the momentum of an asset with overbought at 50 and oversold at -50.
// @function  https://www.tradingview.com/script/hdrf0fXV-Variable-Index-Dynamic-Average-VIDYA/ , courtesy of everget
// @function  CMO = scalar * (PSUM - NSUM) / (PSUM + NSUM)
// @param price -->  Series of price
// @param length -->  The length of the period. Default: 14
// @returns cmo --> cmo output series

export cmo(float price, simple int length = 14) =>
    mom = ta.change(price)
    upSum = math.sum(math.max(mom, 0), length)
    downSum = math.sum(-math.min(mom, 0), length)
    cmo = 100 * (upSum - downSum) / (upSum + downSum)
    cmo

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// cmo_ = cmo(close, 14)
// plot_cmo = plot(cmo_, 'cmo', color=color.new(color.green, 0), linewidth=1)



// Coppock Curve (COPC)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Coppock Curve (COPC)
// @function Coppock Curve (originally called the "Trendex Model") is a momentum indicator is designed for use on a monthly time scale. 
// @function  Although designed for monthly use, a daily calculation over the same period can be made, converting the periods to 294-day and 231-day rate of changes, and a 210-day weighted moving average.
// @function   https://en.wikipedia.org/wiki/Coppock_curve
// @function  CMO = scalar * (PSUM - NSUM) / (PSUM + NSUM)
// @param price -->  Series of price
// @param length -->  WMA period. Default: 10
// @param fast --> Fast ROC period. Default: 11
// @param slow --> Slow ROC period. Default: 14
// @returns coppock --> coppock output series

export coppock(float price,  simple int length, simple int fast,  simple int slow) =>
    total_roc = ta.roc(price, fast) + ta.roc(price, slow)
    coppock = ta.wma(total_roc, length)
	coppock

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// coppock_ = coppock(close, 10, 11, 14)
// plot_coppock = plot(coppock_, 'coppock', color=color.new(color.green, 0), linewidth=1)


// Correlation Trend Indicator (CTI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Correlation Trend Indicator (CTI)
// @function The Correlation Trend Indicator is an oscillator created by John Ehler in 2020.
// @function It assigns a value depending on how close prices in that range are to following a positively- or negatively-sloping straight line. Values range from -1 to 1.
// @function   https://en.wikipedia.org/wiki/Coppock_curve
// @function  CMO = scalar * (PSUM - NSUM) / (PSUM + NSUM)
// @param price -->  Series of price
// @param length -->  the period. Default: 12
// @returns cti --> cti output series

export cti(float price, simple int length) =>
	// Vars: 
	Sx = 0.00
	Sy = 0.00
	Sxx = 0.00
	Sxy = 0.00
	Syy = 0.00
	
	X = 0.00
	Y = 0.00
	Corr = 0.00
	Num = 0.00
	Denom = 0.00
	
	for count = 0 to length - 1  
		X := nz(price[count])
		Y := -count
		Sx := Sx + X 
		Sy := Sy + Y 
		Sxx := Sxx + X * X
		Sxy := Sxy + X * Y
		Syy := Syy + Y * Y
	
	Num := length * Sxy - Sx * Sy
	Denom := math.sqrt( ( length * Sxx - Sx * Sx ) * ( length * Syy - Sy * Sy ) )
	
	Corr := Denom != 0 ? Num / Denom : Corr
	Corr

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// cti_ = cti(close, 14)
// plot_cti = plot(cti_, 'cti', color=color.new(color.green, 0), linewidth=1)




// Directional Movement  Index(DMI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Directional Movement Index(DMI)
// @function The Directional Movement was developed by J. Welles Wilder in 1978 attempts to determine which direction the price of an asset is moving.
// @function It compares prior highs and lows to yield to two series +DM and -DM.
// @function   https://www.tradingview.com/pine-script-reference/
// @param len -->  length of dm. Default: 14
// @param adxlen -->  length of adx. Default: 6
// @returns dmi --> dmi output series 

export dmi(simple int len = 14,  simple int adxlen = 6 ) =>
    up = ta.change(high)
    down = -ta.change(low)
    truerange = ta.rma(ta.tr, len)
    plus = fixnan(100 * ta.rma(up > down and up > 0 ? up : 0, len) / truerange)
    minus = fixnan(100 * ta.rma(down > up and down > 0 ? down : 0, len) / truerange)
    sum = plus + minus
    adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
    adxr = (adx + adx[adxlen]) / 2
    [plus, minus, adx, adxr]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [plus, minus, adx, adxr] = dmi(14, 6)
// plot_plus = plot(plus, 'plus', color=color.new(color.green, 0), linewidth=1)
// plot_minus = plot(minus, 'minus', color=color.new(color.red, 0), linewidth=1)
// plot_adx = plot(adx, 'adx', color=color.new(color.orange, 0), linewidth=1)
// plot_adxr = plot(adxr, 'adxr', color=color.new(color.blue, 0), linewidth=1)




// Efficiency Ratio (ER)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Efficiency Ratio (ER)
// @function The Efficiency Ratio was invented by Perry J. Kaufman and presented in his book "New Trading Systems and Methods".
// @function It is designed to account for market noise or volatility. It is calculated by dividing the net change in price movement over N periods by the sum of the absolute net changes over the same N periods.
// @function  https://help.tc2000.com/m/69404/l/749623-kaufman-efficiency-ratio
// @function   abs_diff = ABS(close.diff(length)); volatility = ABS(close.diff(1)); ER = abs_diff / SUM(volatility, length)
// @param price -->  Series of price
// @param length -->  It's period. Default: 1
// @returns er --> er output series

export er(float price, simple int length = 1) =>
    abs_diff = math.abs(ta.change(price, length))
    abs_volatility = math.abs(ta.change(nz(price[1]), length))
    er = abs_diff
    er /= math.sum(abs_volatility, length)
	er

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// er_ = er(close, 1)
// plot_er = plot(er_, 'er', color=color.new(color.green, 0), linewidth=1)





// Elder Ray Index (ERI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Efficiency Ratio (ER)
// @function Elder's Bulls Ray Index contains his Bull and Bear Powers, which are useful ways to look at the price and see the strength behind the market. 
// @function Bull Power measures the capability of buyers in the market, to lift prices above an average consensus of value.
// @function https://admiralmarkets.com/education/articles/forex-indicators/bears-and-bulls-power-indicator
// @function BULLPOWER = high - EMA(close, length);  BEARPOWER = low - EMA(close, length)
// @param price -->  Series of price
// @param length -->  It's period. Default: 14
// @returns eri --> eri output series

export eri(float price, simple int length = 14) =>
    ema_ = ta.ema(price, length)
    bull = high - ema_
    bear = low - ema_
	[bull, bear]

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [bull, bear] = eri(close, 1)
// plot_bull = plot(bull, 'bull', color=color.new(color.green, 0), linewidth=1)
// plot_bear = plot(bear, 'bear', color=color.new(color.red, 0), linewidth=1)




//Fisher Transform (FISHT)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Fisher Transform (FISHT)
// @function Attempts to identify significant price reversals by normalizing prices over a user-specified number of periods.
// @function A reversal signal is suggested when the the two lines cross.
// @function https://admiralmarkets.com/education/articles/forex-indicators/bears-and-bulls-power-indicator
// @function BULLPOWER = high - EMA(close, length);  BEARPOWER = low - EMA(close, length)
// @param price -->  Series of price
// @param length -->  It's period. Default: 9
// @returns fisher --> fisher output series

export fisher(float price, simple int length = 9) =>
	Value1 = 0.00
	Fish = 0.00
	
	// Fisher
	MaxH = ta.highest(high, length)
	MinL = ta.lowest(low, length)
	Value1 := math.max(-0.9999, math.min(0.9999, 0.5 * 2 * ((price - MinL) / (MaxH - MinL) - 0.5) + 0.5 * nz(Value1[1])))
	Fish := 0.25 * math.log((1 + Value1) / (1 - Value1)) + 0.5 * nz(Fish[1])
	Fish

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// fisher_ = fisher(close, 9)
// plot_fisher = plot(fisher_, 'fisher', color=color.new(color.green, 0), linewidth=1)



// Inertia (INERTIA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Inertia (INERTIA)
// @function Inertia was developed by Donald Dorsey and was introduced his article in September, 1995.
// @function It is the Relative Vigor Index smoothed by the Least Squares Moving Average. Postive Inertia when values are greater than 50, Negative Inertia otherwise.
// @function  https://www.investopedia.com/terms/r/relative_vigor_index.asp
// @function LSQRMA = Least Squares Moving Average;  INERTIA = LSQRMA(RVI(length), ma_length)
// @param price -->  Series of price
// @param length -->  It's period. Default: 20
// @param rvi_length -->  It's period. Default: 14
// @returns inertia --> inertia output series

export inertia(float price,  simple int length = 20, simple int rvi_length = 14) =>
	upSum = ta.ema(ta.change(price) >= 0 ? ta.stdev(price, 10) : 0, rvi_length)
	downSum = ta.ema(ta.change(price) >= 0 ? 0 : ta.stdev(price, 10), rvi_length)
	rvi = 100 * upSum / (upSum + downSum)
	inertia = ta.linreg(rvi, length,0)
	inertia

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// inertia_ = inertia(close, 20, 14)
// plot_inertia = plot(inertia_, 'inertia', color=color.new(color.green, 0), linewidth=1)


// KDJ (KDJ)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function KDJ (KDJ)
// @function The KDJ indicator is actually a derived form of the Slow Stochastic with the only difference being an extra line called the J line.
// @function The J line represents the divergence of the %D value from the %K. The value of J can go beyond [0, 100] for %K and %D lines on the chart.
// @function   https://www.prorealcode.com/prorealtime-indicators/kdj/
// @param length -->  Default: 9
// @param signal  -->  Default: 3
// @returns kdj --> kdj output series

export kdj(simple int length = 9,  simple int signal = 3 ) =>
    k = 0.0
    d = 0.0
    j = 0.0
    
	rsv = (((close - ta.lowest(low,length)) / (ta.highest(high, length) - ta.lowest(low,length))) * 100)
	k := ta.sma(rsv,signal)
	d := ta.sma(k,signal)
	j := 3*k-2*d
    [k, d, j]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [k, d, j] = kdj(9, 3)
// plot_k = plot(k, 'k', color=color.new(color.green, 0), linewidth=1)
// plot_d = plot(d, 'd', color=color.new(color.red, 0), linewidth=1)
// plot_j = plot(j, 'j', color=color.new(color.orange, 0), linewidth=1)




// 'Know Sure Thing' (KST)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function 'Know Sure Thing' (KST)
// @function The 'Know Sure Thing' is a momentum based oscillator and based on ROC.
// @function   https://www.tradingview.com/support/solutions/43000502329-know-sure-thing-kst/
// @param price  -->  Series of price
// @param roc1~roc4  -->  ROC 1~4 period. Default: 10, 15, 20, 30
// @param sma1~sma4  -->  SMA 1~4 period. Default: 10, 10, 10, 15
// @param signal     -->  signal period. Default: 9
// @returns kst --> kst output series

export kst(float price, simple int roc1=10, simple int roc2=15, simple int roc3=20, simple int roc4=30, simple int  sma1=10, simple int sma2=10, simple int sma3=10, simple int sma4=15, simple int signal=9 ) =>
	kst = ta.sma(ta.roc(price, roc1), sma1) + 2 * ta.sma(ta.roc(price, roc2), sma2) + 3 * ta.sma(ta.roc(price, roc3), sma3) + 4 * ta.sma(ta.roc(price, roc4), sma4)
	sig = ta.sma(kst, signal)
    [kst, sig]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[kst, sig] = kst(close, 10, 15, 20, 30, 10 ,10, 10 ,15, 9)
//plot_kst = plot(kst, 'kst', color=color.new(color.green, 0), linewidth=1)
//plot_sig = plot(sig, 'sig', color=color.new(color.red, 0), linewidth=1)



// Moving Average Convergence Divergence (MACD)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Moving Average Convergence Divergence (MACD)
// @function The MACD is a popular indicator to that is used to identify a security's trend.
// @function   https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/
// @param price  -->  Series of price
// @param fastlen  -->  Fast Length parameter. Default: 12
// @param slowlen  -->   Slow Length parameter. Default: 26
// @param siglen   -->  Signal Length parameter. Default: 9
// @returns macdLine, signalLine, histLine --> macdLine, signalLine, histLine output series

export macd(float price, simple int fastlen=12, simple int slowlen=26, simple int siglen=9 ) =>
	[macdLine, signalLine, histLine] = ta.macd(price, fastlen, slowlen, siglen)
	[macdLine, signalLine, histLine]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [macdLine, signalLine, histLine] = ta.macd(wcp(), 12, 26, 9)
// plot_macdLine = plot(macdLine, 'macdLine', color=color.new(color.green, 0), linewidth=1)
// plot_signalLine = plot(signalLine, 'signalLine', color=color.new(color.red, 0), linewidth=1)
// plot_histLine = plot(histLine, color=color.yellow, style=plot.style_histogram)



// Momentum (MOM)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Momentum (MOM)
// @function Momentum is an indicator used to measure a security's speed (or strength) of movement.
// @function  https://www.tradingview.com/support/solutions/43000589187-momentum/
// @param price -->  Series of price
// @param length -->  It's period. Default: 1
// @returns mom --> mom output series

export mom(float price,  simple int length = 1) =>
	mom = ta.mom(price, length)
	mom

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//mom_ = mom(close, 1)
//plot_mom = plot(mom_, 'mom', color=color.new(color.green, 0), linewidth=1)



// Pretty Good Oscillator (PGO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Pretty Good Oscillator (PGO)
// @function The Pretty Good Oscillator indicator was created by Mark Johnson to measure the distance of the current close from its N-day Simple Moving Average, expressed in terms of an average true range over a similar period. Johnson's approach was to use it as a breakout system for longer term trades.
// @function Long if greater than 3.0 and short if less than -3.0.
// @function  https://library.tradingtechnologies.com/trade/chrt-ti-pretty-good-oscillator.html
// @param price -->  Series of price
// @param length -->  It's period. Default: 14
// @returns pgo --> pgo output series

export pgo(float price,  simple int length = 14) =>
	pgo = price - ta.sma(price, length)
	pgo /= ta.ema(ta.atr(length), length)
	pgo

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//pgo_ = pgo(close, 14)
//plot_pgo = plot(pgo_, 'pgo', color=color.new(color.green, 0), linewidth=1)




// Percentage Price Oscillator (PPO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Percentage Price Oscillator (PPO)
// @function The Percentage Price Oscillator is similar to MACD in measuring momentum.
// @function    https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/
// @param price  -->  Series of price
// @param fastlen  -->  Fast Length parameter. Default: 12
// @param slowlen  -->   Slow Length parameter. Default: 26
// @param siglen   -->  Signal Length parameter. Default: 9
// @returns ppo, signalLine, histLine --> ppo, signalLine, histLine output series

export ppo(float price, simple int fastlen=12, simple int slowlen=26, simple int siglen=9 ) =>
    fastma = ta.sma(price, fastlen)
    slowma = ta.sma(price, slowlen)
    ppo = 100 * (fastma - slowma)
    ppo /= slowma

    signalLine = ta.ema(ppo, siglen)
    histLine = ppo - signalLine

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[ppo, signalLine, histLine] = ta.macd(close, 12, 26, 9)
//plot_ppo = plot(ppo, 'ppo', color=color.new(color.green, 0), linewidth=1)
//plot_signalLine = plot(signalLine, 'signalLine', color=color.new(color.red, 0), linewidth=1)
//plot_histLine = plot(histLine, color=color.yellow, style=plot.style_histogram)


// Psychological Line (PSL)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Psychological Line (PSL)
// @function The Psychological Line is an oscillator-type indicator that compares the number of the rising periods to the total number of periods.
// @function In other words, it is the percentage of bars that close above the previous bar over a given period.
// @function https://www.quantshare.com/item-851-psychological-line
// @param length -->  It's period. Default: 12
// @returns psl --> psl output series

xcn(cond, len) =>
    xcn = 0
    for i = 1 to len by 1
        if cond[i - 1]
            xcn += 1
            xcn
        else
            xcn += 0
            xcn
    xcn

export psl(simple int length = 12) =>
	psl = xcn(close>nz(close[1]), length)/length * 100
	psl

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//psl_ = psl(12)
//plot_psl = plot(psl_, 'psl', color=color.new(color.green, 0), linewidth=1)





// Percentage Volume Oscillator (PVO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Percentage Volume Oscillator (PVO)
// @function Percentage Volume Oscillator is a Momentum Oscillator for Volume.
// @function  https://www.fmlabs.com/reference/default.htm?url=PVO.htm
// @param fastlen  -->  Fast Length parameter. Default: 12
// @param slowlen  -->   Slow Length parameter. Default: 26
// @param siglen   -->  Signal Length parameter. Default: 9
// @returns pvo, signalLine, histLine --> pvo, signalLine, histLine output series

export pvo(simple int fastlen=12, simple int slowlen=26, simple int siglen=9 ) =>
    fastma = ta.ema(volume, fastlen)
    slowma = ta.ema(volume, slowlen)
    pvo = 100 * (fastma - slowma)
    pvo /= slowma

    signalLine = ta.ema(pvo, siglen)
    histLine = pvo - signalLine

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[pvo, signalLine, histLine] = ta.macd(close, 12, 26, 9)
//plot_pvo = plot(pvo, 'pvo', color=color.new(color.green, 0), linewidth=1)
//plot_signalLine = plot(signalLine, 'signalLine', color=color.new(color.red, 0), linewidth=1)
//plot_histLine = plot(histLine, color=color.yellow, style=plot.style_histogram)





// Quantitative Qualitative Estimation (QQE)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Quantitative Qualitative Estimation (QQE)
// @function The Quantitative Qualitative Estimation (QQE) is similar to SuperTrend but uses a Smoothed RSI with an upper and lower bands.
// @function  The band width is a combination of a one period True Range of the Smoothed RSI which is double smoothed using Wilder's smoothing length (2 * rsiLength - 1) and multiplied by the default factor of 4.236. A Long trend is determined when the Smoothed RSI crosses the previous upperband and a Short trend when the Smoothed RSI crosses the previous lowerband. Based on QQE.mq5 by EarnForex Copyright © 2010, based on version by Tim Hyder (2008), based on version by Roman Ignatov (2006)
// @function   https://www.tradingview.com/script/IYfA9R2k-QQE-MT4/  courtesy of glaz
// @param length  -->  RSI period. Default: 14
// @param smooth  -->  RSI smoothing period. Default: 5
// @param factor  -->  QQE Factor. Default: 4.236
// @returns qqe --> qqe output series

export qqe(simple int length=14, simple int smooth=5, simple float factor=4.236) =>
	longband = 0.0
	shortband = 0.0
	trend = 0.0
	qqe = 0.0
	
	Wilders_Period = length * 2 - 1
	
	
	Rsi = ta.rsi(close, length)
	rsi_ma = ta.ema(Rsi, smooth)
	AtrRsi = math.abs(nz(rsi_ma[1]) - rsi_ma)
	MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
	dar = ta.ema(MaAtrRsi, Wilders_Period) * factor
	
	
	DeltaFastAtrRsi = dar
	RSIndex = rsi_ma
	newshortband = RSIndex + DeltaFastAtrRsi
	newlongband = RSIndex - DeltaFastAtrRsi
	longband := nz(RSIndex[1]) > nz(longband[1]) and RSIndex > nz(longband[1]) ? math.max(nz(longband[1]), newlongband) : newlongband
	shortband := nz(RSIndex[1]) < nz(shortband[1]) and RSIndex < nz(shortband[1]) ? math.min(nz(shortband[1]), newshortband) : newshortband
	cross_1 = ta.cross(nz(longband[1]), RSIndex)
	trend := ta.cross(RSIndex, nz(shortband[1])) ? 1 : cross_1 ? -1 : nz(nz(trend[1]), 1)
	qqe := trend == 1 ? longband : shortband
    [rsi_ma, qqe]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[rsi_ma, qqe] = qqe(14, 5, 4.236)
//plot_rsi_ma = plot(rsi_ma, 'rsi_ma', color=color.new(color.green, 0), linewidth=1)
//plot_qqe = plot(qqe, 'qqe', color=color.new(color.red, 0), linewidth=1)




// Rate of Change (ROC)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Rate of Change (ROC)
// @function Rate of Change is an indicator is also referred to as Momentum (yeah, confusingly).
// @function It is a pure momentum oscillator that measures the percent change in price with the previous price 'n' (or length) periods ago.
// @function ROC = 100 * MOM(close, length) / close.shift(length)
// @param price -->  Series of price
// @param length -->  It's period. Default: 1
// @returns roc --> roc output series

export roc(float price,  simple int length = 1) =>
	roc = ta.roc(price, length)
	roc

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//roc_ = roc(close, 1)
//plot_roc = plot(roc_, 'roc', color=color.new(color.green, 0), linewidth=1)



// Relative Strength Index (RSI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Relative Strength Index (RSI)
// @function The Relative Strength Index is popular momentum oscillator used to measure the velocity as well as the magnitude of directional price movements.
// @function https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/
// @param price -->  Series of price
// @param length -->  It's period. Default: 14
// @returns rsi --> rsi output series

export rsi(float price,  simple int length = 14) =>
	rsi = ta.rsi(price, length)
	rsi

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//rsi_ = rsi(close, 14)
//plot_rsi = plot(rsi_, 'rsi', color=color.new(color.green, 0), linewidth=1)


// Relative Strength Xtra (rsx)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Relative Strength Xtra (rsx) courtesy of everget
// @function The Relative Strength Xtra is based on the popular RSI indicator and inspired by the work Jurik Research. 
// @function The code implemented is based on published code found at 'prorealcode.com'.  https://www.prorealcode.com/prorealtime-indicators/jurik-rsx/
// @param price -->  Series of price
// @param length -->  It's period. Default: 14
// @returns rsx --> rsx output series

export rsx(float price,  simple int length = 14) =>
	f8 = 100 * price
	f10 = nz(f8[1])
	v8 = f8 - f10
	
	f18 = 3 / (length + 2)
	f20 = 1 - f18
	
	f28 = 0.0
	f28 := f20 * nz(f28[1]) + f18 * v8
	
	f30 = 0.0
	f30 := f18 * f28 + f20 * nz(f30[1])
	vC = f28 * 1.5 - f30 * 0.5
	
	f38 = 0.0
	f38 := f20 * nz(f38[1]) + f18 * vC
	
	f40 = 0.0
	f40 := f18 * f38 + f20 * nz(f40[1])
	v10 = f38 * 1.5 - f40 * 0.5
	
	f48 = 0.0
	f48 := f20 * nz(f48[1]) + f18 * v10
	
	f50 = 0.0
	f50 := f18 * f48 + f20 * nz(f50[1])
	v14 = f48 * 1.5 - f50 * 0.5
	
	f58 = 0.0
	f58 := f20 * nz(f58[1]) + f18 * math.abs(v8)
	
	f60 = 0.0
	f60 := f18 * f58 + f20 * nz(f60[1])
	v18 = f58 * 1.5 - f60 * 0.5
	
	f68 = 0.0
	f68 := f20 * nz(f68[1]) + f18 * v18
	
	f70 = 0.0
	f70 := f18 * f68 + f20 * nz(f70[1])
	v1C = f68 * 1.5 - f70 * 0.5
	
	f78 = 0.0
	f78 := f20 * nz(f78[1]) + f18 * v1C
	
	f80 = 0.0
	f80 := f18 * f78 + f20 * nz(f80[1])
	v20 = f78 * 1.5 - f80 * 0.5
	
	f88_ = 0.0
	f90_ = 0.0
	
	f88 = 0.0
	f90_ := nz(f90_[1]) == 0 ? 1 : nz(f88[1]) <= nz(f90_[1]) ? nz(f88[1]) + 1 : nz(f90_[1]) + 1
	f88 := nz(f90_[1]) == 0 and length - 1 >= 5 ? length - 1 : 5
	
	f0 = f88 >= f90_ and f8 != f10 ? 1 : 0
	f90 = f88 == f90_ and f0 == 0 ? 0 : f90_
	
	v4_ = f88 < f90 and v20 > 0 ? (v14 / v20 + 1) * 50 : 50
	rsx = v4_ > 100 ? 100 : v4_ < 0 ? 0 : v4_
	rsx

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//rsx_ = rsx(close, 14)
//plot_rsx = plot(rsx_, 'rsx', color=color.new(color.green, 0), linewidth=1)



// Relative Vigor Index (RVGI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Relative Vigor Index (RVGI)
// @function The Relative Vigor Index attempts to measure the strength of a trend relative to its closing price to its trading range. 
// @function  It is based on the belief that it tends to close higher than they open in uptrends or close lower than they open in downtrends.
// @function   https://www.tradingview.com/script/pZOLCRBu-Normalized-Relative-Vigor-Index/  courtesy of everget
// @param length  -->  period. Default: 14
// @returns rvgi, signal --> rvgi, signal output series

export rvgi(simple int length=14) =>
	rvgi = math.sum(ta.swma(close - open), length) / math.sum(ta.swma(high - low), length)
	signal = ta.swma(rvgi)
    [rvgi, signal]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[rvgi, signal] = rvgi(14)
//plot_signal = plot(signal, 'signal', color=color.new(color.green, 0), linewidth=1)
//plot_rvgi = plot(rvgi, 'rvgi', color=color.new(color.red, 0), linewidth=1)



// Slope
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Slope
// @function Returns the slope of a series of length n. Can convert the slope to angle.
// @function slope = close.diff(length) / length
// @param price -->  Series of price
// @param length -->  It's period. Default: 14
// @returns slope --> slope output series

export slope(float price,  simple int length = 14) =>
    out = 0.0
    lrc = ta.linreg(price, length, 0)
    lrprev = ta.linreg(price[1], length, 0)
    out := (lrc - lrprev) / timeframe.multiplier
    out

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//slope_ = slope(close, 14)
//plot_slope = plot(slope_, 'slope', color=color.new(color.green, 0), linewidth=1)




// SMI Ergodic Indicator (SMI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function SMI Ergodic Indicator (SMI)
// @function The SMI Ergodic Indicator is the same as the True Strength Index (TSI) developed by William Blau, except the SMI includes a signal line. The SMI uses double moving averages of price minus previous price over 2 time frames.
// @function   https://www.tradingview.com/script/cwrgy4fw-SMIIO/ courtesy of elpokor
// @param price  -->  Series of price
// @param fastlen  -->  Fast Length parameter. Default: 5
// @param slowlen  -->   Slow Length parameter. Default: 20
// @param siglen   -->  Signal Length parameter. Default: 5
// @returns erg, sig, osc --> erg, sig, osc output series

export smi(float price, simple int fastlen=12, simple int slowlen=26, simple int siglen=9 ) =>
	erg = ta.tsi(price, fastlen, slowlen)
	sig = ta.ema(erg, siglen)
	osc = erg - sig
	[erg, sig, osc]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[erg, sig, osc] = smi(close, 12, 26, 9)
//plot_erg = plot(erg, 'erg', color=color.new(color.green, 0), linewidth=1)
//plot_sig = plot(sig, 'sig', color=color.new(color.red, 0), linewidth=1)
//plot_osc = plot(osc, color=color.yellow, style=plot.style_histogram)



// Squeeze (SQZ)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Squeeze (SQZ)
// @function The default is based on John Carter's "TTM Squeeze" indicator, as discussed in his book "Mastering the Trade" (chapter 11).
// @function https://www.tradingview.com/script/nqQ1DT5a-Squeeze-Momentum-Indicator-LazyBear/ courtesy of lazybear
// @param price -->  Series of price
// @param length -->  It's bb period. Default: 20
// @param mult -->  It's bb multiplier. Default: 2
// @param lengthKC -->  It's kc period. Default: 20
// @param kcmulti -->  It's kc multiplier. Default: 1.5
// @returns sqz --> sqz output series

export sqz(float price, simple int length, simple int mult, simple int lengthKC,  simple float kcmulti = 1.5) =>
    basis = ta.sma(price, length)
    dev = mult * ta.stdev(price, length)
	upperBB = basis + dev
	lowerBB = basis - dev
	ma = ta.ema(price, lengthKC)
	rangema = ta.tr(true) 
	upperKC = ma + rangema * kcmulti
	lowerKC = ma - rangema * kcmulti
	sqzOn = lowerBB > lowerKC and upperBB < upperKC
	sqzOff = lowerBB < lowerKC and upperBB > upperKC
	noSqz = sqzOn == false and sqzOff == false	
	val = ta.linreg(price - math.avg(math.avg(ta.highest(high, lengthKC), ta.lowest(low, lengthKC)), ta.sma(price, lengthKC)), lengthKC, 0)
	[val, sqzOn,sqzOff]


// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [sqz_, sqzOn,sqzOff] = sqz(close, 20, 2, 20, 1.5)
// plot_sqz = plot(sqz_, 'sqz', color=color.new(color.green, 0), linewidth=1)





// Squeeze PRO(SQZPRO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Squeeze PRO(SQZPRO)
// @function The default is based on John Carter's "TTM Squeeze" indicator, as discussed in his book "Mastering the Trade" (chapter 11).
// @function  https://www.tradingview.com/script/TAAt6eRX-Squeeze-PRO-Indicator-Makit0/ courtesy of makit0
// @param price -->  Series of price
// @param bb_length -->  Bollinger Bands period. Default: 20
// @param bb_std -->  Bollinger Bands Std. Dev. Default: 2
// @param kc_length -->  Keltner Channel period. Default: 20
// @param kc_scalar_wide -->  Keltner Channel scalar for wider channel. Default: 2
// @param kc_scalar_normal -->  Keltner Channel scalar for normal channel. Default: 1.5
// @param kc_scalar_narrow -->   Keltner Channel scalar for narrow channel. Default: 1
// @param mom_length -->  Momentum Period. Default: 12
// @param mom_smooth -->  Smoothing Period of Momentum. Default: 6
// @returns sqz pro series --> sqz pro output series


export sqz_pro(float price,  simple int bb_length = 20,  simple float bb_std = 2,  simple int kc_length = 20,  simple float kc_scalar_wide = 2, simple float kc_scalar_normal = 1.5, simple float kc_scalar_narrow = 1.0,  simple int mom_length = 12, simple int mom_smooth = 6) =>
	ma = ta.sma(price, bb_length)
	devBB = ta.stdev(price, bb_length)
	devKC = ta.sma(ta.tr, kc_length)
	
	
	//Bollinger 2x
	upBB = ma + devBB * bb_std
	lowBB = ma - devBB * bb_std
	
	//Keltner 2x
	upKCWide = ma + devKC * kc_scalar_wide
	lowKCWide = ma - devKC * kc_scalar_wide
	
	//Keltner 1.5x
	upKCNormal = ma + devKC * kc_scalar_normal
	lowKCNormal = ma - devKC *kc_scalar_normal
	
	//Keltner 1x
	upKCNarrow = ma + devKC * kc_scalar_narrow
	lowKCNarrow = ma - devKC * kc_scalar_narrow
	
	sqzOnWide = lowBB >= lowKCWide and upBB <= upKCWide  //WIDE SQUEEZE: ORANGE
	sqzOnNormal = lowBB >= lowKCNormal and upBB <= upKCNormal  //NORMAL SQUEEZE: RED
	sqzOnNarrow = lowBB >= lowKCNarrow and upBB <= upKCNarrow  //NARROW SQUEEZE: YELLOW
	sqzOffWide = lowBB < lowKCWide and upBB > upKCWide  //FIRED WIDE SQUEEZE: GREEN
	noSqz = sqzOnWide == false and sqzOffWide == false  //NO SQUEEZE: BLUE
	
	//Momentum Oscillator
	mom = ta.linreg(price - math.avg(math.avg(ta.highest(high, mom_length), ta.lowest(low, mom_length)), ta.sma(close, mom_length)), mom_length, 0)
	mom := ta.ema(mom, mom_smooth)
	[sqzOnWide, sqzOnNormal, sqzOnNarrow, sqzOffWide, noSqz, mom]



// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//[sqzOnWide, sqzOnNormal, sqzOnNarrow, sqzOffWide, noSqz, mom] = sqz_pro(close, 20, 2, 20, 2, 1.5, 1.0, 12, 6)
//plot_mom = plot(mom, 'mom', color=color.new(color.green, 0), linewidth=1)
//plot_noSqz = plot(bton(noSqz), 'noSqz', color=color.new(color.red, 0), linewidth=1)
//plot_sqzOnWide = plot(bton(sqzOnWide), 'sqzOnWide', color=color.new(color.yellow, 0), linewidth=1)
//plot_sqzOnNormal = plot(bton(sqzOnNormal), 'sqzOnNormal', color=color.new(color.fuchsia, 0), linewidth=1)
//plot_sqzOnNarrow = plot(bton(sqzOnNarrow), 'sqzOnNarrow', color=color.new(color.aqua, 0), linewidth=1)
//plot_sqzOffWide = plot(bton(sqzOffWide), 'sqzOffWide', color=color.new(color.aqua, 0), linewidth=1) 


// Condition filter
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Condition filter
// @function filter out repeated true in condtion series
// @param  cond --> bool series
// @param length --> period length
// @returns xfl series --> xfl output series

export  xfl( bool cond, simple int length) =>
    out = 0.0
    itemp = 0
    for i = length to 0 by 1
        if itemp > 0
            out := 0.0
            itemp := itemp[1] - 1
            itemp
        else
            if cond[i] == false
                out := 0.0
                out
            else
                out := 1.0
                // here itemp = length + 1 to increase accuracy, without "+1", it may impact accuracy
                itemp := length + 1
                itemp
    outb = out==1 ? true : false
    outb
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xfl(close>open, 13)
//plot_xfl = plot(bton(out), 'xfl', color=color.new(color.green, 0), linewidth=1)




// Schaff Trend Cycle (STC)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Schaff Trend Cycle (STC)
// @function The Schaff Trend Cycle is an evolution of the popular MACD incorportating two cascaded stochastic calculations with additional smoothing.
// @function The STC returns also the beginning MACD result as well as the result after the first stochastic including its smoothing. 
// @function 
// @param price -->  Series of price
// @param tclength -->  SchaffTC Signal-Line length.  Default: 10 (adjust to the half of cycle)
// @param fast -->  The short period.   Default: 12
// @param slow -->  The long period.   Default: 26
// @param dlength -->  dlength for last stoch. calculation.   Default: 3
// @returns stc --> stc output series



export stc(float price,  simple int tclength = 10, simple int fast = 12, simple int slow = 26, simple int dlength = 3) =>
	macd = ta.ema(price, fast) - ta.ema(price, slow)
	k = nz(fixnan(ta.stoch(macd, macd, macd, tclength)))
	d = ta.ema(k, dlength)
	kd = nz(fixnan(ta.stoch(d, d, d, tclength)))
	stc = ta.ema(kd, dlength)
	stc := math.max(math.min(stc, 100), 0)
	stc

// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//stc_ = stc(close, 10, 12, 26, 3)
//plot_stc = plot(stc_, 'stc', color=color.new(color.green, 0), linewidth=1)





// Stochastic (STOCH)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Stochastic (STOCH)
// @function The Stochastic Oscillator (STOCH) was developed by George Lane in the 1950's. He believed this indicator was a good way to measure momentum because changes in momentum precede changes in price.
// @function STOCH = 100 * (close - LL) / (HH - LL)
// @param price -->  Series of price
// @param length -->  length of stoch. Default: 14
// @returns stoch --> stoch output series

export stoch(float price,  simple int length = 14) =>
	stoch = ta.stoch(price, high, low, length)
	stoch
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//stoch_ = stoch(close, 14)
//plot_stoch = plot(stoch_, 'stoch', color=color.new(color.green, 0), linewidth=1)



// Stochastic RSI (STOCH RSI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Stochastic RSI (STOCH RSI)
// @function The Stochastic Oscillator (STOCH) was developed by George Lane in the 1950's. He believed this indicator was a good way to measure momentum because changes in momentum precede changes in price.
// @function STOCH = 100 * (close - LL) / (HH - LL)
// @param price -->  Series of price
// @param length -->  length of stoch. Default: 14
// @param rsi_length -->  RSI period. Default: 14
// @param k -->  The Fast %K period. Default: 3
// @param d -->  The Slow %K period. Default: 3
// @returns stochrsi --> stochrsi output series


export stochrsi(float price,  simple  int length = 14, simple int rsi_length = 14, simple int k = 3, simple int d = 3) =>
    rsi_ = rsi(price, rsi_length)
    lowest_rsi = ta.lowest(rsi_, length)
    highest_rsi = ta.highest(rsi_, length)

    stoch = 100 * (rsi_ - lowest_rsi)
    stoch /= (highest_rsi - lowest_rsi)

    stochrsi_k = ta.sma(stoch, k)
    stochrsi_d = ta.sma(stochrsi_k, d)

	[stochrsi_k, stochrsi_d]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[stochrsi_k, stochrsi_d] = stochrsi(close, 14, 14, 3,3)
//plot_stochrsi_k = plot(stochrsi_k, 'stochrsi_k', color=color.new(color.green, 0), linewidth=1)
//plot_stochrsi_d = plot(stochrsi_d, 'stochrsi_d', color=color.new(color.red, 0), linewidth=1)




// Trix (TRIX)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Trix (TRIX)
// @function TRIX is a momentum oscillator to identify divergences.
// @function https://www.tradingview.com/script/NTAdUxle-TRIX/  courtesy of everget
// @param price -->  Series of price
// @param length -->  period length of trix. Default: 18
// @param signal -->  period signal of trix. Default: 9
// @returns trix --> trix output series


export trix(float price, simple int length = 18, simple int signal =9) =>
	trix_ = 0.0
	trix_sig = 0.0
	triple = ta.ema(ta.ema(ta.ema(price, length), length), length)
    trix_ := ta.roc(triple, 1)
    trix_sig := ta.sma(trix_, signal)
	[trix_, trix_sig]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[trix_, trix_sig] = trix(close, 18, 9)
//plot_trix_ = plot(trix_, 'trix_', color=color.new(color.green, 0), linewidth=1)
//plot_trix_sig = plot(trix_sig, 'trix_sig', color=color.new(color.red, 0), linewidth=1)



// True Strength Index (TSI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function True Strength Index (TSI)
// @function The True Strength Index is a momentum indicator used to identify short-term swings while in the direction of the trend as well as determining overbought and oversold conditions.
// @function https://www.investopedia.com/terms/t/tsi.asp
// @param price -->  Series of price
// @param fastlen --> The short period. Default: 13
// @param slowlen -->   The long period. Default: 25
// @param signal -->   The signal period. Default: 13
// @returns tsi --> tsi output series


export tsi(float price, simple int fastlen = 13, simple int slowlen =25, simple int signal =13) =>
    tsi_ = ta.tsi(price, fastlen, slowlen)
    tsi_sig = ta.sma(tsi_, signal)
	[tsi_, tsi_sig]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[tsi_, tsi_sig] = tsi(close, 13, 25, 13)
//plot_tsi_ = plot(tsi_, 'tsi_', color=color.new(color.green, 0), linewidth=1)
//plot_tsi_sig = plot(tsi_sig, 'tsi_sig', color=color.new(color.red, 0), linewidth=1)






// Ultimate Oscillator (UO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Ultimate Oscillator (UO)
// @function The Ultimate Oscillator is a momentum indicator over three different periods.  It attempts to correct false divergence trading signals.
// @function https://www.tradingview.com/script/SPHXzGsT/ courtesy of Azazel666
// @param price -->  Series of price
// @param fast (int)--> The Fast %K period. Default--> 7
// @param medium (int)--> The Slow %K period. Default--> 14
// @param slow (int)--> The Slow %D period. Default--> 28
// @param fast_w (float)--> The Fast %K period. Default--> 4.0
// @param medium_w (float)--> The Slow %K period. Default--> 2.0
// @param slow_w (float)--> The Slow %D period. Default--> 1.0
// @returns uo --> uo output series

average(bp, tr_, length) => 
	math.sum(bp, length) / math.sum(tr_, length)
	
export uo(float price, simple int fast=7, simple int medium=14, simple int slow=28, simple int fast_w=4, simple int medium_w=2, simple int slow_w=1) =>
	
	high_ = math.max(high, price[1])
	low_ = math.min(low, price[1])
	bp = price - low_
	tr_ = high_ - low_
	avg7 = average(bp, tr_, fast)
	avg14 = average(bp, tr_, medium)
	avg28 = average(bp, tr_, slow)
	uo = 100 * (fast_w * avg7 + medium_w * avg14 + slow_w * avg28) / 7
	uo
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//uo_ = uo(close, 7, 14, 28,4, 2, 1)
//plot_uo = plot(uo_, 'uo', color=color.new(color.green, 0), linewidth=1)





// William's Percent R (WILLR)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function William's Percent R (WILLR)
// @function William's Percent R is a momentum oscillator similar to the RSI that attempts to identify overbought and oversold conditions.
// @function https://www.tradingview.com/wiki/Williams_%25R_(%25R)
// @param  length (int)--> It's period. Default--> 14
// @returns willr --> willr output series

export  willr(simple int length=14) =>
	willr = ta.wpr(length)
	willr
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//willr_ = willr(14)
//plot_willr = plot(willr_, 'willr', color=color.new(color.green, 0), linewidth=1)




// Arnaud Legoux Moving Average (ALMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Arnaud Legoux Moving Average (ALMA)
// @function The ALMA moving average uses the curve of the Normal (Gauss) distribution, which can be shifted from 0 to 1. This allows regulating the smoothness and high sensitivity of the indicator. Sigma is another parameter that is responsible for the shape of the curve coefficients. This moving average reduces lag of the data in conjunction with smoothing to reduce noise.
// @function  https://www.prorealcode.com/prorealtime-indicators/alma-arnaud-legoux-moving-average/
// @param price -->  Series of price
// @param length (int)--> It's period, window size. Default--> 10
// @param offset (float)--> Value to offset the distribution min 0 (smoother), max 1 (more responsive). Default 0.85
// @param sigma (float)--> Smoothing value. Default 6.0		
// @returns alma --> alma output series

export  alma(float price, simple int length=10, simple float offset =0.85, simple float sigma = 6.0) =>
	alma = ta.alma(price, length, offset, sigma)
	alma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//alma_ = alma(close, 14, 0.85, 6)
//plot_alma = plot(alma_, 'alma', color=color.new(color.green, 0), linewidth=1)



// Weighted Closing LaoXu1949 (WCX)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Weighted Closing LaoXu1949 (WCX)
// @function Weighted Closing Price is the weighted price given: high, low and double the close, as WCP = (2 * close + high + low + open/2) / 4.5
// @function  https://www.fmlabs.com/reference/default.htm?url=WeightedCloses.htm
// @param  na
// @returns wcx --> wcx output series

export  wcx() =>
	wcx = (2 * close + high + low + open/2) / 4.5
	wcx
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//wcx_= wcx()
//plot_wcx = plot(wcx_, 'wcx', color=color.new(color.green, 0), linewidth=1)





// Dynamic rolling lowest values
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Dynamic rolling lowest values
// @function Dynamic rolling lowest values
// @param  values --> source series
// @param length --> period length
// @returns xll l_val series --> xll output series

export  xll( float values, int length) =>
    l_val = float(na)
    if length >= 1
        for i = 0 to length - 1 by 1
            if na(l_val) or not na(values[i]) and values[i] < l_val
                l_val := values[i]
                l_val
    l_val
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xll(low, 13)
//plot_xll = plot(out, 'xll', color=color.new(color.green, 0), linewidth=1)






// Double Exponential Moving Average (DEMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Double Exponential Moving Average (DEMA)
// @function The Double Exponential Moving Average attempts to a smoother average with less lag than the normal Exponential Moving Average (EMA).
// @function https://www.tradingview.com/script/xDdweXk5-Many-Moving-Averages/ courtesy of Fractured
// @param price --> price series at input
// @param length (int)--> It's period, window size. Default--> 10
// @returns dema --> dema output series

export  dema(float price, simple int length=10) =>
    e = ta.ema(price, length)
    dema = 2 * e - ta.ema(e, length)
	dema
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//dema_ = dema(close, 14)
//plot_dema = plot(dema_, 'dema', color=color.new(color.green, 0), linewidth=1)



// Exponential Moving Average (EMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Exponential Moving Average (EMA)
// @function The Exponential Moving Average is more responsive moving average compared to the Simple Moving Average (SMA). 
// @function https://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:moving_averages
// @param price --> price series at input
// @param length (int)--> It's period, window size. Default--> 10
// @returns ema --> ema output series

export  ema(float price, simple int length=10) =>
    ema = ta.ema(price, length)
	ema
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//ema_ = ema(close, 10)
//plot_ema = plot(ema_, 'ema', color=color.new(color.green, 0), linewidth=1)





// Fibonacci's Weighted Moving Average (FWMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Fibonacci's Weighted Moving Average (FWMA)
// @function Fibonacci's Weighted Moving Average is similar to a Weighted Moving Average (WMA) where the weights are based on the Fibonacci Sequence.
// @function https://www.tradingview.com/script/gObTdd4J-Fibonacci-Weighted-Moving-Average/  courtesy of everget
// @param price --> price series at input
// @param length (int)--> It's period, window size. Default--> 10
// @returns fwma --> fwma output series

fiboWeight(i) =>
    phi = (1 + math.sqrt(5)) / 2
	pow = math.pow(phi, i)
	(pow - math.pow(-1, i) / pow) / math.sqrt(5)


export  fwma(float price, simple int length=10) =>
    sum = 0.0
    weightSum = 0.0

    for i = 0 to length - 1 by 1
        weight = fiboWeight(length - i)
        sum += nz(price[i]) * weight
        weightSum += weight
        weightSum

    fwma = sum / weightSum
	fwma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//fwma_ = fwma(close, 10)
//plot_fwma = plot(fwma_, 'fwma', color=color.new(color.green, 0), linewidth=1)




// Gann HiLo Activator(HiLo)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Gann HiLo Activator(HiLo)
// @function The Gann High Low Activator Indicator was created by Robert Krausz in a 1998 issue of Stocks & Commodities Magazine.  It is a moving average based trend indicator consisting of two different simple moving averages.
// @function https://www.tradingview.com/script/XNQSLIYb-Gann-High-Low/  courtesy of KivancOzbilgic
// @param  high_length (int) --> It's period. Default: 13
// @param  low_length (int) --> It's period. Default: 21
// @returns hilo --> hilo output series

export  hilo(simple int high_length=13, simple int low_length=21) =>
	iff_1 = close < nz(ta.sma(low, low_length))[1] ? -1 : 0
	HLd = close > nz(ta.sma(high, high_length))[1] ? 1 : iff_1
	HLv = ta.valuewhen(HLd != 0, HLd, 0)
	sma_1 = ta.sma(high, high_length)
	sma_2 = ta.sma(low, low_length)
	hilo = HLv == -1 ? sma_1 : sma_2
	hilo
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//hilo_ = hilo(13, 21)
//plot_hilo = plot(hilo_, 'hilo', color=color.new(color.green, 0), linewidth=1)




// Hull Moving Average (HMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Hull Moving Average (HMA)
// @function The Hull Exponential Moving Average attempts to reduce or remove lag in moving averages.
// @function https://www.tradingview.com/script/hg92pFwS-Hull-Suite/ courtesy of InSilico
// @param   price --> price series
// @param  length (int) --> It's period. Default: 10
// @returns hma --> hma output series

export  hma(float price, simple int length=10) =>
	hma = ta.hma(price, length)
	hma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//hma_ = hma(close, 10)
//plot_hma = plot(hma_, 'hma', color=color.new(color.green, 0), linewidth=1)






// HWMA (Holt-Winter Moving Average)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function HWMA (Holt-Winter Moving Average)
// @function Indicator HWMA (Holt-Winter Moving Average) is a three-parameter moving average by the Holt-Winter method; the three parameters should be selected to obtain a forecast.
// @function  https://www.mql5.com/en/code/20856
// @param   price --> price series
// @param na (float)--> Smoothed series parameter (from 0 to 1). Default--> 0.2
// @param nb (float)--> Trend parameter (from 0 to 1). Default--> 0.1
// @param nc (float)--> Seasonality parameter (from 0 to 1). Default: 0.1
// @returns hwma --> hwma output series

export  hwma(float price, simple float na=0.2, simple float nb=0.1, simple float nc=0.1) =>
	F = 0.0
	V = 0.0
	A = 0.0
	_hwma = 0.0
	
	F := (1.0 - na) * (nz(F[1] + nz(V[1]) + 0.5 * nz(A[1]))) + na * price
	V := (1.0 - nb) * (nz(V[1]) +  nz(A[1]) + nb * (F - nz(F[1])))
	A := (1.0 - nc) * nz(A[1]) + nc * (V - nz(V[1]))
	_hwma := F + (V + (A/2))
	_hwma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//hwma_ = hwma(close, 0.2, 0.1, 0.1)
//plot_hwma = plot(hwma_, 'hwma', color=color.new(color.green, 0), linewidth=1)




// Ichimoku Kinkō Hyō (ichimoku)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Ichimoku Kinkō Hyō (ichimoku)
// @function Developed Pre WWII as a forecasting model for financial markets.
// @function https://www.tradingtechnologies.com/help/x-study/technical-indicator-definitions/ichimoku-ich/
// @param Turning (int)--> Tenkan period. Default--> 9
// @param Standard (int)--> Kijun period. Default--> 26
// @param Delayed (int)--> Senkou period. Default--> 52
// @returns ichimoku --> ichimoku output series

export ichimoku(simple int Standard = 26, simple int Turning =9,  simple int Delayed = 52) =>
	StdLine = 0.00
	TurnLine = 0.00
	DelayLine = 0.00
	Span1 = 0.00
	Span2 = 0.00
	
	StdLine := (ta.highest(high, Standard) + ta.lowest(low, Standard)) / 2
	TurnLine := (ta.highest(high, Turning) + ta.lowest(low, Turning)) / 2
	DelayLine := close[Standard]
	Span1 := (StdLine + TurnLine) / 2
	Span2 := (ta.highest(high, Delayed) + ta.lowest(low, Delayed)) / 2
	[StdLine, TurnLine, DelayLine, Span1, Span2]

// Fundmion Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[StdLine, TurnLine, DelayLine, Span1, Span2] = ichimoku(26, 9, 52)
//plot_StdLine = plot(StdLine, 'StdLine', color=color.new(color.green, 0), linewidth=1)
//plot_TurnLine = plot(TurnLine, 'TurnLine', color=color.new(color.red, 0), linewidth=1)
//plot_DelayLine = plot(DelayLine, color=color.yellow, style=plot.style_circles)




// Jurik Moving Average Average (JMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Jurik Moving Average Average (JMA)
// @function Mark Jurik's Moving Average (JMA) attempts to eliminate noise to see the "true" underlying activity. It has extremely low lag, is very smooth and is responsive to market gaps.
// @function  https://c.mql5.com/forextsd/forum/164/jurik_1.pdf
// @param   price --> price series
// @param length (int)--> Period of calculation. Default--> 7
// @param phase (float)--> How heavy/light the average is [-100, 100]. Default--> 50
// @param power (int)--> power of jma. Default--> 2
// @returns jma --> jma output series

export  jma(float price, simple int length=7, simple float phase=50, simple int power=2) =>
    phaseRatio = phase < -100 ? 0.5 : phase > 100 ? 2.5 : phase / 100 + 1.5
    beta = 0.45 * (length - 1) / (0.45 * (length - 1) + 2)
    alpha = math.pow(beta, power)
    jma = 0.0
    e0 = 0.0
    e0 := (1 - alpha) * price + alpha * nz(e0[1])
    e1 = 0.0
    e1 := (price - e0) * (1 - beta) + beta * nz(e1[1])
    e2 = 0.0
    e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * math.pow(1 - alpha, 2) + math.pow(alpha, 2) * nz(e2[1])
    jma := e2 + nz(jma[1])
    jma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//jma_ = jma(close, 7, 50,2)
//plot_jma = plot(jma_, 'jma', color=color.new(color.green, 0), linewidth=1)



// Kaufman's Adaptive Moving Average (KAMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Kaufman's Adaptive Moving Average (KAMA)
// @function Developed by Perry Kaufman, Kaufman's Adaptive Moving Average (KAMA) is a moving average designed to account for market noise or volatility.
// @function  https://www.tradingview.com/script/nZuBWW9j-Jurik-Moving-Average/  courtesy of everget
// @param   price --> price series
// @param length (int)--> It's period. Default--> 10
// @param fast (int)--> Fast MA period. Default--> 2
// @param slow (int)--> Slow MA period. Default--> 30
// @returns kama --> kama output series

AMA(Period, Price) =>
	//Vars: 
	Noise = 0.00
	Signal = 0.00
	Diff = 0.00
	efRatio = 0.00
	Smooth = 1.00
	Fastest = 0.6667
	Slowest = 0.0645
	AdaptMA = 0.00
	AMA = 0.00

	Diff := math.abs(Price - nz(Price[1]))
	if bar_index <= Period
		AdaptMA := Price
		AdaptMA
	if bar_index > Period
		Signal := math.abs(Price - nz(Price[Period]))
		Noise := math.sum(Diff, Period)
		efRatio := Signal / Noise
		Smooth := math.pow(efRatio * (Fastest - Slowest) + Slowest, 2)
		AdaptMA := nz(AdaptMA[1]) + Smooth * (Price - nz(AdaptMA[1]))
		AdaptMA
	AMA := AdaptMA
	AMA

AMAF(Period, Pcnt, Price) =>
	//Vars: 
	Noise = 0.00
	Signal = 0.00
	Diff = 0.00
	efRatio = 0.00
	Smooth = 1.00
	Fastest = 0.6667
	Slowest = 0.0645
	AdaptMA = 0.00
	AMAFltr = 0.00
	AMAF = 0.00
	Diff := math.abs(Price - nz(Price[1]))
	if bar_index <= Period
		AdaptMA := Price
		AdaptMA

	if bar_index > Period
		Signal := math.abs(Price - nz(Price[Period]))
		Noise := math.sum(Diff, Period)
		efRatio := Signal / Noise
		Smooth := math.pow(efRatio * (Fastest - Slowest) + Slowest, 2)
		AdaptMA := nz(AdaptMA[1]) + Smooth * (Price - nz(AdaptMA[1]))
		AMAFltr := ta.stdev(AdaptMA - nz(AdaptMA[1]), Period) * Pcnt
		AMAFltr
	AMAF := AMAFltr
	AMAF
	
export  kama(float price, simple int length=10, simple int fast=2, simple int slow=30) =>

	//Vars: 
	kamaf = 0.00
	kamas = 0.00
	
	kamaf := ta.linreg(AMA(length, price), fast, 0)
	kamas := ta.linreg(AMA(length, price), slow, 0)
    [kamaf, kamas]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[kamaf, kamas] = kama(close, 10, 2,30)
//plot_kamaf = plot(kamaf, 'kamaf', color=color.new(color.green, 0), linewidth=1)
//plot_kamas = plot(kamas, 'kamas', color=color.new(color.red, 0), linewidth=1)






// Linear Regression Moving Average (linreg)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Linear Regression Moving Average (linreg)
// @function Linear Regression Moving Average (LINREG). This is a simplified version of a Standard Linear Regression. LINREG is a rolling regression of one variable. A Standard Linear Regression is between two or more variables.
// @param   price --> price series
// @param length (int)--> Period of calculation. Default--> 10
// @returns linreg --> linreg output series

export  linreg(float price, simple int length=10) =>
    linreg = ta.linreg(price, length,0)
	linreg
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//linreg_ = linreg(close, 10)
//plot_linreg = plot(linreg_, 'linreg', color=color.new(color.green, 0), linewidth=1)




// McGinley Dynamic Indicator
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function McGinley Dynamic Indicator
// @function The McGinley Dynamic looks like a moving average line, yet it is actually a smoothing mechanism for prices that minimizes price separation, price whipsaws, and hugs prices much more closely.
// @param price --> price series
// @param length (int)--> Period of calculation. Default--> 10
// @returns mgcd --> mgcd output series

export  mgcd(float price, simple int length=10) =>
	log = false
	src = log ? math.log(price) : price  //makes it faster
	mg = 0.0
	mg := na(mg[1]) ? ta.ema(src, length) : nz(mg[1]) + (src - nz(mg[1])) / (length * math.pow(src / (nz(mg[1])+0.0000001), 4))

	mgFinal = log ? math.exp(mg) : mg
	mgcd = mg
	mgcd
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//mgcd_ = mgcd(close, 10)
//plot_mgcd = plot(mgcd_, 'mgcd', color=color.new(color.green, 0), linewidth=1)



// wildeR's Moving Average (RMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function wildeR's Moving Average (RMA)
// @function The WildeR's Moving Average is simply an Exponential Moving Average (EMA) with a modified alpha = 1 / length.
// @function   https://tlc.thinkorswim.com/center/reference/Tech-Indicators/studies-library/V-Z/WildersSmoothing
// @param   price --> price series
// @param length (int)--> Period of calculation. Default--> 10
// @returns rma --> rma output series

export  rma(float price, simple int length=10) =>
    rma = ta.rma(price, length)
	rma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//rma_ = rma(close, 10)
//plot_rma = plot(rma_, 'rma', color=color.new(color.green, 0), linewidth=1)





// Sine Weighted Moving Average (SWMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Sine Weighted Moving Average (SWMA)
// @function A weighted average using sine cycles. The middle term(s) of the average have the highest weight(s).
// @function https://www.tradingview.com/script/6MWFvnPO-Sine-Weighted-Moving-Average/ courtesy of everget
// @param   price --> price series
// @param length (int)--> Period of calculation. Default--> 10
// @returns sinwma --> sinwma output series

export  sinwma(float price, simple int length=10) =>
	PI = 2 * math.asin(1)
	sum = 0.0
	weightSum = 0.0
	
	for i = 0 to length - 1 by 1
		weight = math.sin((i + 1) * PI / (length + 1))
		sum += nz(price[i]) * weight
		weightSum += weight
		weightSum	
	sinwma = sum / weightSum
	sinwma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//sinwma_ = sinwma(close, 10)
//plot_sinwma = plot(sinwma_, 'sinwma', color=color.new(color.green, 0), linewidth=1)




// Ehler's Super Smoother Filter (SSF) © 2013
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Ehler's Super Smoother Filter (SSF) © 2013
// @function John F. Ehlers's solution to reduce lag and remove aliasing noise with his research in aerospace analog filter design. This indicator comes with two versions determined by the keyword poles. By default, it uses two poles but there is an option for three poles.
// @function   https://www.tradingview.com/script/EB4Fte65-blackcat-L2-Ehlers-Super-Smoother-Filter/
// @param   Price --> price series
// @returns ssf --> ssf output series

export  ssf(float Price) =>
	a1 = 0.00
	b1 = 0.00
	c1 = 0.00
	c2 = 0.00
	c3 = 0.00
	Filt = 0.00
	Trigger = 0.00
	pi = 2 * math.asin(1)
	
	a1 := math.exp(-1.414 * 3.14159 / 10)
	b1 := 2 * a1 * math.cos(1.414 * 2 * pi / 10)
	c2 := b1
	c3 := -a1 * a1
	c1 := 1 - c2 - c3
	Filt := c1 * (Price + Price[1]) / 2 + c2 * nz(Filt[1]) + c3 * nz(Filt[2])
	Trigger := nz(Filt[2])
	[Filt, Trigger]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[Filt, Trigger] = ssf(close)
//plot_Filt = plot(Filt, 'Filt', color=color.new(color.green, 0), linewidth=1)
//plot_Trigger = plot(Trigger, 'Trigger', color=color.new(color.red, 0), linewidth=1)





// Supertrend (supertrend)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Supertrend (supertrend)
// @function Supertrend is an overlap indicator. It is used to help identify trend direction, setting stop loss, identify support and resistance, and/or generate buy & sell signals.
// @function https://www.tradingview.com/script/VLWVV7tH-SuperTrend/ courtesy of everget
// @param   price --> price series
// @param length (int) -->length for ATR calculation. Default-->7
// @param multiplier (float)-->Coefficient for upper and lower band distance to midrange. Default-->3.0
// @returns supertrend --> supertrend output series

export  supertrend(simple int length, simple int multiplier=3) =>
	[supertrend, direction] = ta.supertrend(length, multiplier)
	[supertrend, direction]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[supertrend, direction] = supertrend(7, 3)
//plot_supertrend = plot(supertrend, 'supertrend', color=color.new(color.green, 0), linewidth=1)
//plot_direction = plot(direction, 'direction', color=color.new(color.red, 0), linewidth=1)




// X simple moving average
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function X simple moving average
// @function simple moving average with weight
// @param  src --> source series
// @param len --> period length
// @param wei --> weight coefficient
// @returns out series --> xsa output series

export  xsa( float src, simple float len, simple float wei) =>
    //delcare float sum variable
    sum = 0.0
    //delcare float ma variable
    ma = 0.0
    //declare float out variable
    out = 0.0
    //use recursive algorithm to realize
    sum := nz(sum[1]) - nz(src[len]) + src
    ma := na(src[len]) ? na : sum / len
    //return xsa in tdx
    out := na(out[1]) ? ma : (src * wei + out[1] * (len - wei)) / len
    out
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xsa(close, 13, 1)
//plot_xsa = plot(out, 'xsa', color=color.new(color.green, 0), linewidth=1)




// Symmetric Weighted Moving Average (SWMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Symmetric Weighted Moving Average (SWMA)
// @function Symmetric Weighted Moving Average where weights are based on a symmetric triangle. 
// @function https://www.tradingview.com/study-script-reference/#fun_swma
// @param   price --> price series
// @returns swma --> swma output series

export  swma(float price) =>
	swma = ta.swma(price)
	swma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//swma = swma(close)
//plot_swma = plot(swma, 'swma', color=color.new(color.green, 0), linewidth=1)



// Tim Tillson's T3 Moving Average (T3)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Tim Tillson's T3 Moving Average (T3)
// @function Tim Tillson's T3 Moving Average is considered a smoother and more responsive moving average relative to other moving averages.
// @function  https://www.tradingview.com/script/jTf7ZhOC-T3-Moving-Average/ courtesy of everget
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @param a (float)--> 0 < a < 1. Default--> 0.7
// @returns t3 --> t3 output series

gd(price, length, a) =>
	ta.ema(price, length) * (1 + a) - ta.ema(ta.ema(price, length), length) * a

export  t3(float price, simple int length, float a) =>
	t3 = gd(gd(gd(price, length,a), length,a), length,a)
	t3
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//t3_ = t3(close, 10, 0.7)
//plot_t3 = plot(t3_, 't3', color=color.new(color.green, 0), linewidth=1)



// Triple Exponential Moving Average (TEMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Triple Exponential Moving Average (TEMA)
// @function A less laggy Exponential Moving Average.
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns tema --> tema output series

export  tema(float price, simple int length) =>
	ema1 = ta.ema(price, length)
	ema2 = ta.ema(ema1, length)
	ema3 = ta.ema(ema2, length)
	tema = 3 * (ema1 - ema2) + ema3
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//tema_ = tema(close, 10)
//plot_tema = plot(tema_, 'tema', color=color.new(color.green, 0), linewidth=1)





// Triangular Moving Average (TRIMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Triangular Moving Average (TRIMA)
// @function A weighted moving average where the shape of the weights are triangular and the greatest weight is in the middle of the period.
// @function  https://www.tradingview.com/script/Y3mprx4L-Triangular-Moving-Average/ courtesy of everget
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns trima --> trima output series

export  trima(float price, simple int length) =>
	trima = ta.sma(ta.sma(price, math.ceil(length / 2)), math.floor(length / 2) + 1)
	trima
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//trima_ = trima(close, 10)
//plot_trima = plot(trima_, 'trima', color=color.new(color.green, 0), linewidth=1)



// Variable Index Dynamic Average (VIDYA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Variable Index Dynamic Average (VIDYA)
// @function Variable Index Dynamic Average (VIDYA) was developed by Tushar Chande. It is similar to an Exponential Moving Average but it has a dynamically adjusted lookback period dependent on relative price volatility as measured by Chande Momentum Oscillator (CMO). When volatility is high, VIDYA reacts faster to price changes. It is often used as moving average or trend identifier.
// @function  https://www.tradingview.com/script/Y3mprx4L-Triangular-Moving-Average/ courtesy of everget
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns vidya --> vidya output series

// Chande Momentum Oscillator
getCMO(price, length) =>
	mom = ta.change(price)
	upSum = math.sum(math.max(mom, 0), length)
	downSum = math.sum(-math.min(mom, 0), length)
	out = (upSum - downSum) / (upSum + downSum)
	out

export  vidya(float price, simple int length) =>
	cmo = math.abs(getCMO(price, length))
	alpha = 2 / (length + 1)
	vidya = 0.0
	vidya := price * alpha * cmo + nz(vidya[1]) * (1 - alpha * cmo)
	vidya
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//vidya_ = vidya(close, 10)
//plot_vidya = plot(vidya_, 'vidya', color=color.new(color.green, 0), linewidth=1)



// Volume Weighted Average Price (VWAP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Volume Weighted Average Price (VWAP)
// @function The Volume Weighted Average Price that measures the average typical price by volume.  It is typically used with intraday charts to identify general direction.
// @function  https://www.tradingview.com/wiki/Volume_Weighted_Average_Price_(VWAP)
// @param   price --> price series
// @returns vwap --> vwap output series

export  vwap(float price) =>
	vwap = ta.vwap(price)
	vwap
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//vwap_ = vwap(close)
//plot_vwap = plot(vwap_, 'vwap', color=color.new(color.green, 0), linewidth=1)


// Volume Weighted Moving Average (VWMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Volume Weighted Moving Average (VWMA)
// @function Volume Weighted Moving Average.
// @function   https://www.motivewave.com/studies/volume_weighted_moving_average.htm
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns vwma --> vwma output series

export  vwma(float price, simple int length) =>
	vwma = ta.vwma(price, length)
	vwma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//vwma_ = vwma(close,10)
//plot_vwma = plot(vwma_, 'vwma', color=color.new(color.green, 0), linewidth=1)



// Weighted Moving Average (WMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Weighted Moving Average (WMA)
// @function The Weighted Moving Average where the weights are linearly increasing and the most recent data has the heaviest weight.
// @function    https://en.wikipedia.org/wiki/Moving_average#Weighted_moving_average
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns wma --> wma output series

export  wma(float price, simple int length) =>
	wma = ta.wma(price, length)
	wma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//wma_ = wma(close, 10)
//plot_wma = plot(wma_, 'wma', color=color.new(color.green, 0), linewidth=1)





// Zero Lag Moving Average (ZLMA)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Zero Lag Moving Average (ZLMA)
// @function The Zero Lag Moving Average attempts to eliminate the lag associated with moving averages.  This is an adaption created by John Ehler and Ric Way.
// @function  https://www.tradingview.com/script/Oxizu1k7-Zero-Lag-Exponential-Moving-Average/  courtesy of everget
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns zlma --> zlma output series

export  zlma(float price, simple int length) =>
	lag = math.floor((length - 1) / 2)
	zlma = ta.ema(price + price - price[lag], length)
	zlma
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//zlma_ = zlma(close, 10)
//plot_zlma = plot(zlma_, 'zlma', color=color.new(color.green, 0), linewidth=1)



// Entropy (ENTP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Entropy (ENTP)
// @function Introduced by Claude Shannon in 1948, entropy measures the unpredictability of the data, or equivalently, of its average information. A die has higher entropy (p=1/6) versus a coin (p=1/2).
// @function  https://www.tradingview.com/script/90gGxKtX-Shannon-Entropy-V2/ courtesy of kocurekc
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns entropy --> entropy output series

export  entropy(float price, simple int length) =>
	//Shannon Entropy, for source (close) or for Volume or both
	vc = true
	bc = true
	cr = price / math.sum(price, length)
	vr = math.log(volume) / math.sum(math.log(volume), length)
	entropy = (vc ? math.sum(vr * math.log10(vr) / math.log10(2), length) : 0) - (bc ? vc ? math.sum(cr * math.log10(cr) / math.log10(2), length) : math.sum(cr * math.log10(cr) / math.log10(2), length) : 0)
	entropy
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//entropy_ = entropy(close,10)
//plot_entropy = plot(entropy_, 'entropy', color=color.new(color.green, 0), linewidth=1)




// Rolling Kurtosis
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Rolling Kurtosis
// @function KURTOSIS = close.rolling(length).kurt()
// @function https://www.tradingview.com/script/Qe90JYge-Kurtosis-Indicator/  courtesy of everget
// @param   price --> price series
// @param length (int) --> It's period. Default--> 10
// @returns kurtosis --> kurtosis output series

export  kurtosis(float price, simple int length) =>
	// Kurtosis
	kurtosis = ta.change(price, length) - ta.change(price[1], length)
	kurtosis
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//kurtosis_ = kurtosis(close, 10)
//plot_kurtosis = plot(kurtosis_, 'kurtosis', color=color.new(color.green, 0), linewidth=1)



// Rolling Skew
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Rolling Skew
// @function SKEW = close.rolling(length).skew()
// @function https://www.tradingview.com/script/LiQbTD6e-Moments-Mean-Variance-Skewness-Kurtosis-pig/  courtesy of balipour
// @param   price --> price series
// @param length (int) --> It's period. Default: 30
// @returns skew --> skew output series

export  skew(float price, simple int length) =>
    //Mean
    mean = ta.sma(price, length)
    //Sample Standard Deviation for Sample Skewness (need to use custom sample sd function instead of build in stdev) 
    s1 = array.new_float(0)
    for i = 0 to length - 1 by 1
        array.push(s1, math.pow(price[i] - mean, 2))
    sum = array.sum(s1)
    variance = sum / (length - 1)
    std = math.sqrt(variance)
    //Skewness calculation
    s2 = array.new_float(0)
    for i = 0 to length - 1 by 1
        array.push(s2, math.pow(price[i] - mean, 3))  //third moment deviation from the mean to the power of 3
    sum2 = array.sum(s2)
    //Unbiased Estimator For Sample Skewness
    a = sum2 * length
    b = (length - 1) * (length - 2) * math.pow(std, 3)  //third momemnt SD to the power of 3
    skewness = a / b
    skewness
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//skew_ = skew(close, 30)
//plot_skew = plot(skew_, 'skew', color=color.new(color.green, 0), linewidth=1)




// Condition all
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Condition all
// @function True when all true in condtion series
// @param  cond --> bool series
// @param length --> period length
// @returns xev series --> xev output series

export  xev( bool cond, simple int length) =>
	occur = count(cond, length) == length ? true : false
	occur
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xev(close>open, 3)
//plot_xev = plot(bton(out), 'xev', color=color.new(color.green, 0), linewidth=1)






// Rolling Z Score
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Rolling Z Score
// @function ZSCORE = (close - mean) / std
// @function https://www.tradingview.com/script/gRy0oaSB-Z-Score/  courtesy of balipour
// @param   price --> price series
// @param length (int) --> It's period. Default: 30
// @returns zscore --> zscore output series

sampleStdev(src, length) =>
	dev = src - ta.sma(src, length)
	variance = math.sum(dev * dev, length) / (length - 1)
	math.sqrt(variance)

export  zscore(float price, simple int length = 30) =>

	
	selectedStdev = ta.stdev(price, length)
	//selectedStdev =	sampleStdev(price, length)
	
	zsc = (price - ta.sma(price, length)) / selectedStdev
	zsc
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//zscore_ = zscore(close, 30)
//plot_zscore = plot(zscore_, 'zscore', color=color.new(color.green, 0), linewidth=1)



// Average Directional Movement (ADX)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Average Directional Movement (ADX)
// @function Average Directional Movement is meant to quantify trend strength by measuring the amount of movement in a single direction.
// @function https://www.tradingtechnologies.com/help/x-study/technical-indicator-definitions/average-directional-movement-adx/
// @param length (int)--> It's period. Default--> 14
// @param lensig (int)--> Signal Length. Like TradingView's default ADX. Default--> length
// @returns adx --> adx output series

export  adx(simple int length = 14, simple int lensig = 6) =>
	[diplus, diminus, adx] = ta.dmi(length, lensig)
	adx
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//adx_ = adx(14, 6)
//plot_adx = plot(adx_, 'adx', color=color.new(color.green, 0), linewidth=1)




// Aroon & Aroon Oscillator (AROON)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Aroon & Aroon Oscillator (AROON)
// @function Aroon attempts to identify if a security is trending and how strong.
// @function https://www.tradingview.com/script/9VbZxX7T-Aroon-Oscillator/ courtesy of jcrewolinski
// @param   price --> price series
// @param length (int)--> It's period. Default--> 14
// @returns aroon --> aroon output series

export  aroon(float price, simple int length = 14) =>
	upper = 0.00
	lower = 0.00
	oscillator =0.00
	upper := 100 * (ta.highestbars(price, length + 1) + length) / length
	lower := 100 * (ta.lowestbars(price, length + 1) + length) / length
	oscillator := upper - lower
	[upper, lower, oscillator]
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[upper, lower, oscillator] = aroon(close, 14)
//plot_upper = plot(upper, 'upper', color=color.new(color.green, 0), linewidth=1)
//plot_lower = plot(lower, 'lower', color=color.new(color.red, 0), linewidth=1)
//plot_oscillator = plot(oscillator, 'oscillator', color=color.new(color.yellow, 0), linewidth=1)


// Choppiness Index (CHOP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Choppiness Index (CHOP)
// @function The Choppiness Index was created by Australian commodity trader E.W. Dreiss and is designed to determine if the market is choppy (trading sideways) or not choppy (trading within a trend in either direction). Values closer to 100 implies the underlying is choppier whereas values closer to 0 implies the underlying is trending.
// @function https://www.tradingview.com/script/SduZEj4k/ courtesy of ceyhun
// @param length (int)--> It's period. Default--> 14
// @returns chop --> chop output series

export  chop(simple int length = 14) =>
	chop = 100 * math.log10(math.sum(ta.atr(1), length) / (ta.highest(length) - ta.lowest(length))) / math.log10(length)
    chop
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//chop_ = chop(14)
//plot_chop = plot(chop_, 'chop', color=color.new(color.green, 0), linewidth=1)




// Condition any
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Condition any
// @function True when any true in condtion series
// @param  cond --> bool series
// @param length --> period length
// @returns xex series --> xex output series

export  xex( bool cond, simple int length) =>
	occur = count(cond, length) != 0 ? true : false
	occur
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//out= xex(close==open, 13)
//plot_xex = plot(bton(out), 'xex', color=color.new(color.green, 0), linewidth=1)




// Chande Kroll Stop (CKSP)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Chande Kroll Stop (CKSP)
// @function The Tushar Chande and Stanley Kroll in their book “The New Technical Trader”. It is a trend-following indicator,identifying your stop by calculating the average true range of the recent market volatility. The indicator defaults to the implementation found on tradingview but it provides the original book implementation as well, which differs by the default periods and moving average mode. While the trading view implementation uses the Welles Wilder moving average, the book uses a simple moving average.
// @function https://www.tradingview.com/script/N7bZpRPT-CKSD/ courtesy of AvgustRak
// @param p (int) --> ATR and first stop period. Default: 10 in both modes
// @param x (float) --> ATR scalar. Default: 1 in TV mode, 3 otherwise
// @param q (int) --> Second stop period. Default: 9 in TV mode, 20 otherwise
// @returns cksp --> cksp output series

export  cksp(simple int p = 10, simple int x = 1, simple int q = 9) =>
	first_high_stop = ta.highest(high, p) - x * ta.atr(p)
	first_low_stop = ta.lowest(low, p) + x * ta.atr(p)
	stop_short = ta.highest(first_high_stop, q)
	stop_long = ta.lowest(first_low_stop, q)
	[stop_short, stop_long]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[stop_short, stop_long] = cksp(10,1, 9)
//plot_stop_short = plot(stop_short, 'stop_short', color=color.new(color.green, 0), linewidth=1)
//plot_stop_long = plot(stop_long, 'stop_long', color=color.new(color.red, 0), linewidth=1)




// Detrend Price Oscillator (DPO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Detrend Price Oscillator (DPO)
// @function Is an indicator designed to remove trend from price and make it easier to identify cycles.
// @function  https://www.tradingview.com/scripts/detrendedpriceoscillator/
// @param price --> Series of 'ohlc's
// @param length (int) --> It's period. Default: 21
// @param centered (bool) --> Shift the dpo back by int(0.5 * length) + 1. Default: True
// @returns dpo --> dpo output series

export  dpo(float price, simple int length = 21, simple bool centered = false) =>
	barsback = length/2 + 1
	ma = ta.sma(price, length)
	dpo = centered ? price[barsback] - ma : price - ma[barsback]
	dpo
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//_dpo = dpo(close, 21, false)
//plot_dpo = plot(_dpo, 'dpo', color=color.new(color.green, 0), linewidth=1)




// Long Run
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Long Run
// @param fast (int) --> It's period. Default: 3
// @param slow (int) --> It's period. Default: 8
// @param length (int) --> It's period. Default: 13
// @returns long_run --> long_run output series

export  long_run( simple int fast = 3, simple int slow = 8, simple int length = 13) =>
    pb = ta.rising(fast, length) and ta.falling(slow, length)  // potential bottom or bottom
    bi = ta.rising(fast, length) and ta.rising(slow, length)  // fast and slow are increasing
    long_run = pb or bi 
	long_run
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//_long_run = long_run(3, 8 ,13)
//plot_long_run = plot(bton(_long_run), 'long_run', color=color.new(color.green, 0), linewidth=1)



// Parabolic Stop and Reverse (psar)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Parabolic Stop and Reverse (psar)
// @function Parabolic Stop and Reverse (PSAR) was developed by J. Wells Wilder, that is used to determine trend direction and it's potential reversals in price. PSAR uses a trailing stop and reverse method called "SAR," or stop and reverse, to identify possible entries and exits. It is also known as SAR. PSAR indicator typically appears on a chart as a series of dots, either above or below an asset's price, depending on the direction the price is moving. A dot is placed below the price when it is trending upward, and above the price when it is trending downward.
// @function https://www.tradingview.com/pine-script-reference/#fun_sar
// @param af0 (float)--> Initial Acceleration Factor. Default--> 0.02
// @param af (float)--> Acceleration Factor. Default--> 0.02
// @param max_af (float)--> Maximum Acceleration Factor. Default--> 0.2
// @returns psar --> psar output series

export  psar(simple float af0 = 0.02, simple float af = 0.02, simple float max_af = 0.2) =>
    psar = ta.sar(af0, af, max_af) 
	psar
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//_psar = psar(0.02, 0.02 , 0.2)
//plot_psar = plot(_psar, 'psar', color=color.new(color.green, 0), linewidth=1)




// Short Run
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Short Run
// @param fast (int) --> It's period. Default: 3
// @param slow (int) --> It's period. Default: 8
// @param length (int) --> It's period. Default: 13
// @returns short_run --> short_run output series

export  short_run( simple int fast = 3, simple int slow = 8, simple int length = 13) =>
    pt = ta.falling(fast, length) and ta.rising(slow, length)  // potential bottom or bottom
    bd = ta.falling(fast, length) and ta.falling(slow, length)  // fast and slow are falling
    short_run = pt or bd 
	short_run
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//_short_run = short_run(3, 8 ,13)
//plot_short_run = plot(bton(_short_run), 'short_run', color=color.new(color.green, 0), linewidth=1)


// Vertical Horizontal Filter (VHF)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Vertical Horizontal Filter (VHF)
// @function VHF was created by Adam White to identify trending and ranging markets.
// @function https://www.incrediblecharts.com/indicators/vertical_horizontal_filter.php
// @function https://cn.tradingview.com/script/TkvqDfpu-Vertical-Horizontal-Filter/   courtesy of everget
// @param  price --> price series
// @param length (int) --> It's period. Default--> 28
// @returns vhf --> vhf output series

export  vhf(float price, simple int length) =>
	vhf = math.abs(ta.highest(price, length) - ta.lowest(price, length)) / math.sum(math.abs(ta.change(price)), length)
	vhf
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//vhf_ = vhf(close, 10)
//plot_vhf = plot(vhf_, 'vhf', color=color.new(color.green, 0), linewidth=1)



// Vortex
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Vortex
// @function Two oscillators that capture positive and negative trend movement.
// @function https://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:vortex_indicator
// @param  length (int) --> ROC 1 period. Default --> 14
// @returns vortex --> vortex output series

export  vortex(simple int length = 14) =>
	vmp = math.sum(math.abs(high - low[1]), length)
	vmm = math.sum(math.abs(low - high[1]), length)
	str = math.sum(ta.atr(1), length)
	vip = vmp / str
	vim = vmm / str
	[vip, vim]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[vip, vim] = vortex(14)
//plot_vip = plot(vip, 'vip', color=color.new(color.green, 0), linewidth=1)
//plot_vim = plot(vim, 'vim', color=color.new(color.red, 0), linewidth=1)





// Acceleration Bands (ACCBANDS)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Acceleration Bands (ACCBANDS)
// @function Acceleration Bands created by Price Headley plots upper and lower envelope bands around a simple moving average.
// @function https://cn.tradingview.com/script/FiaLOcXz-Acceleration-Bands/  courtesy of everget
// @param  price --> price series
// @param  length (int) --> period length. Default --> 10
// @param  c (int) --> Multiplier. Default --> 4
// @returns accbands --> accbands output series

export  accbands(float price, simple int length = 10, simple int c = 4) =>
	mult = c* (high - low) / (high + low)
	upperBandSrc = high * (1 + mult)
	upperBand = ta.sma(upperBandSrc, length)
	basis = ta.sma(price, length)
	lowerBandSrc = low * (1 - mult)
	lowerBand = ta.sma(lowerBandSrc, length)
	[lowerBand, basis, upperBand]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[lowerBand, basis, upperBand] = accbands(close, 10, 4)
//plot_lowerBand = plot(lowerBand, 'lowerBand', color=color.new(color.green, 0), linewidth=1)
//plot_basis = plot(basis, 'basis', color=color.new(color.red, 0), linewidth=1)
//plot_upperBand = plot(upperBand, 'upperBand', color=color.new(color.yellow, 0), linewidth=1)



// Average True Range (ATR)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Average True Range (ATR)
// @function Averge True Range is used to measure volatility, especially volatility caused by gaps or limit moves.
// @function  https://www.tradingview.com/wiki/Average_True_Range_(ATR)
// @param length (int) --> It's period. Default--> 14
// @returns atr --> atr output series

export  atr(simple int length) =>
	atr = ta.rma(ta.tr(true), length)
	atr
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//atr_ = atr(10)
//plot_atr = plot(atr_, 'atr', color=color.new(color.green, 0), linewidth=1)



// Bollinger Bands (BBANDS)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Bollinger Bands (BBANDS)
// @function A popular volatility indicator by John Bollinger.
// @function https://www.tradingview.com/wiki/Bollinger_Bands_(BB)
// @param  price --> price series
// @param  length (int) --> period length. Default --> 20
// @param   mult (int) --> The long period. Default --> 2
// @returns bbands --> bbands output series

export  bbands(float price, simple int length = 20, simple int mult = 2) =>
	basis = ta.sma(price, length)
	dev = mult * ta.stdev(price, length)
	upper = basis + dev
	lower = basis - dev
	[lower, basis, upper]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[lower, basis, upper] = bbands(close, 20, 2)
//plot_lower = plot(lower, 'lower', color=color.new(color.green, 0), linewidth=1)
//plot_basis = plot(basis, 'basis', color=color.new(color.red, 0), linewidth=1)
//plot_upper = plot(upper, 'upper', color=color.new(color.yellow, 0), linewidth=1)


// Donchian Channels (DC)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Donchian Channels (DC)
// @function Donchian Channels are used to measure volatility, similar to Bollinger Bands and Keltner Channels
// @function  https://www.tradingview.com/wiki/Donchian_Channels_(DC)
// @param lower_length (int)--> The short period. Default--> 20
// @param upper_length (int)--> The short period. Default--> 20
// @returns donchian --> donchian output series

export  donchian(simple int lower_length = 20, simple int upper_length = 20) =>
	lower = ta.lowest(lower_length)
	upper = ta.highest(upper_length)
	basis = math.avg(upper, lower)
	[lower, basis, upper]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[lower, basis, upper] = donchian(20, 20)
//plot_lower = plot(lower, 'lower', color=color.new(color.green, 0), linewidth=1)
//plot_basis = plot(basis, 'basis', color=color.new(color.red, 0), linewidth=1)
//plot_upper = plot(upper, 'upper', color=color.new(color.yellow, 0), linewidth=1)


// Keltner Channels (KC)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Keltner Channels (KC)
// @function A popular volatility indicator similar to Bollinger Bands and Donchian Channels.
// @function https://www.tradingview.com/wiki/Keltner_Channels_(KC)
// @param  price --> price series
// @param length (int)--> The period. Default--> 20
// @param mult (float)--> A positive float to scale the bands. Default--> 2
// @returns kc --> kc output series


export  kc(float price, simple int length = 20, simple float mult = 2) =>

	ma = ta.ema(price, length)
	rangema =ta.tr(true) 
	upper = ma + rangema * mult
	lower = ma - rangema * mult
	[lower, rangema, upper]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[lower, rangema, upper] = kc(close, 20, 2)
//plot_lower = plot(lower, 'lower', color=color.new(color.green, 0), linewidth=1)
//plot_rangema = plot(rangema, 'rangema', color=color.new(color.red, 0), linewidth=1)
//plot_upper = plot(upper, 'upper', color=color.new(color.yellow, 0), linewidth=1)





// Mass Index (MASSI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Mass Index (MASSI)
// @function The Mass Index is a non-directional volatility indicator that utilitizes the High-Low Range to identify trend reversals based on range expansions.
// @function https://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:mass_index
// @function https://cn.tradingview.com/script/6Kad9381-Mass-Index/   courtesy of everget
// @param  fast (int)--> The short period. Default--> 9
// @param  slow (int)--> The long period. Default--> 25
// @returns massi --> massi output series

export  massi(simple int fast = 9, simple int slow = 25) =>
	massi = math.sum(ta.ema(high - low, fast) / ta.ema(ta.ema(high - low, fast), fast), slow)
	massi
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//massi_ = massi(9, 25)
//plot_massi = plot(massi_, 'massi', color=color.new(color.green, 0), linewidth=1)




// Normalized Average True Range (NATR)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Normalized Average True Range (NATR)
// @function Normalized Average True Range attempt to normalize the average true range. This indicator was originally developed by John Forman (Stocks & Commodities , V.24:6 (May, 2006): "Cross-Market Evaluations With Normalized Average True Range"). Mr. Forman uses a normalized average true range indicator to analyze tradables across markets.
// @function https://www.tradingtechnologies.com/help/x-study/technical-indicator-definitions/normalized-average-true-range-natr/
// @function https://cn.tradingview.com/script/lZhoybZZ-Normalized-Average-True-Range/   courtesy of everget
// @param  length (int)--> The period. Default--> 20
// @returns natr --> natr output series

export  natr(simple int length = 20) =>
	natr = 100 * ta.atr(length) / close
	natr
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//natr_ = natr(20)
//plot_natr = plot(natr_, 'natr', color=color.new(color.green, 0), linewidth=1)




// Price Distance (PDIST)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Measures the "distance" covered by price movements.
// @function Normalized Average True Range attempt to normalize the average true range. This indicator was originally developed by John Forman (Stocks & Commodities , V.24:6 (May, 2006): "Cross-Market Evaluations With Normalized Average True Range"). Mr. Forman uses a normalized average true range indicator to analyze tradables across markets.
// @function   https://www.prorealcode.com/prorealtime-indicators/pricedistance/
// @function https://cn.tradingview.com/script/uifqhs9v-Price-Distance/  courtesy of Shizaru
// @returns pdist --> pdist output series

export  pdist() =>
	pdist = 2 * (high - low) - math.abs(close - open) + math.abs(open - close[1])
	pdist
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//pdist_ = pdist()
//plot_pdist = plot(pdist_, 'pdist', color=color.new(color.green, 0), linewidth=1)



// Relative Volatility Index (RVI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Relative Volatility Index (RVI)
// @function The Relative Volatility Index (RVI) was created in 1993 and revised in 1995. Instead of adding up price changes like RSI based on price direction, the RVI adds up standard deviations based on price direction.
// @function  https://www.tradingview.com/wiki/Relative Volatility Index (RVI)
// @param  price --> price series
// @param  length (int)--> The period. Default--> 14
// @returns rvi --> rvi output series

export  rvi(float price, simple int length =  14) =>
	stddev = ta.stdev(price, length)
	upper = ta.ema(ta.change(price) <= 0 ? 0 : stddev, length)
	lower = ta.ema(ta.change(price) > 0 ? 0 : stddev, length)
	rvi = upper / (upper + lower) * 100
	rvi
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//rvi_ = rvi(close, 14)
//plot_rvi = plot(rvi_, 'rvi', color=color.new(color.green, 0), linewidth=1)




// Elders Thermometer (THERMO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Elders Thermometer (THERMO)
// @function Elder's Thermometer measures price volatility.
// @function https://www.tradingview.com/script/HqvTuEMW-Elder-s-Market-Thermometer-LazyBear/   courtesy of lazybear
// @param long(int)--> The buy factor
// @param short(int)--> The sell factor
// @param length (int)--> The  period. Default--> 20
// @returns thermo --> thermo output series

export  thermo(simple int long=7, simple int short=3, simple int length = 20) =>
	thermo = high < high[1] and low > low[1] ? 0 : high - high[1] > low[1] - low ? math.abs(high - high[1]) : math.abs(low[1] - low)
	thermo_ma = ta.ema(thermo, length)
	thermo_long = thermo < (thermo_ma * long)
	thermo_short = thermo > (thermo_ma * short)
	
	[thermo, thermo_ma, thermo_long, thermo_short]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[thermo, thermo_ma, thermo_long, thermo_short] = thermo(7, 3, 20)
//plot_thermo = plot(thermo, 'thermo', color=color.new(color.green, 0), linewidth=1)
//plot_thermo_ma = plot(thermo_ma, 'thermo_ma', color=color.new(color.red, 0), linewidth=1)
//plot_thermo_long = plot(bton(thermo_long), 'thermo_long', color=color.new(color.yellow, 0), linewidth=1)
//plot_thermo_short = plot(bton(thermo_short), 'thermo_short', color=color.new(color.fuchsia, 0), linewidth=1)






// Ulcer Index (UI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Ulcer Index (UI)
// @function The Ulcer Index by Peter Martin measures the downside volatility with the use of the Quadratic Mean, which has the effect of emphasising large drawdowns.
// @function  https://cn.tradingview.com/script/QuqgdJgF-Indicator-Ulcer-Index/    courtesy of lazybear
// @param  length (int)--> The period. Default--> 14
// @returns ui --> ui output series

export  ui(float price, simple int length =  14) =>
	hcl = ta.highest(price, length)
	r = 100.0 * ((price - hcl) / hcl)
	ui = math.sqrt(math.sum(math.pow(r, 2), length) / length)
	ui
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//ui_ = ui(close, 14)
//plot_ui = plot(ui_, 'ui', color=color.new(color.green, 0), linewidth=1)




// Accumulation/Distribution (AD)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Accumulation/Distribution (AD)
// @function Accumulation/Distribution indicator utilizes the relative position of the close to it's High-Low range with volume.  Then it is cumulated.
// @function   https://www.tradingtechnologies.com/help/x-study/technical-indicator-definitions/accumulationdistribution-ad/
// @param  na
// @returns ad --> ad output series

export  ad() =>
	var cumVol = 0.
	cumVol += nz(volume)
	if barstate.islast and cumVol == 0
		runtime.error("No volume is provided by the data vendor.")
	ad = ta.cum(close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume)
	ad
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//ad_ = ad()
//plot_ad = plot(ad_, 'ad', color=color.new(color.green, 0), linewidth=1)




// Chaikin Money Flow (CMF)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Chaikin Money Flow (CMF)
// @function Chailin Money Flow measures the amount of money flow volume over a specific period in conjunction with Accumulation/Distribution.
// @function https://www.tradingview.com/wiki/Chaikin_Money_Flow_(CMF)
// @param  length (int) --> period length, default: 20.
// @returns cmf --> cmf output series

export  cmf(simple int length) =>
	var cumVol = 0.
	cumVol += nz(volume)
	if barstate.islast and cumVol == 0
		runtime.error("No volume is provided by the data vendor.")
	ad = close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume
	cmf = math.sum(ad, length) / math.sum(volume, length)
	cmf
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//cmf_ = cmf(20)
//plot_cmf = plot(cmf_, 'cmf', color=color.new(color.green, 0), linewidth=1)





// Elder's Force Index (EFI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Elder's Force Index (EFI)
// @function Elder's Force Index measures the power behind a price movement using price and volume as well as potential reversals and price corrections.
// @function https://cn.tradingview.com/script/1QoNUmC8-Elder-s-Force-Index-Double-combined-by-idu/   courtesy of ivan.dubov
// @param   length (int) --> The period. Default --> 13
// @returns efi --> efi output series

export  efi(simple int length = 13) =>
	efi = ta.ema(ta.change(close) * volume, length)
	efi
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//efi_ = efi(13)
//plot_efi = plot(efi_, 'efi', color=color.new(color.green, 0), linewidth=1)




// Ease of Movement (EOM)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Ease of Movement (EOM)
// @function Ease of Movement is a volume based oscillator that is designed to measure the relationship between price and volume flucuating across a zero line.
// @function https://www.tradingview.com/wiki/Ease_of_Movement_(EOM)
// @param   length (int) --> The period. Default --> 14
// @returns ecm --> ecm output series

export  ecm(simple int length = 14) =>
	div = 10000
	ecm = ta.sma(div * ta.change(hl2) * (high - low) / volume, length)
	ecm
	
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//ecm_ = ecm(14)
//plot_ecm = plot(ecm_, 'ecm', color=color.new(color.green, 0), linewidth=1)



// Klinger Volume Oscillator (KVO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Klinger Volume Oscillator (KVO)
// @function This indicator was developed by Stephen J. Klinger. It is designed to predict price reversals in a market by comparing volume to price.
// @function https://www.tradingview.com/wiki/Klinger Volume Oscillator (KVO)
// @param na
// @returns kvo --> kvo output series

export  kvo() =>
	var cumVol = 0.
	cumVol += nz(volume)
	if barstate.islast and cumVol == 0
		runtime.error("No volume is provided by the data vendor.")
	sv = ta.change(hlc3) >= 0 ? volume : -volume
	kvo = ta.ema(sv, 34) - ta.ema(sv, 55)
	sig = ta.ema(kvo, 13)
	[kvo, sig]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[kvo, sig] = kvo()
//plot_kvo = plot(kvo, 'kvo', color=color.new(color.green, 0), linewidth=1)
//plot_sig = plot(sig, 'sig', color=color.new(color.red, 0), linewidth=1)


// Money Flow Index (MFI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Money Flow Index (MFI)
// @function This indicator was developed by Stephen J. Klinger. It is designed to predict price reversals in a market by comparing volume to price.
// @function https://www.tradingview.com/wiki/Money Flow Index (MFI)
// @param  length (int) --> The sum period. Default --> 14
// @returns mfi --> mfi output series

export  mfi(simple int length = 14) =>
	src = hlc3
	mfi = ta.mfi(src, length)
	mfi
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//mfi_= mfi(14)
//plot_mfi = plot(mfi_, 'mfi', color=color.new(color.green, 0), linewidth=1)






// Negative Volume Index (NVI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Negative Volume Index (NVI)
// @function The Negative Volume Index is a cumulative indicator that uses volume change in an attempt to identify where smart money is active.
// @function https://cn.tradingview.com/script/3Xs25FQc-Negative-Volume-Index-NVI/   courtesy of HPotter
// @param  length (int) --> The period. Default --> 13
// @returns nvi --> nvi output series

export  nvi(simple int length = 13) =>
	nvi = 0.00
	xroc = ta.roc(close, length)
	nvi := volume < volume[1] ? nz(nvi[1], 0) + xroc : nz(nvi[1], 0)
	nvi
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//nvi_= nvi(13)
//plot_nvi = plot(nvi_, 'nvi', color=color.new(color.green, 0), linewidth=1)




// On Balance Volume (OBV)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function On Balance Volume (OBV)
// @function On Balance Volume is a cumulative indicator to measure buying and selling pressure.
// @functionhttps://www.tradingview.com/wiki/On_Balance_Volume_(OBV)
// @param  na
// @returns obv --> obv output series

export  obv() =>
	var cumVol = 0.
	cumVol += nz(volume)
	if barstate.islast and cumVol == 0
		runtime.error("No volume is provided by the data vendor.")
	src = close
	obv = ta.cum(math.sign(ta.change(src)) * volume)
	obv
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//obv_= obv()
//plot_obv = plot(obv_, 'obv', color=color.new(color.green, 0), linewidth=1)




// Positive Volume Index (PVI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Positive Volume Index (PVI)
// @function The Positive Volume Index is a cumulative indicator that uses volume change in an attempt to identify where smart money is active. Used in conjunction with NVI.
// @function https://cn.tradingview.com/script/Jh6pfSDn-Positive-Volume-Index-Negative-Volume-Index/  courtesy of cheatcountry
// @param  length (int) --> The period. Default --> 13
// @returns pvi --> pvi output series

export  pvi(simple int length = 13) =>
	pvi = 0.00
	xroc = ta.roc(close, length)
	pvi := volume > volume[1] ? nz(pvi[1], 0) + xroc : nz(pvi[1], 0)
	pvi
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//pvi_= pvi(13)
//plot_pvi = plot(pvi_, 'pvi', color=color.new(color.green, 0), linewidth=1)


// Dual Volume Divergence Index (DVDI)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Dual Volume Divergence Index (DVDI)
// @function This is an experimental variation of Paul L. Dysart's Positive Volume Index and Negative Volume Index that tracks the divergences between the PVI and its EMA ,and the NVI and its EMA , then plots both together for comparison.
// @function https://cn.tradingview.com/script/p2tfpKK3-Dual-Volume-Divergence-Index-DW/    courtesy of DonovanWall
// @param price --> price series, default --> close
// @param length --> period length, default --> 255
// @param smlen --> smooth period length, default --> 1
// @returns dvdi --> dvdi output series

export  dvdi(float price, simple int length, simple int smlen) =>
    tick = syminfo.mintick
    rng = close - open
    tickrng = tick
    tickrng := math.abs(rng) < tick ? nz(tickrng[1]) : rng
    tickvol = math.abs(tickrng) / tick
    vol =  na(volume) ? tickvol : volume
    var PVI = 0.0
    PVI := vol > nz(vol[1]) ? PVI + price - nz(price[1]) : PVI
    psig = ta.ema(PVI, length)
    pdiv = ta.ema(PVI - psig, smlen)
    var NVI = 0.0
    NVI := vol < nz(vol[1]) ? NVI - (price - nz(price[1])) : NVI
    nsig = ta.ema(NVI, length)
    ndiv = ta.ema(NVI - nsig, smlen)
    dvdi = pdiv - ndiv
    [pdiv, ndiv, dvdi]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//[pdiv, ndiv, dvdi] = dvdi(close, 255, 1)
//plot_dvdi = plot(dvdi, 'dvdi', color=color.new(color.green, 0), linewidth=1)
//plot_pdiv = plot(pdiv, 'pdiv', color=color.new(color.red, 0), linewidth=1)
//plot_ndiv = plot(ndiv, 'ndiv', color=color.new(color.yellow, 0), linewidth=1)



// Dynamic rolling highest values
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Dynamic rolling highest values
// @function Dynamic rolling highest values
// @param  values --> source series
// @param length --> period length
// @returns xhh out series --> xhh output series

export  xhh( float values, int length) =>
    h_val = float(na)
    if length >= 1
        for i = 0 to length - 1 by 1
            if na(h_val) or not na(values[i]) and values[i] > h_val
                h_val := values[i]
                h_val
    h_val
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//out= xhh(high, 13)
//plot_xhh = plot(out, 'xhh', color=color.new(color.green, 0), linewidth=1)




// Price-Volume Trend (PVT)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Price-Volume Trend (PVT)
// @function The Price-Volume Trend utilizes the Rate of Change with volume to and it's cumulative values to determine money flow.
// @function https://www.tradingview.com/wiki/Price_Volume_Trend_(PVT)
// @param  na
// @returns pvt --> pvt output series

export  pvt() =>
	var cumVol = 0.
	cumVol += nz(volume)
	if barstate.islast and cumVol == 0
		runtime.error("No volume is provided by the data vendor.")
	src = close
	pvt = ta.cum(ta.change(src)/src[1]*volume)
	pvt
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
//pvt_= pvt()
//plot_pvt = plot(pvt_, 'pvt', color=color.new(color.green, 0), linewidth=1)



// Intraday R-Breaker
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Intraday R-Breaker
// @function The R-Breaker strategy is a short-term intraday trading strategy that combines trend and reversal trading methods.
// @function https://www.tradingview.com/script/fYqAT2ys-blackcat-L2-Intraday-R-Breaker-Indicator/
// @param  high --> high series
// @param  low  --> low series
// @param  close --> close series
// @param  preclose --> preclose series
// @returns rbreaker --> rbreaker output series

export  rbreaker(float high, float low, float close, float preclose) =>
	nn = ta.barssince(dayofmonth!= xrf(dayofmonth,1))+1
	hh = xrf(xhh(high,nn),nn)
	ll = xrf(xll(low,nn),nn)
	pivot = (hh+ll+preclose)/3
	reverse_sell_price = 2*pivot-ll //pivot points,reverse selling prices: senter
	observe_sell_price = pivot+(hh-ll) //observe selling price: ssetup
	break_bid_price = hh+2*(pivot-ll) //breakthrough bid price: bbreak1
	reversal_bid_price = 2*pivot-hh  //reversal bid price: bbreak2
	observe_buy_price = pivot-(hh-ll)  //observe buy price: bsetup
	break_sell_price = ll-2*(hh-pivot) //break sell price: sbreak
	senter = close > reverse_sell_price
	ssetup = ta.crossunder(close, observe_sell_price)
	sbreak = ta.crossunder(close,break_sell_price)
	
	rsc = ssetup and senter  // reverse sell condition
	bsc = sbreak  // breakthrough sell condition
	
	
	bsetup = ta.crossover(close, observe_buy_price)
	bbreak2 = close<reversal_bid_price
	bbreak1 = ta.crossover(close,break_bid_price)
	
	rbc = bsetup and bbreak2  // reverse buy condition
	bbc = bbreak1
	[rbc, bbc, rsc, bsc]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [rbc, bbc, rsc, bsc]= rbreaker(high, low,close, close[1])
// plot_rbc = plot(bton(rbc), 'rbc', color=color.new(color.yellow, 0), linewidth=1)
// plot_bbc = plot(bton(bbc), 'bbc', color=color.new(color.green, 0), linewidth=1)
// plot_rsc = plot(bton(rsc), 'rsc', color=color.new(color.red, 0), linewidth=1)
// plot_bsc = plot(bton(bsc), 'bsc', color=color.new(color.fuchsia, 0), linewidth=1)


// Trend Oscillator (TO)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Trend Oscillator (TO)
// @function Trend Oscillator (TO) used in my L3 Whale Sniper
// @function https://www.tradingview.com/script/DLSz2MvE-blackcat-L3-Whale-Sniper/
// @param length --> period, defalt --> 27
// @returns tosc --> to output series

export tosc(simple int length) =>
    tosc = 3 * xsa((close - ta.lowest(low, length)) / (ta.highest(high, length) - ta.lowest(low, length)) * 100, 5, 1) - 2 * xsa(xsa((close - ta.lowest(low, length)) / (ta.highest(high, length) - ta.lowest(low, length)) * 100, 5, 1), 3, 1)
    tosc


// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// to_ = tosc(5)
// plot_to = plot(to_, 'tosc', color=to_>to_[1] ? color.new(color.yellow, 0) : color.new(color.fuchsia,0), linewidth=2)





// Chandelier Exit (CE)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Chandelier Exit (CE)
// @function This is a redesign of the Chandelier Exit indicator by everget. It removes stupid transitions between Chandelier Exit' states and highlights initial points for both lines. This indicator was originally developed by Charles Le Beau and popularized by Dr . Alexander Elder in his book "Come Into My Trading Room: A Complete Guide to Trading" (2002). In short, this is a trailing stop-loss based on the Average True Range (ATR).
// @function https://cn.tradingview.com/script/AqXxNS7j-Chandelier-Exit/  by everget
// @param length --> period, defalt --> 22
// @param  mult --> multiplier, defalt --> 3.0
// @returns ce --> ce output series

export ce(simple int length, simple float mult, bool useClose = true) =>
	atr = mult * ta.atr(length)
	
	longStop = (useClose ? ta.highest(close, length) : ta.highest(length)) - atr
	longStopPrev = nz(longStop[1], longStop)
	longStop := nz(close[1]) > longStopPrev ? math.max(longStop, longStopPrev) : longStop
	
	shortStop = (useClose ? ta.lowest(close, length) : ta.lowest(length)) + atr
	shortStopPrev = nz(shortStop[1], shortStop)
	shortStop := nz(close[1]) < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop
	
	var int dir = 1
	dir := close > shortStopPrev ? 1 : close < longStopPrev ? -1 : dir
	buySignal = dir == 1 and dir[1] == -1
	sellSignal = dir == -1 and dir[1] == 1
	trend = dir==1 ? longStop : shortStop
	[trend, longStop, shortStop, dir, buySignal, sellSignal]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
// [trend, longStop, shortStop, dir, buySignal, sellSignal] = ce(22,1.5, true)
// plot_ce = plot(trend, 'ce', color=dir==1 ? color.new(color.yellow, 0) : color.new(color.fuchsia,0), linewidth=2)



// Noldo Chandelier Exit (NCE)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// @function Noldo Chandelier Exit (NCE)
// @function This is a redesign of the Chandelier Exit indicator by everget. It removes stupid transitions between Chandelier Exit' states and highlights initial points for both lines. This indicator was originally developed by Charles Le Beau and popularized by Dr . Alexander Elder in his book "Come Into My Trading Room: A Complete Guide to Trading" (2002). In short, this is a trailing stop-loss based on the Average True Range (ATR).
// @function https://cn.tradingview.com/script/z9bPYhxa-Market-Adaptive-Stop-Loss/  by Noldo, courtesy of everget and Noldo
// @param length --> period, defalt --> 22
// @param  mult --> multiplier, defalt --> 3.0
// @returns nce --> nce output series

f_ema(_src, _length) =>
    _length_adjusted = _length < 1 ? 1 : _length
    _multiplier = 2 / (_length_adjusted + 1)
    _return = 0.00
    _return := na(_return[1]) ? _src : (_src - _return[1]) * _multiplier + _return[1]
    _return

f_atr(_length) =>
    _length_adjusted = _length < 1 ? 1 : _length
    float _output = na
    _tr = math.max(high - low, math.max(high - close[1], close[1] - low))
    _output := f_ema(_tr, _length_adjusted)
    _output

export nce(simple int length, simple float mult) =>
	atr = mult * f_atr(length)
	
	longStop = ta.highest(close, length) - atr
	longStopPrev = nz(longStop[1], longStop)
	longStop := close[1] > longStopPrev ? math.max(longStop, longStopPrev) : longStop
	
	
	shortStop = ta.lowest(close, length) + atr
	shortStopPrev = nz(shortStop[1], shortStop)
	shortStop := close[1] < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop
	
	var int dir = 1
	dir := close > shortStopPrev ? 1 : close < longStopPrev ? -1 : dir
	buySignal = dir == 1 and dir[1] == -1
	sellSignal = dir == -1 and dir[1] == 1
	trend = dir==1 ? longStop : shortStop
	[trend, longStop, shortStop, dir, buySignal, sellSignal]
// Function Test Script below
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	
[trend, longStop, shortStop, dir, buySignal, sellSignal] = nce(22,1.5)
plot_ce = plot(trend, 'ce', color=dir==1 ? color.new(color.yellow, 0) : color.new(color.fuchsia,0), linewidth=2)