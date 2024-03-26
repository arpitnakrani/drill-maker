interface IDrillMap {
  svgImagePath: string;
  label: string;
}
export const drillMaps: IDrillMap[] = [
  {
    label: "Full Rink",
    svgImagePath: "svgs/drill-map-svgs/full-rink.svg",
  },
  {
    label: "1/2 Rink Left",
    svgImagePath: "svgs/drill-map-svgs/half-rink-left.svg",
  },
  {
    label: "1/2 Rink Right",
    svgImagePath: "svgs/drill-map-svgs/half-rink-right.svg",
  },
  {
    label: "1/2 Rink (Top)",
    svgImagePath: "svgs/drill-map-svgs/half-rink-top.svg",
  },
  {
    label: "1/3 Rink",
    svgImagePath: "svgs/drill-map-svgs/third-rink.svg",
  },
  {
    label: "1/4 Rink",
    svgImagePath: "svgs/drill-map-svgs/quarter-rink.svg",
  },
  {
    label: "1/6 Rink",
    svgImagePath: "svgs/drill-map-svgs/sixth-rink.svg",
  },
  {
    label: "Neutral Zone",
    svgImagePath: "svgs/drill-map-svgs/neutral-zone.svg",
  },
  {
    label: "Studio Rink",
    svgImagePath: "svgs/drill-map-svgs/neutral-zone.svg",
  },
  {
    label: "Goalie Crease",
    svgImagePath: "svgs/drill-map-svgs/goalie-crease.svg",
  },
];

// (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1554.15 780.15" >
//     <g data-name="Border">
//       <path d="M1550.525 576.525c0 110-90 200-200 200h-1146.9c-110 0-200-90-200-200v-372.9c0-110 90-200 200-200h1146.9c110 0 200 90 200 200v372.9Z" style={{ fill: '#fff', stroke: '#80091f', strokeMiterlimit: 10, strokeWidth: '.25px' }}></path>
//       <path d="M1350.525 780.025h-1146.9c-54.136 0-105.178-21.229-143.725-59.775C21.354 681.703.125 630.661.125 576.525v-372.9C.125 149.489 21.354 98.447 59.9 59.9S149.489.125 203.625.125h1146.9c54.136 0 105.178 21.229 143.725 59.775s59.775 89.589 59.775 143.725v372.9c0 54.136-21.229 105.178-59.775 143.725s-89.589 59.775-143.725 59.775Zm-1146.9-772.9c-108.351 0-196.5 88.149-196.5 196.5v372.9c0 108.351 88.149 196.5 196.5 196.5h1146.9c108.351 0 196.5-88.149 196.5-196.5v-372.9c0-108.351-88.149-196.5-196.5-196.5h-1146.9Z" style={{ fill: '#253e56', stroke: '#80091f', strokeMiterlimit: 10, strokeWidth: '.25px' }}></path>
//     </g>
//     <g data-name="Layer 1" style={{ opacity: .4 }}>
//       <circle cx="781.225" cy="389.425" r="118.4" style={{ fill: 'none', stroke: '#80091f', strokeMiterlimit: 10, strokeWidth: '4px' }}></circle>
//       <path style={{ fill: '#80091f' }} d="M777.225 507.478h10.8v265.668h-10.8zM777.225 6.814h10.8v263.815h-10.8z"></path>
//       <circle cx="599.825" cy="200.725" r="9.3" style={{ fill: '#80091f' }}></circle>
//       <circle cx="962.125" cy="200.725" r="9.3" style={{ fill: '#80091f' }}></circle>
//       <circle cx="600.025" cy="583.925" r="9.3" style={{ fill: '#80091f' }}></circle>
//       <circle cx="962.325" cy="583.925" r="9.3" style={{ fill: '#80091f' }}></circle>
//       {/* Additional SVG elements */}
//     </g>
//     {/* Ensure to convert the rest of the SVG elements similarly */}
//   </svg>
// ),
