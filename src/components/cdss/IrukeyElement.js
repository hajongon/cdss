import React, { useEffect } from 'react'

const IrukeyElement = () => {
  useEffect(() => {
    alert(
      '새 창이 열립니다. 팝업이 차단되었을 경우 브라우저 설정에서 팝업을 허용해주세요.'
    )
    window.open(
      'http://otid-irukey.kr:9080/rma',
      '',
      `width=${width}, height=${height}, left=${left}, top=${top}, location=no, status=no, toolbar=no, scrollbars=no`
    )
    const width = window.innerWidth / 2 // 현재 창의 가로 크기의 1/2
    const height = window.innerHeight / 2 // 현재 창의 세로 크기의 1/2
    const left = window.innerWidth / 4 // 화면 가로 중앙에 위치
    const top = window.innerHeight / 4 // 화면 세로 중앙에 위치
  }, [])
  return <div>팝업이 차단된 경우, 새 창이 열리지 않을 수 있습니다.</div>
}

export default IrukeyElement
