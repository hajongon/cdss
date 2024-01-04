import React, { useEffect } from 'react'

const IrukeyElement = () => {
  useEffect(() => {
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
  return (
    <iframe src="http://otid-irukey.kr:9080/rma" width="100%" height="100%" />
  )
}

export default IrukeyElement
