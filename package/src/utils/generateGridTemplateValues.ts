import {
  ActiveUI,
  defaultInterfacePlacement,
  InterfacePlacement,
  interfacePlacementMaxLength,
} from "@/components/AudioPlayer/Context/StateContext";

export const generateGridTemplateValues = (
  activeUi: ActiveUI,
  placement?: InterfacePlacement["templateArea"]
) => {
  let maxRowLength = 1;
  let maxColLength = 1;
  const placementValueArr = Object.values(placement || {}).map(
    (value) => value.split("row")[1]
  );

  const getMaxLength = () => {
    if (placementValueArr.length !== 0) {
      for (let i = 0; i < placementValueArr.length; i++) {
        const row = placementValueArr[i].split("-")[0];
        const col = placementValueArr[i].split("-")[1];
        maxRowLength = Math.max(maxRowLength, +row);
        maxColLength = Math.max(maxColLength, +col);
      }
    }
    if (activeUi.all) {
      maxColLength = interfacePlacementMaxLength - 1;
      return;
    }
    maxColLength = Object.values(activeUi).filter((boolean) =>
      Boolean(boolean)
    ).length;
    return;
  };
  getMaxLength();

  const gridAreas = new Array(maxRowLength).fill("").map((_, rowIdx) => {
    let cols = "";
    for (let i = 0; i < maxColLength; i++) {
      cols += ` row${rowIdx + 1}-${i + 1}`;
      if (i === 0) {
        cols = cols.trim();
      }
    }
    return cols;
  });
  const gridColumns = new Array(maxRowLength).fill("").map((_, rowIdx) => {
    //TODO : 서버사이드에서 체크
    const maxWidth = window ? window.innerWidth - 100 : 1500;
    const [progressRow, progressCol] = (
      placement?.progress || defaultInterfacePlacement.templateArea.progress
    )
      .replace("row", "")
      .split("-");

    let cols = "";
    for (let i = 0; i < maxColLength; i++) {
      if (i === 0) {
        cols = cols.trim();
      }
      if (rowIdx === 0 && i + 1 === +progressCol) {
        cols += ` 1fr`;
        continue;
      }
      cols += ` fit-content(${maxWidth}px)`;
    }
    return cols;
  });

  return { gridAreas, gridColumns };
};