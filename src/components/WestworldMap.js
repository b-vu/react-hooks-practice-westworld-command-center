import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ areas, hosts, handleHostSelection, selectedHost, fixAreaName }) {
  return <Segment id="map">{areas.map(area => <Area key={area.id} area={area} hosts={hosts} handleHostSelection={handleHostSelection} selectedHost={selectedHost} fixAreaName={fixAreaName}/>)}</Segment>;
}

export default WestworldMap;
