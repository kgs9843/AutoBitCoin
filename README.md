#  자동 투자 매매 봇 📈

## 📚 프로젝트 설명

**바이비트(Bybit) API**를 활용하여 자동으로 암호화폐 투자를 실행하는 파이썬 기반 봇입니다. **AWS EC2** 서버에서 **Crontab**을 이용해 주기적으로 매매 로직을 실행하며, 투자 결과는 **Matplotlib**을 사용하여 시각화하고, **디스코드(Discord) 웹훅(Webhook)**을 통해 실시간 알림을 제공합니다.

## ✨ 주요 기능

* **자동 매매**: 바이비트 API를 연동하여 지정된 전략에 따라 자동으로 주문을 실행합니다.
* **데이터 시각화**: `Matplotlib` 라이브러리를 사용하여 투자 현황 및 수익률 등의 데이터를 그래프로 시각화합니다.
* **주기적 실행**: AWS EC2 인스턴스에서 `Crontab`을 설정하여 2시간마다 자동으로 매매 프로그램을 실행합니다.
* **실시간 알림**: 디스코드 웹훅을 통해 매매 체결, 오류 발생 등 주요 이벤트에 대한 알림을 실시간으로 받습니다.

## 🛠️ 사용 기술

* **프로그래밍 언어**: `Python`
* **API**: Bybit API
* **데이터 시각화**: `Matplotlib`
* **서버**: AWS EC2
* **자동 실행**: `Crontab`
* **알림**: Discord Webhook
* **라이브러리 관리**: `requirements.txt` (가상환경)

## ⚙️ 설치 및 실행 방법 (EC2 기준)

1.  **프로젝트 클론**:
    EC2 인스턴스에 접속하여 아래 명령어로 프로젝트를 클론합니다.
    ```bash
    git clone [https://github.com/kgs9843/AutoBitCoin.git](https://github.com/kgs9843/AutoBitCoin.git)
    cd bybit
    ```

2.  **가상환경 설정 및 라이브러리 설치**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
    * ℹ️ `requirements.txt` 파일에는 `bybit-api`, `matplotlib`, `requests` (디스코드 웹훅용) 등의 라이브러리가 포함되어 있어야 합니다.

3.  **Crontab 설정**:
    2시간마다 `autoInvestment.py` 파일을 가상환경에서 실행하도록 `Crontab`을 설정합니다.

    * Crontab 편집기 열기:
        ```bash
        crontab -e
        ```
    * 아래 내용 추가 (파일 경로는 실제 환경에 맞게 수정):
        ```cron
        0 */2 * * * /home/ubuntu/bybit/venv/bin/python /home/ubuntu/bybit/autoInvestment.py
        ```
        * ⏰ 위 설정은 매 2시간 정각에 스크립트를 실행합니다. (예: 00:00, 02:00, 04:00 ...)
        * ⚠️ `/home/ubuntu/` 부분은 EC2 인스턴스의 사용자 홈 디렉토리에 따라 다를 수 있습니다. `pwd` 명령어로 현재 경로를 확인하여 정확한 경로를 입력해주세요.

4.  **API 키 및 웹훅 설정**:
    `autoInvestment.py` 또는 별도의 설정 파일(`.env` 등)에 바이비트 API 키, API 시크릿, 디스코드 웹훅 URL을 입력합니다.
    * 🔒 **주의**: 민감 정보이므로 Git 저장소에 직접 올리지 않도록 주의하세요.

## 🚀 사용법

`Crontab` 설정을 완료하면 지정된 시간에 자동으로 `autoInvestment.py` 스크립트가 실행되어 매매 로직을 수행하고, 결과를 디스코드로 전송합니다. 생성된 그래프는 필요에 따라 EC2 서버 내 지정된 경로에 저장되거나, 다른 방식으로 접근할 수 있도록 설정할 수 있습니다.

---
