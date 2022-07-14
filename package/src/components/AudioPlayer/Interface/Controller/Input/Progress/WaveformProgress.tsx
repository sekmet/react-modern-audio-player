import { FC } from "react";
import styled from "styled-components";

const WaveformWrapper = styled.div`
  display: flex;
  width: 100%;
  #rs-waveform {
    width: 100%;
    wave {
      cursor: pointer !important;
    }
  }
`;

export const WaveformProgress: FC = () => {
  return (
    <WaveformWrapper className="waveform-wrapper">
      <div id="rs-waveform" />
    </WaveformWrapper>
  );
};
