import React, { useEffect } from 'react'

function popupCenter(href, w, h) {
  const xPos = window.innerWidth / 2 - w / 2 // 가로 가운데 정렬
  const yPos = window.innerHeight / 2 - h / 2 // 세로 가운데 정렬

  console.log(xPos, yPos)

  window.open(
    href,
    'pop_name',
    `width=${w}, height=${h}, left=${xPos}, top=${yPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
  )
}

const IrukeyElement = () => {
  useEffect(() => {
    alert(
      '새 창이 열립니다. 팝업이 차단되었을 경우 브라우저 설정에서 팝업을 허용해주세요.'
    )
    popupCenter('http://otid-irukey.kr:9080/rma', 800, 600)
  }, [])

  return <div>팝업이 차단된 경우, 새 창이 열리지 않을 수 있습니다.</div>
}

export default IrukeyElement
