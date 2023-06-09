import Image from 'next/image';
import classes from './styles.module.css';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('typewriter-effect'));

const data: string[] = ['Task Management', 'To-do', 'Tracking', 'Priority', 'Workflow', 'Subtasks', 'Scheduling'];

const Herobox = () => {
  return (
    <section className={classes.main}>
      <div className={classes.content}>
        <h1 className={clsx(classes.heading, 'font-rubik')}>Easy task management and lists tool</h1>
        <p className={classes.info}>
          Take control of your tasks, increase your productivity, and achieve your goals with ProTask, the ultimate task
          management solution.
        </p>
        <h2 className={classes.homeHeading2}>
          <div className={classes.typeWriterWrapper}>
            <Typewriter
              options={{
                strings: data,
                autoStart: true,
                loop: true,
                wrapperClassName: classes.Typewriter__wrapper,
              }}
            />
          </div>
        </h2>
      </div>
      <div className={classes.img}>
        <Image src="/assets/Homepage/homepage.webp" alt="herobox pic" fill />
      </div>
    </section>
  );
};

export default Herobox;
