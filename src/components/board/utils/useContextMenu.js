import { useState, useCallback, useRef, useEffect } from "react";

const useContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState({
    x: 0,
    y: 0,
    menuItems: [],
    isOpen: false,
  });

  const contextMenuRef = useRef(null);

  const handleContextMenu = useCallback(
    (event, menuItems) => {
      event.preventDefault();
      const clickX = event.clientX;
      const clickY = event.clientY;
      setContextMenuState({
        x: clickX,
        y: clickY,
        menuItems: menuItems,
        isOpen: true,
      });
    },[]);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  const handleMenuItemClick = useCallback(
    (action) => {
      action();
      handleCloseContextMenu();
    },
    [handleCloseContextMenu]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleCloseContextMenu]);

  return {
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick,
    contextMenuRef,
  };
};

export default useContextMenu;