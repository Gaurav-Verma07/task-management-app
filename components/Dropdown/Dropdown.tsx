import React, { useEffect, useRef } from 'react';

import classes from './Dropdown.module.css';

function Dropdown(props: any) {
  const dropdownRef: any = useRef();

  const handleClick = (event: any) => {
    if (dropdownRef && !dropdownRef.current?.contains(event.target) && props.onClose) props.onClose();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={`${classes.dropdown} ${classes['custom-scroll']} ${props.class ? props.class : ''}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
