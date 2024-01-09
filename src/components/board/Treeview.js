import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import useContextMenu from './utils/useContextMenu'
import communityMaps from 'routes/communityMaps'
import { deleteTree, getTree } from './apis/page'
import { propTypes } from 'react-bootstrap/esm/Image'

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
  setData
}) => {
  const [open, setOpen] = useState(openedItems.indexOf(item.id) !== -1)
  const [children, setChildren] = useState([])
  const [firstChildren, setFirstChildren] = useState([])
  const [childrenOpen, setChildrenOpen] = useState(false)
  const checkRef = useRef()
  const { fetchComNavData } = communityMaps()

  const {
    contextMenuRef,
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick
  } = useContextMenu()

  const handleRightClick = event => {
    const menuItems = [
      {
        label: '추가',
        action: () => handleMenuItemClick(handleAddData)
      },
      {
        label: '삭제',
        action: () => handleMenuItemClick(handleDeleteData)
      }
    ]

    handleItemClick(item)

    handleContextMenu(event, menuItems)
  }

  const handleDeleteData = () => {
    deleteTreeview()
    refreshTreeview()
    fetchComNavData()
  }

  const deleteTreeview = async () => {
    const deleteTreeData = await deleteTree(selectedItem.id)

    if (deleteTreeData.status === 'success') {
      console.log(deleteTreeData.status)
    } else {
      console.log(deleteTreeData.error)
    }
  }

  const refreshTreeview = async () => {
    const fetchedTree = await getTree()
    const fetchedTreeData = fetchedTree.data
    // 데이터 변환
    const modData = fetchedTreeData.map(item => ({
      icon: 'file',
      id: item.boardId,
      name: item.boardName,
      usecomment: item.isUseComment === 1,
      rud: item.userRud
    }))
    if (fetchedTree.status === 'success') {
      setData(modData)
    } else {
      console.log(fetchedTree.error)
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
                  item={nestedItem}
                  index={index}
                  openedItems={openedItems}
                  setOpenedItems={setOpenedItems}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  selection={selection}
                  handleItemClick={handleItemClick}
                  selectedItem={selectedItem}
                  handleAddData={handleAddData}
                  setData={setData}
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
            onContextMenu={handleRightClick}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={classNames('me-2', item.iconClass)}
            />
            {item?.name || '이름을 변경하세요'}
            {contextMenuState.isOpen && (
              <div
                ref={contextMenuRef}
                className="fixed rounded bg-gray-100 border border-gray-300 shadow shadow-gray-500 py-1 z-50"
                style={{ top: contextMenuState.y, left: contextMenuState.x }}
              >
                {contextMenuState.menuItems.map(item => (
                  <div
                    key={item.label}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => item.action()}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </button>
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
  setTree,
  setSelectedItem,
  selectedItem,
  setData
}) => {
  const [openedItems, setOpenedItems] = useState(expanded)

  const handleAddData = () => {
    console.log('변경 전:', selectedItem)
    const newData = { icon: 'file', id: '', name: '', usecomment: true, rud: 6 }

    setTree(prevData => [
      {
        ...prevData[0],
        children: [...prevData[0].children, newData]
      }
    ])

    setSelectedItem(JSON.parse(JSON.stringify(newData)))
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
  setData: PropTypes.func
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
