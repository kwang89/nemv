# nvme
node express mongo vue

## config 파일 세팅 방법

**config/index.js**  
    ```javascript
    module.exports = {
      dbUrl: 'mongodb://localhost:27017/nemv',
      admin: {
        id: 'admin',
        pwd: '1234',
        name: '관리자'
      },
      jwt: {
        secretKey: 'abcdefg',
        issuer: 'xxx.com',
        subject: 'user-token',
        algorithm: 'HS256',
        expiresIn: 60 * 3, // 기본 3분
        expiresInRemember: 60 * 60 * 24 * 7, // 기억하기 눌렀을 때 7일
        expiresInDiv: 3 // 토크시간 나누는 기준

      }
    }
    ```  
이런식으로 디비 연결 문자열을 작성해야 웹서버가 정상 구동됨.
