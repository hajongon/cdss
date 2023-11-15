export function transformData(inputData) {
  const transformedData = {
    name: '환자 전체 처방 목록',
    children: []
  }

  const newData = []

  // Iterate through the fetchedData array
  for (const item of inputData) {
    // Create a new object with the desired structure
    let drugTyp = ''

    if (item.ordnameTyp1) {
      drugTyp = '내복약'
    } else {
      drugTyp = '주사약'
    }

    const newItem = {
      ptSbstNo: item.ptSbstNo,
      ordcode: item.ordcode,
      drugTyp,
      ordname: item.ordnameTyp1 || item.ordnameTyp2, // Use ordnameTyp1 if it exists, otherwise use ordnameTyp2
      count: item.count
    }
    // Push the transformedItem to the transformedData array
    newData.push(newItem)
  }

  const medicationCategories = {}

  for (const item of newData) {
    const { drugTyp, ordname, count } = item

    if (!medicationCategories[drugTyp]) {
      // If the medication category doesn't exist, create it
      medicationCategories[drugTyp] = {
        name: drugTyp,
        children: []
      }
    }

    // Add the medication item to its corresponding category
    medicationCategories[drugTyp].children.push({
      category: drugTyp,
      name: ordname,
      value: count
    })
  }

  // Convert the medication categories object to an array
  transformedData.children = Object.values(medicationCategories)

  return transformedData
}

export function transformArrayToCounts(arr) {
  const result = {}

  arr.forEach(item => {
    const ordname = item.ordnameTyp1 || item.ordnameTyp2
    const count = item.count

    if (result[ordname]) {
      result[ordname] += count
    } else {
      result[ordname] = count
    }
  })

  return result
}

export const groupByMicname = data => {
  return data.reduce((acc, item) => {
    // Group initialization
    if (!acc[item.micname]) {
      acc[item.micname] = []
    }

    // Grouping
    acc[item.micname].push(item)
    return acc
  }, {})
}

export function splitByAdmDate(data, admtime) {
  // 입력 날짜를 Date 객체로 변환하고 시간 부분 초기화
  const targetDate = new Date(admtime)
  targetDate.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정

  // 결과를 저장할 배열 초기화
  let beforeAdmData = []
  let afterAdmData = []

  // 배열의 각 요소에 대해 반복
  data.forEach(item => {
    // 객체의 spcdate를 Date 객체로 변환하고 시간 부분 초기화
    const spcDate = new Date(item.spcdate)
    spcDate.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정

    // 날짜 비교 후 적절한 배열에 추가
    // 같은 날짜인 경우 afterAdmData 배열에 추가
    if (spcDate < targetDate) {
      beforeAdmData.push(item)
    } else {
      afterAdmData.push(item)
    }
  })

  return { beforeAdmData, afterAdmData }
}
