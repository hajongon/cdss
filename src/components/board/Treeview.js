import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import communityMaps from 'routes/communityMaps'
import { deleteTree } from './apis/page'
import { Menu, Item, Separator, useContextMenu } from 'react-contexify'
import 'react-contexify/ReactContexify.css'

const MENU_ID = 'blahblah'

const TreeviewListItem = ({
  item,
  openedItems,
  setOpenedItems,
  selectedItems,
  setSelectedItems,
  selection,
  handleItemClick,
  selectedItem,
  handleAddData,
  setData,
  setSelectedItem
}) => {
  const [open, setOpen] = useState(openedItems.indexOf(item.id) !== -1)
  const [children, setChildren] = useState([])
  const [firstChildren, setFirstChildren] = useState([])
  const [childrenOpen, setChildrenOpen] = useState(false)
  const checkRef = useRef()
  const { fetchComNavData } = communityMaps()

  const { show } = useContextMenu({
    id: MENU_ID
  })


  function handleContextMenu(event) {
    handleItemClick(item)
    show({
      event,
      props: {
        key: 'value'
      }
    })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleMenuClick = ({ id }) => {
    switch (id) {
      case 'add':
        handleAddData()
        break
      case 'delete':
        handleDeleteData()
        break
      //etc...
    }
  }

  const handleDeleteData = () => {
    const deleteConfirmed = confirm(
      item.id && !item.id.startsWith('temp_')
        ? '삭제 시 게시판 내 게시물이 삭제됩니다. 계속 진행하시겠습니까?'
        : '삭제 시 작성한 내용이 사라집니다. 계속 진행하시겠습니까?'
    )

    if (deleteConfirmed) {
      if (item.id && !item.id.startsWith('temp_')) {
        deleteTreeview()
      }
      setData(prevData => {
        const setArray = prevData.filter(obj => obj.id !== item.id)

        // 삭제 후 첫 번째 아이템을 선택합니다.
        setSelectedItem(setArray.length > 0 ? setArray[0] : null)

        return setArray
      })
    }
  }

  const deleteTreeview = async () => {
    const deleteTreeData = await deleteTree(item.id)

    if (deleteTreeData.status === 'success') {
      fetchComNavData()
    } else {
      console.log(deleteTreeData.error)
    }
  }

  const getChildrens = item => {
    function flatInnter(item) {
      let flat = []
      item.map(child => {
        if (child.children) {
          flat = [...flat, child.id, ...flatInnter(child.children)]
        } else {
          flat = [...flat, child.id]
        }
      })

      return flat
    }
    if (item.children) {
      return flatInnter(item.children)
    } else {
      return []
    }
  }

  const isChildrenOpen = () => {
    return openedItems.some(item => firstChildren.indexOf(item) !== -1)
  }

  const handleOnExiting = () => {
    setOpenedItems(openedItems.filter(openedItem => openedItem !== item.id))
  }
  const handleEntering = () => {
    setOpenedItems([...openedItems, item.id])
  }

  useEffect(() => {
    setChildren(getChildrens(item))
    if (item.children) {
      setFirstChildren(item.children.map(child => child.id))
    }
  }, [])

  useEffect(() => {
    setChildrenOpen(isChildrenOpen())
  }, [children, openedItems])

  useEffect(() => {
    const childrenSelected = selectedItems.some(
      selectedItem => children.indexOf(selectedItem) !== -1
    )
    const allChildrenSelected = children.every(
      child => selectedItems.indexOf(child) !== -1
    )
    if (childrenSelected && checkRef.current) {
      checkRef.current.indeterminate = true
    }
    if (!childrenSelected && checkRef.current) {
      checkRef.current.indeterminate = false
    }
    if (allChildrenSelected && checkRef.current) {
      checkRef.current.indeterminate = false
      checkRef.current.checked = true
    }
    if (!allChildrenSelected && checkRef.current) {
      checkRef.current.checked = false
    }
  }, [selectedItems, checkRef.current])

  return (
    <li className="treeview-list-item" style={{ position: 'relative' }}>
      {Object.prototype.hasOwnProperty.call(item, 'children') ? (
        <>
          <div className="toggle-container">
            <a
              className={classNames('collapse-toggle', {
                collapsed: open || item.expanded
              })}
              href="#!"
              onClick={() => setOpen(!open)}
            >
              <p
                className={classNames('treeview-text', { 'ms-2': !selection })}
              >
                {item.name}
              </p>
            </a>
          </div>
          <Collapse
            in={open}
            onExiting={handleOnExiting}
            onEntering={handleEntering}
          >
            <ul
              className={classNames('treeview-list', {
                'collapse-hidden': !open,
                'collapse-show treeview-border': open,
                'treeview-border-transparent': childrenOpen
              })}
            >
              {item.children.map((nestedItem, index) => (
                <TreeviewListItem
                  key={index}
                  index={String(index)}
                  item={nestedItem}
                  openedItems={openedItems}
                  setOpenedItems={setOpenedItems}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  selection={selection}
                  handleItemClick={handleItemClick}
                  selectedItem={selectedItem}
                  handleAddData={handleAddData}
                  setData={setData}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </ul>
          </Collapse>
        </>
      ) : (
        <div className="treeview-item">
          <button
            type="button"
            className="border-0 bg-transparent"
            onClick={() => handleItemClick(item)}
            onContextMenu={handleContextMenu}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={classNames('me-2', item.iconClass)}
            />
            {item?.name || '이름을 변경하세요'}
          </button>
          <Menu id={MENU_ID}>
            <Item id="add" onClick={handleMenuClick}>
              추가
            </Item>
            <Separator />
            <Item id="delete" onClick={handleMenuClick}>
              삭제
            </Item>
          </Menu>
        </div>
      )}
    </li>
  )
}

const Treeview = ({
  data,
  selection,
  expanded = [],
  selectedItems = [],
  setSelectedItems,
  handleItemClick,
  setSelectedItem,
  selectedItem,
  setData
}) => {
  const [openedItems, setOpenedItems] = useState(expanded)

  const generateTempId = () => {
    // 임시 아이디를 간단히 생성하는 함수 (예: 일련번호 + 타임스탬프)
    return `temp_${Date.now()}`
  }

  const handleAddData = () => {
    const tempId = generateTempId()

    const newData = {
      icon: 'file',
      id: tempId,
      name: '',
      usecomment: true,
      rud: 6
    }

    setData(prevData => [...prevData, newData])

    setSelectedItem(newData)
  }

  return (
    <ul className="treeview treeview-select">
      {data.map((treeviewItem, index) => (
        <TreeviewListItem
          key={index}
          item={treeviewItem}
          openedItems={openedItems}
          setOpenedItems={setOpenedItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selection={selection}
          handleItemClick={handleItemClick}
          selectedItem={selectedItem}
          handleAddData={handleAddData}
          setData={setData}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </ul>
  )
}

TreeviewListItem.propTypes = {
  item: PropTypes.object,
  openedItems: PropTypes.array,
  setOpenedItems: PropTypes.func,
  selectedItems: PropTypes.array,
  setSelectedItems: PropTypes.func,
  selection: PropTypes.bool,
  handleItemClick: PropTypes.func,
  selectedItem: PropTypes.object,
  handleAddData: PropTypes.func,
  setData: PropTypes.func,
  setSelectedItem: PropTypes.func
}

Treeview.propTypes = {
  data: PropTypes.array,
  selection: PropTypes.bool, // If true selection is enabled.
  expanded: PropTypes.array, // Default expanded children ids.
  selectedItems: PropTypes.array, // Selected item ids..
  setSelectedItems: PropTypes.func, // Setter to select items
  handleItemClick: PropTypes.func,
  setTree: PropTypes.func,
  setSelectedItem: PropTypes.func,
  selectedItem: PropTypes.object,
  setData: PropTypes.func
}

export default Treeview
