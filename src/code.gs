//  [ Google Spread Sheet → 확장 프로그램 → Apps Script ]  //

//  [ Apps Script에 코드 저장 이후, 트리거 설정 필요 ] //
/*  ( 에디터 왼쪽 메뉴 트리거 → 실행할 함수:morningRoutineFinal → 이벤트 소스: 시간 기반
 → 트리거 유형: 일 단위 타이머 → 시간 선택: 오전 12시 ~ 1시 ) */

/**
 * 💻 Configuration (환경 설정)
 * 시스템을 여기서 한눈에 커스터마이징하세요.
 */
const CONFIG = {
  SHEET_ID: "구글 시트 고유 ID 여기 넣으시오",                 // 구글 시트 고유 ID (~spreadsheets/d/(여기가 구글 시트 ID)/edit?~)
  RSS_URL: 'https://kr.investing.com/rss/news_285.rss',      // 투자 뉴스 RSS 주소
  NEWS_COUNT: 3,                                            // 브리핑할 뉴스 개수
  TIME_ZONE: "GMT+9",                                       // 한국 표준시 설정
  WAIT_TIME: 5000                                           // 금융 수식 로딩 대기 시간 (ms)
};

/**
 * 스마트 아침 브리핑 시스템 (TTS 최적화 최종본)
 */
function morningRoutineFinal() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheets()[0];
  const TODAY_DATE = Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, "yyyy-MM-dd");
  
  try {
    sheet.clear(); 

    // 1. 뉴스 데이터 수집
    const response = UrlFetchApp.fetch(CONFIG.RSS_URL);
    const xml = response.getContentText();
    const document = XmlService.parse(xml);
    const newsItems = document.getRootElement().getChild('channel').getChildren('item').slice(0, CONFIG.NEWS_COUNT);
    
    // 2. TTS 최적화 가공 (한자 변환 및 불필요 문구 제거)
    let newsArray = newsItems.map((item, index) => {
      let title = item.getChildText('title');
      
      title = title.replace(/\[.*?\]/g, ""); // [대괄호] 제거
      
      // 주요 한자 및 기호 변환
      title = title.replace(/•/g, "와 ")
                   .replace(/美/g, "미국")
                   .replace(/中/g, "중국")
                   .replace(/銀/g, "은")
                   .replace(/日/g, "일본")
                   .replace(/韓/g, "한국")
                   .replace(/英/g, "영국")
                   .replace(/獨/g, "독일")
                   .replace(/法/g, "프랑스");

      return `${index + 1}번 뉴스입니다. ${title.trim()}`;
    });

    const combinedNews = "오늘의 주요 뉴스 브리핑입니다. " + newsArray.join(". ") + ". ";

    // 3. 시장 지표 수식
    const financeFormula = `= "이어서 오늘 시장 지표입니다. " & 
      IFERROR("나스닥은 " & FIXED(ABS((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))/GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")-GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("INDEXNASDAQ:.IXIC", "price")), "#,##0") & "포인트이고, ", "나스닥 확인 불가, ") & 
      IFERROR("코스피는 " & FIXED(ABS((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))/GOOGLEFINANCE("KRX:KOSPI", "closeyest")*100), 1) & "퍼센트 " & IF((GOOGLEFINANCE("KRX:KOSPI", "price")-GOOGLEFINANCE("KRX:KOSPI", "closeyest"))>=0, "상승한 ", "하락한 ") & TEXT(ROUND(GOOGLEFINANCE("KRX:KOSPI", "price")), "#,##0") & "포인트입니다.", "코스피 확인 불가입니다.")`;

    sheet.getRange("A1").setValue(TODAY_DATE);
    sheet.getRange("B1").setValue(newsArray[0]);
    sheet.getRange("B2").setValue(newsArray[1]);
    sheet.getRange("B3").setValue(newsArray[2]);
    sheet.getRange("B4").setFormula(financeFormula);
    
    SpreadsheetApp.flush();
    Utilities.sleep(CONFIG.WAIT_TIME);

    // 4. 전체 브리핑 문장 생성
    const marketInfo = sheet.getRange("B4").getValue();
    const finalBriefing = combinedNews + marketInfo + " 오늘도 좋은 하루 되세요!";

    // 5. 캘린더 등록 (중복 삭제 로직)
    const calendar = CalendarApp.getDefaultCalendar();
    const now = new Date();
    const events = calendar.getEventsForDay(now);
    events.forEach(event => {
      if (event.getTitle().includes("오늘의 주요 뉴스 브리핑")) {
        event.deleteEvent();
      }
    });

    calendar.createAllDayEvent(finalBriefing, now);

    sheet.autoResizeColumns(1, 2);
    Logger.log("✅ CONFIG 설정 반영 및 브리핑 등록 완료!");

  } catch (e) {
    Logger.log("❌ 오류: " + e.toString());
  }
}
