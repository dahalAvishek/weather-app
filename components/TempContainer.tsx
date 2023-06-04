import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  RefAttributes,
} from "react";
import clsx from "clsx";
import { getFormattedHour, SelectedData } from "@/utils/getCurrentData";
import { calculateFeelsLike } from "@/utils/determineMeterological";

interface Props {
  selectedData: SelectedData;
  selectedTime: string;
  datum: string;
  index: number;
  handleTimeChange: (timeString: string) => void;
}

const TempContainer: ForwardRefExoticComponent<
  Props & RefAttributes<HTMLDivElement>
> = forwardRef(function TempContainer(
  { selectedData, selectedTime, datum, index, handleTimeChange },
  ref
) {
  const checkCondition = (time: string) => {
    if (time === selectedTime) return true;
    return false;
  };

  const feelsLike = calculateFeelsLike(selectedData).toFixed(0);

  if (checkCondition(datum)) {
    return (
      <div
        className="basis-40 grow flex-shrink-0 flex gap-2 flex-col cursor-pointer scale-105  "
        ref={ref}
        onClick={(e) => handleTimeChange(datum)}
      >
        <time>{getFormattedHour(selectedData.time)}</time>
        <section>
          <h2 className="inline">{selectedData.temperature_2m.toFixed(0)}</h2>
          <h3 className="inline">
            <sup>o</sup>C
          </h3>
        </section>
        <p>Feels like {feelsLike}</p>
      </div>
    );
  } else {
    return (
      <div
        className="scale-75 basis-40 grow flex-shrink-0 flex gap-2 flex-col cursor-pointer "
        onClick={(e) => handleTimeChange(datum)}
      >
        <time>{getFormattedHour(selectedData.time)}</time>
        <section>
          <h2 className="inline">{selectedData.temperature_2m.toFixed(0)}</h2>
          <h3 className="inline">
            <sup>o</sup>C
          </h3>
        </section>
      </div>
    );
  }
});

export default TempContainer;
