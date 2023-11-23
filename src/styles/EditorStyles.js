import styled from "styled-components";

export const HomeStyle = styled.div`
    height: 100%;
    width: 100%;
    .tools_trigger{
        ${'' /* height: 100%; */}
        background-color: #0d0d0d;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        border-left: 1px solid gray;
        font-weight: bolder;
        font-size: 20px;
        cursor: pointer;
        
        &:hover{
            background-color: #000000;
        }
    }
    
    .tools_trigger:hover > *{
        scale: 1.3;
        transition: scale 0.1s ease-in;
    }
    .main {
        display: flex;
        height: calc(100% - 200px);

        .player {
            flex: 1;
            margin-top:10px;
            padding-top:20px
        }

        .subtitles {
            width: 250px;
        }

        .tool {
            width: 300px;
        }
    }

    .footer {
        height: 200px;
    }
`;