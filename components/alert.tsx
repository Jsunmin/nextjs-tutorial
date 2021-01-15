import React from 'react';
import styles from './alert.module.css'
import cn from 'classnames'

type Props = {
    children: React.ReactNode,
    type: string
};
export default function Alert({ children, type }: Props) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}