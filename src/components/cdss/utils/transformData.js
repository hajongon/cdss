export function transformData(inputData) {
  const transformedData = {
    name: '환자 전체 처방 목록',
    children: []
  }

  const newData = []

  // Iterate through the fetchedData array -- jsha
  for (const item of inputData) {
    // Create a new object with the desired structure -- jsha
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
      ordname: item.ordnameTyp1 || item.ordnameTyp2, // Use ordnameTyp1 if it exists, otherwise use ordnameTyp2 -- jsha
      count: item.count
    }
    // Push the transformedItem to the transformedData array -- jsha
    newData.push(newItem)
  }

  const medicationCategories = {}

  for (const item of newData) {
    const { drugTyp, ordname, count } = item

    if (!medicationCategories[drugTyp]) {
      // If the medication category doesn't exist, create it -- jsha
      medicationCategories[drugTyp] = {
        name: drugTyp,
        children: []
      }
    }

    // Add the medication item to its corresponding category -- jsha
    medicationCategories[drugTyp].children.push({
      category: drugTyp,
      name: ordname,
      value: count
    })
  }

  // Convert the medication categories object to an array -- jsha
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
    // Group initialization -- jsha
    if (!acc[item.micname]) {
      acc[item.micname] = []
    }

    // Grouping -- jsha
    acc[item.micname].push(item)
    return acc
  }, {})
}

export function splitByAdmDate(data, admtime) {
  // 입력 날짜를 Date 객체로 변환하고 시간 부분 초기화 -- jsha
  const targetDate = new Date(admtime)
  targetDate.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정 -- jsha

  // 결과를 저장할 배열 초기화 -- jsha
  let beforeAdmData = []
  let afterAdmData = []

  // 배열의 각 요소에 대해 반복 -- jsha
  data.forEach(item => {
    // 객체의 spcdate를 Date 객체로 변환하고 시간 부분 초기화 -- jsha
    const spcDate = new Date(item.spcdate)
    spcDate.setHours(0, 0, 0, 0) // 시간을 00:00:00으로 설정 -- jsha

    // 날짜 비교 후 적절한 배열에 추가 -- jsha
    // 같은 날짜인 경우 afterAdmData 배열에 추가 -- jsha
    if (spcDate < targetDate) {
      beforeAdmData.push(item)
    } else {
      afterAdmData.push(item)
    }
  })

  return { beforeAdmData, afterAdmData }
}

export const processPatientsData = data => {
  // Map to store the most recent entry for each ptSbstNo -- jsha
  const mostRecentEntries = new Map()

  data.forEach(patient => {
    const existingEntry = mostRecentEntries.get(patient.ptSbstNo)

    // If the ptSbstNo is already present, compare admtime -- jsha
    if (existingEntry) {
      if (new Date(patient.admtime) > new Date(existingEntry.admtime)) {
        // Update with the more recent admtime -- jsha
        mostRecentEntries.set(patient.ptSbstNo, patient)
      }
    } else {
      // If ptSbstNo is not present, add it to the map -- jsha
      mostRecentEntries.set(patient.ptSbstNo, patient)
    }
  })

  // Convert the Map values back to an array -- jsha
  return Array.from(mostRecentEntries.values())
}

export function splitDataByCategory(data) {
  if (!data || data.length === 0) {
    return []
  }

  let result = []

  // Iterate through the data
  for (let i = 0; i < data.length; i++) {
    // Find an existing group that matches the current item
    let existingGroupIndex = result.findIndex(
      group =>
        group.length > 0 &&
        group[0].spcname === data[i].spcname &&
        group[0].micname === data[i].micname &&
        group[0].cntfgnm === data[i].cntfgnm &&
        group[0].spcdate === data[i].spcdate
    )

    // If an existing group is found, add the current item to that group
    if (existingGroupIndex !== -1) {
      result[existingGroupIndex].push(data[i])
    } else {
      // Otherwise, create a new group with the current item
      result.push([data[i]])
    }
  }

  return result
}

export function convertDataToEChartsFormat(data) {
  return data.map(item => ({
    name: item.ordnameTyp1 || item.ordnameTyp2, // ordnameTyp1이 null이 아니면 사용하고, 그렇지 않으면 ordnameTyp2를 사용
    value: item.count
  }))
}

export function rearrangeSerumData(data) {
  // 필터링된 요소들을 하나의 배열에, 나머지 요소들을 다른 배열에 저장
  const matched = data.filter(item => item.examcode === 'C2243002')
  const others = data.filter(item => item.examcode !== 'C2243002')

  // 두 배열을 결합하여 새로운 배열 반환
  return [...matched, ...others]
}

export function rearrangePeriphData(data) {
  // 필터링된 요소들을 하나의 배열에, 나머지 요소들을 다른 배열에 저장
  const matched = data.filter(item => item.examcode === 'B1030001')
  const others = data.filter(item => item.examcode !== 'B1030001')

  // 두 배열을 결합하여 새로운 배열 반환
  return [...matched, ...others]
}
