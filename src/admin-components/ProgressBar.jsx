import React from 'react';
import styled from 'styled-components';
import { ProgressStyle } from '../styles/ProgressStyles';



export default function Component({ processing }) {
    return (
        <ProgressStyle>
            <div className="inner" style={{ width: `${processing}%` }}>
                <span>{`${processing.toFixed(2)}%`}</span>
            </div>
        </ProgressStyle>
    );
}
