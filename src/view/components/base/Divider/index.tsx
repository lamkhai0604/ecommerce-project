import React from 'react';
import './style.css'

interface IDividerProps {
    clsName?: string
}

const Divider = (props:IDividerProps) => {
    return <div className={`divider ${props.clsName}`} />
}

export default Divider;