import { featuresData } from '@/utils/constants';
import classes from './styles.module.css';
import Image from 'next/image';

const Features = () => {
  return (
    <section className={classes.main}>
      {featuresData.map((data, index) => (
        <div className={classes.box} key={index}>
          <div className={classes.img}>
            <Image src={data.img} fill alt={data.alt} />
          </div>
          <p className={classes.info}>{data.content}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
