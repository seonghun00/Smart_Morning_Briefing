//  [ Google Spread Sheet → 확장 프로그램 → Apps Script ]  //

//  [ Apps Script에 코드 저장 이후, 트리거 설정 필요 ] //
( 에디터 왼쪽 메뉴 트리거 → 실행할 함수:morningRoutineFinal → 이벤트 소스: 시간 기반
 → 트리거 유형: 일 단위 타이머 → 시간 선택: 오전 12시 ~ 1시 )

/**
 * 스마트 아침 브리핑 시스템
 * 기능: 뉴스 수집 + 금융 지표 계산 + 구글 캘린더 등록
 */

function morningRoutineFinal() {
  const SHEET_ID = "10aW7SRntEYaFqiUQKzzKbTWN337_cFNybxRg5vc8w8s"; // 사용자 시트 ID
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheets()[0];
  const TODAY_DATE = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd");
  
  try {
    sheet.clear(); // 1. 시트 초기화

    // 2. 뉴스 데이터 수집 (인베스팅닷컴 RSS)
    const RSS_URL = 'https://kr.investing.com/rss/news_285.rss';
    const response = UrlFetchApp.fetch(RSS_URL);
    const xml = response.getContentText();
    const document = XmlService.parse(xml);
    const newsItems = document.getRootElement().getChild('channel').getChildren('item').slice(0, 3);
    
    // 뉴스 제목 조립 (구글 홈이 읽기 좋게 "N번 뉴스, 제목" 형식으로 생성)
    let newsArray = newsItems.map((item, index) => `${index + 1}번 뉴스, ${item.getChildText('title')}`);
    const combinedNews = "오늘의 주요 뉴스입니다. " + newsArray.join(". ") + ". ";

    // 3. 시장 지표 수식 조립 (구글 파이낸스 활용)
    const financeFormula = `= "이어서 오늘 시장 지표입니다. " & 
      IFERROR("나스닥은 " & FIXED(ABS((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))/GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")), "#,##0") & "포인트이고, ", "나스닥 확인 불가, ") & 
      IFERROR("코스피는 " & FIXED(ABS((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))/GOOGLEFINANCE("KRX:KOSPI", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("KRX:KOSPI", "price")), "#,##0") & "포인트입니다.", "코스피 확인 불가입니다.")`;

    // 4. 시트에 데이터 기록
    sheet.getRange("A1").setValue(TODAY_DATE);
    sheet.getRange("B1").setValue(newsArray[0]);
    sheet.getRange("B2").setValue(newsArray[1]);
    sheet.getRange("B3").setValue(newsArray[2]);
    sheet.getRange("B4").setFormula(financeFormula);
    
    // 수식이 계산되어 텍스트로 변환될 때까지 강제 동기화 및 대기
    SpreadsheetApp.flush();
    Utilities.sleep(5000); // 5초 대기 (데이터 로딩 시간 확보)

    // 5. 전체 브리핑 문장 생성
    const marketInfo = sheet.getRange("B4").getValue();
    const finalBriefing = combinedNews + marketInfo + " 오늘도 좋은 하루 되세요!";

    // 6. 구글 캘린더 등록 (중복 방지 로직 포함)
    const calendar = CalendarApp.getDefaultCalendar();
    const now = new Date();

    const events = calendar.getEventsForDay(now);
    events.forEach(event => {
      if (event.getTitle().includes("안녕하세요")) {
        event.deleteEvent();
      }
    });

    // 종일 일정으로 등록 (구글 홈 루틴이 '오늘 일정 알려줘' 할 때 읽어줌)
    calendar.createAllDayEvent(finalBriefing, now);

    sheet.autoResizeColumns(1, 2);
    Logger.log("✅ [성공] 기본 브리핑 등록 완료!");

  } catch (e) {
    Logger.log("❌ [오류] " + e.toString());
  }
}
