# EDCAN Language

<del>SSF 시작 6일 전, 흥분한 한 중학생의 뻘짓 중의 뻘짓</del>

<a href="https://github.com/rycont/umjunsik-lang">엄랭</a>을 기반으로 제작한 선린인터넷고등학교 전공동아리 EDCAN 언어입니다.

웹 EDCAN 언어 처리기 : <a href="https://edcan-lang.netlify.app/">https://edcan-lang.netlify.app/</a>

키워드로는 '에', '드', '캔', '아', '틀', '리', '어 <del>(사실 에였는데 에드캔의 '에'랑 겹쳐서...)</del>', '픽', '셀'이 있습니다.

## 문법

모든 프로그램은 '선린인터넷고등학교 모바일 컨텐츠 개발 동아리'로 시작하며, 'EDCAN'으로 끝나야 합니다.

#### 자료형

증감, 곱하기  
틀 : 1 추가  
리 : 1 감소  
어 : 곱하기

```
틀 => 1
틀틀 => 2
리 => -1
리리 => -2
틀틀어틀틀 => 4
```

#### 변수

변수 선언
에 : 변수 선언
아 : 몇 번째 변수인지 나타냄

```
에틀 => 첫 번째 변수에 1을 대입하여 선언
아에 => 두 번째 변수 선언 (기본값 : 0)
아아에리리 => 세 번째 변수에 -2를 대입하여 선언
```

변수 사용
'아'의 개수번째 변수를 볼러옴

```
아 => 첫 번째 변수
아아 => 두 번째 변수
아아아 => 세 번째 변수
```

#### 입출력

드? : 정수 입력  
드! : 정수 출력
드ㅋ : 문자 출력

```
에드? => 콘솔을 입력받아 첫 번째 변수에 대입
드틀틀틀! => 콘솔에 3 출력
드틀틀틀틀틀어틀틀틀틀틀틀틀틀틀틀틀틀틀ㅋ => 콘솔에 A 출력
```

<del>그리고 '캔'이랑 '픽' 키워드는 개발자도 코드 이해를 못해서 설명 안 쓰겠습니다.  
대충 캔{정수}?{실행할 명령} 지시문 / 픽 픽 뒤에 오는 정수번째 줄로 이동 입니다.</del>

#### 기타

셀! : '셀!' 뒤에 오는 정수를 반환하며 프로그램 종료

## 역사

2022.08.21 개발
