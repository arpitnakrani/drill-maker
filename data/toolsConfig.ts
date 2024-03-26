import {
  IDrillCurve,
  drillLateralSkatingCurve,
  drillPassCurves,
  drillSkateBackwardCurves,
  drillSkateCurves,
  drillSkateWithPuckCurves,
} from "./drill-curves";
import { IDrillImage, drillForwardImages, drillNetImages, drillUtilityImages } from "./drill-images";

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
};