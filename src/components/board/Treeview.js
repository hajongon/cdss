import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { axiosInstance } from '../authentication/apis/instance'
import useContextMenu from './utils/useContextMenu'
import communityMaps from 'routes/communityMaps'

const TreeviewListItem = ({
  item,
  openedItems,
  setOpenedItems,
  selectedItems,
  setSelectedItems,
  selection,
  handleItemClick,
  onAddData,
  onDeleteData
}) => {
  const [open, setOpen] = useState(openedItems.indexOf(item.id) !== -1)
  const [children, setChildren] = useState([])
  const [firstChildren, setFirstChildren] = useState([])
  const [childrenOpen, setChildrenOpen] = useState(false)
  const checkRef = useRef()

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
        action: () => handleMenuItemClick(onAddData)
      },
      {
        label: '삭제',
        action: () => handleMenuItemClick(onDeleteData)
      }
    ]

    handleItemClick(item)

    handleContextMenu(event, menuItems)
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
                  onAddData={onAddData}
                  onDeleteData={onDeleteData}
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
  selectedItem,
  updateTree,
  setSelectedItem
}) => {
  const [openedItems, setOpenedItems] = useState(expanded)

  const { fetchComNavData } = communityMaps()

  const handleAddData = () => {
    const newData = { icon: 'file', id: '', name: '', usecomment: true, rud: 6 }

    setTree(prevData => [
      {
        ...prevData[0],
        children: [...prevData[0].children, newData]
      }
    ])

    setSelectedItem(newData)
  }

  const handleDeleteData = () => {
    // 여기에서 트리 데이터를 업데이트하여 노드 삭제 로직을 구현
    const fetchData = async () => {
      try {
        const requestData = {
          boardId: selectedItem.id
        }
        console.log(selectedItem.id)
        const response = await axiosInstance.post(
          `/system/manage/delete`,
          requestData
        )
        console.log(response)
        updateTree()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    fetchComNavData()
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
          onAddData={handleAddData}
          onDeleteData={handleDeleteData}
          selectedItem={selectedItem}
        />
      ))}
    </ul>
  )
}

TreeviewListItem.propTypes = {
  item: PropTypes.object.isRequired,
  openedItems: PropTypes.array.isRequired,
  setOpenedItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  selection: PropTypes.bool.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  onAddData: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired
}

Treeview.propTypes = {
  data: PropTypes.array.isRequired,
  selection: PropTypes.bool.isRequired, // If true, selection is enabled.
  expanded: PropTypes.array.isRequired, // Default expanded children ids.
  selectedItems: PropTypes.array.isRequired, // Selected item ids.
  setSelectedItems: PropTypes.func.isRequired, // Setter to select items.
  handleItemClick: PropTypes.func.isRequired,
  setTree: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  updateTree: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired
}

export default Treeview
