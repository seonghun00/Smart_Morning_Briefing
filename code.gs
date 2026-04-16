// Google Spread Sheet → 확장 프로그램 → Apps Script 에서 사용.

function morningRoutineFinal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const TODAY_DATE = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd");
  
  try {
    sheet.clear(); 

    // 1. 뉴스 데이터 수집
    const RSS_URL = 'https://kr.investing.com/rss/news_285.rss';
    const response = UrlFetchApp.fetch(RSS_URL);
    const xml = response.getContentText();
    const document = XmlService.parse(xml);
    const newsItems = document.getRootElement().getChild('channel').getChildren('item').slice(0, 3);
    
    let newsArray = newsItems.map((item, index) => `${index + 1}번 뉴스, ${item.getChildText('title')}`);
    const combinedNews = newsArray.join(". ") + ". ";

    // 2. 시장 지표 수식 조립
    const financeFormula = `= "이어서 오늘 시장 지표입니다. " & 
      IFERROR("나스닥은 " & FIXED(ABS((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))/GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")), "#,##0") & "포인트이고, ", "나스닥 확인 불가, ") & 
      IFERROR("코스피는 " & FIXED(ABS((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))/GOOGLEFINANCE("KRX:KOSPI", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("KRX:KOSPI", "price")), "#,##0") & "포인트입니다.", "코스피 확인 불가입니다.")`;

    // 3. 메인 시트에 기록
    sheet.getRange("A1").setValue(TODAY_DATE);
    sheet.getRange("B1").setValue(newsArray[0]);
    sheet.getRange("B2").setValue(newsArray[1]);
    sheet.getRange("B3").setValue(newsArray[2]);
    sheet.getRange("B4").setFormula(financeFormula);
    
    SpreadsheetApp.flush();
    Utilities.sleep(2000);

    // 4. 전체 브리핑 문장 생성
    const marketInfo = sheet.getRange("B4").getValue();
    const finalBriefing = "오늘의 브리핑입니다. " + combinedNews + marketInfo + " 오늘도 좋은 하루 되세요!";

    // 5. 캘린더 등록 (종일 일정으로 변경)
    const calendar = CalendarApp.getDefaultCalendar();
    const now = new Date();

    // 중복 방지: 오늘 날짜의 '모든 종일 일정' 중 브리핑 내용이 포함된 것 삭제
    const events = calendar.getEventsForDay(now);
    events.forEach(event => {
      if (event.isAllDayEvent() && event.getTitle().includes("오늘의 브리핑입니다")) {
        event.deleteEvent();
      }
    });

    // 새 종일 일정 생성
    calendar.createAllDayEvent(finalBriefing, now);

    sheet.autoResizeColumn(1);
    sheet.autoResizeColumn(2);
    Logger.log("✅ 종일 일정으로 브리핑 등록 완료!");

  } catch (e) {
    Logger.log("❌ 오류 발생: " + e.toString());
  }
}
