import {
  IDrillCurve,
  drillLateralSkatingCurve,
  drillPassCurves,
  drillPuck,
  drillSkateBackwardCurves,
  drillSkateCurves,
  drillSkateWithPuckCurves,
} from "./drill-curves";
import {
  IDrillImage,
  drillDefenseImages,
  drillForwardImages,
  drillNetImages,
  drillNumberImages,
  drillPositionImages,
  drillRulesImages,
  drillTextImage,
  drillUtilityImages,
} from "./drill-images";

type ITool = Record<string, IDrillCurve[] | IDrillImage[]>;

export const toolsConfig: ITool = {
  skate: drillSkateCurves,
  skateWithPuck: drillSkateWithPuckCurves,
  skateBackwards: drillSkateBackwardCurves,
  pass: drillPassCurves,
  lateralSkating: drillLateralSkatingCurve,
  utilityImages: drillUtilityImages,
  netImages: drillNetImages,
  forwardImages: drillForwardImages,
  defenseImages: drillDefenseImages,
  rulesImages: drillRulesImages,
  positionImages: drillPositionImages,
  numberImages: drillNumberImages,
  textImage: drillTextImage,
  pucks: drillPuck,
};
