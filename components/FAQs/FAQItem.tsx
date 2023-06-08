import React, { memo } from 'react';
import classes from './styles.module.css';

const FAQItem = ({ question, answer, id, handelClick }: any) => {
  const handelevent = () => {
    handelClick(id);
  };
  return (
    <div className={classes.faqContainer}>
      <details onClick={handelevent} data-id={id}>
        <summary className= {classes.summary} >
          <span className={classes.question}> {question}</span>
          <span className={classes.icon}>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 .799l4 4 4-4" stroke="#5509F7" strokeWidth="2" fill="none" fillRule="evenodd" />
            </svg>
          </span>
        </summary>
        <p className={classes.answer}>{answer}</p>
      </details>
    </div>
  );
};

export default memo(FAQItem);
