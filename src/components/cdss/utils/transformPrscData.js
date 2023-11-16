function transformPrscData(inputData) {
  // 변환된 데이터를 저장할 배열 초기화
  const transformedData = []

  // 입력 데이터를 순회하면서 정리
  inputData.forEach(prsc => {
    const data = {
      ptSbstNo: prsc.ptSbstNo,
      meddate: prsc.meddate,
      ordname: prsc.ordnameTyp1 || prsc.ordnameTyp2 || '', // typ1 또는 typ2 값 사용, 없으면 빈 문자열
      day: prsc.day
    }

    transformedData.push(data)
  })

  return transformedData
}

export default transformPrscData
