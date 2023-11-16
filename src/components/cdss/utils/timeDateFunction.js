export const formatDate = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  date.setTime(date.getTime()) // 9시간을 추가
  return date.toLocaleDateString('ko-KR', options).replace(/\./g, '. ')
}

export const formatDateForPatientInfo = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  date.setTime(date.getTime()) // 9시간을 추가

  let formattedDate = date.toLocaleDateString('ko-KR', options)
  formattedDate = formattedDate.replace(/\./g, '').replace(/ /g, '-') // 점을 제거하고 공백을 하이픈으로 교체

  return formattedDate
}

// 데이터를 시간순으로 정렬하는 함수
export function sortByTimestamp(data) {
  return data.sort((a, b) => {
    const timestampA = new Date(a.orddate).getTime()
    const timestampB = new Date(b.orddate).getTime()

    // 내림차순 정렬을 원한다면 b와 a를 바꾸세요.
    return timestampB - timestampA
  })
}
