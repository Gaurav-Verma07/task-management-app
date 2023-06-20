import React, { useState } from 'react';
import classes from './CustomInput.module.css';
import { IconX } from '@tabler/icons-react';
import { Button, Text, TextInput } from '@mantine/core';

interface CustomInputProps {
  text: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
}

function CustomInput(props: CustomInputProps) {
  const { text, onSubmit, displayClass, editClass, placeholder, defaultValue, buttonText } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || '');

  const submission = (e: any) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText('');
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <div className={classes['custom-input']}>
      {isCustomInput ? (
        <form className={`${classes['custom-input-edit']} ${editClass ? editClass : ''}`} onSubmit={submission}>
          {/* <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          /> */}
          <TextInput
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => {
              setInputText(event.target.value);
            }}
            autoFocus
          />
          <div className={classes['custom-input-edit-footer']}>
            <Button type='submit'>{buttonText || 'Add'}</Button>
            {/* <button type="submit">{buttonText || 'Add'}</button> */}
            <IconX onClick={() => setIsCustomInput(false)} className={classes.closeIcon} />
          </div>
        </form>
      ) : (
        <Text
          className={`${classes['custom-input-display']} ${displayClass ? displayClass : ''}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </Text>
      )}
    </div>
  );
}

export default CustomInput;
