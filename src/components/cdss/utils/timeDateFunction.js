export const formatDate = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  let formattedDate = date
    .toLocaleDateString('ko-KR', options)
    .replace(/\./g, '. ')

  console.log(formattedDate)
  return formattedDate.slice(0, -2) // 마지막 점과 공백을 제거
}

export const formatDateForPatientInfo = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  date.setTime(date.getTime())

  let formattedDate = date.toLocaleDateString('ko-KR', options)
  formattedDate = formattedDate.replace(/\./g, '').replace(/ /g, '-') // 점을 제거하고 공백을 하이픈으로 교체 -- jsha

  return formattedDate
}

// 데이터를 시간순으로 정렬하는 함수 -- jsha
export function sortByTimestamp(data) {
  return data.sort((a, b) => {
    const timestampA = new Date(a.orddate).getTime()
    const timestampB = new Date(b.orddate).getTime()

    // 내림차순 정렬을 원한다면 b와 a를 바꾸세요. -- jsha
    return timestampB - timestampA
  })
}
