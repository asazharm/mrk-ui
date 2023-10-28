import styles from './storybook-host.module.scss';

/* eslint-disable-next-line */
export interface StorybookHostProps {}

export function StorybookHost(props: StorybookHostProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StorybookHost!</h1>
    </div>
  );
}

export default StorybookHost;
