function transformData(inputData) {
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

export default transformData
