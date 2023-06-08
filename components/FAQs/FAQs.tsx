import React, { useState } from 'react';
import { faqs } from '@/utils/constants';
import classes from './styles.module.css';
import FAQItem from './FAQItem';

const Accordion = () => {
  const handelClick = (id: any) => {
    const details = document.getElementsByTagName('details');
    for (let i = 0; i < details.length; i++) {
      let element = details[i];
      let Elementid = Number(element.getAttribute('data-id'));

      if (Elementid !== id && element.hasAttribute('open')) {
        element.removeAttribute('open');
      }
    }
  };

  return (
    <div className={classes.faq}>
      <div className={classes.main}>
        <h1 className={classes.heading}>FAQ</h1>
        {faqs.map((item, index) => (
          <FAQItem key={index} id={index} handelClick={handelClick} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
