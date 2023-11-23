import styled from "styled-components";

export const Metronome = styled.div`
    position: absolute;
    z-index: 8;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: ew-resize;
    user-select: none;

    .template {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        background-color: rgba(76, 175, 80, 0.5);
        border-left: 1px solid rgba(76, 175, 80, 0.8);
        border-right: 1px solid rgba(76, 175, 80, 0.8);
        user-select: none;
        pointer-events: none;
    }
`;