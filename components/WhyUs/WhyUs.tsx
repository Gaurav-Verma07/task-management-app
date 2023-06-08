import { whyUsData } from '@/utils/constants';
import classes from './styles.module.css';
import Image from 'next/image';
const WhyUs = () => {
  return (
    <section className={classes.main}>
      <h1 className={classes.mainHeading}>Why Choose Us?</h1>
      <div className={classes.mainData}>
        {whyUsData.map((data, index) => (
          <div className={classes.block} key={index} style={{border:`1px solid ${data.color}`}} >
            <div className= {classes.img}>
              <Image src={data.img} fill alt={data.alt} />
            </div>
            <div className= {classes.dataBlock}>
              <h3 className= {classes.heading} style={{color:data.color}}>
                {data.heading}
              </h3>
              <p className={classes.info}>{data.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default WhyUs;
