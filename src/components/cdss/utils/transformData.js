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

export const processPatientsData = data => {
  // Map to store the most recent entry for each ptSbstNo
  const mostRecentEntries = new Map()

  data.forEach(patient => {
    const existingEntry = mostRecentEntries.get(patient.ptSbstNo)

    // If the ptSbstNo is already present, compare admtime
    if (existingEntry) {
      if (new Date(patient.admtime) > new Date(existingEntry.admtime)) {
        // Update with the more recent admtime
        mostRecentEntries.set(patient.ptSbstNo, patient)
      }
    } else {
      // If ptSbstNo is not present, add it to the map
      mostRecentEntries.set(patient.ptSbstNo, patient)
    }
  })

  // Convert the Map values back to an array
  return Array.from(mostRecentEntries.values())
}

export function splitDataByCategory(data) {
  // Check if data is empty
  if (!data || data.length === 0) {
    return []
  }

  // Initialize the result array with the first element
  let result = [[]]
  let currentArray = 0
  result[currentArray].push(data[0])

  // Iterate through the data, starting from the second element
  for (let i = 1; i < data.length; i++) {
    // Check if the current item differs in spcname, micname, or cntfgnm from the last item in the current array
    if (
      data[i].spcname !== result[currentArray][0].spcname ||
      data[i].micname !== result[currentArray][0].micname ||
      data[i].cntfgnm !== result[currentArray][0].cntfgnm ||
      data[i].spcdate !== result[currentArray][0].spcdate
    ) {
      // If it differs, create a new array
      currentArray++
      result[currentArray] = []
    }

    // Add the current item to the current array
    result[currentArray].push(data[i])
  }

  return result
}
