import React from "react";
import "../stylesheets/Area.css";
import Host from "./Host";

function Area({ area, hosts, handleHostSelection, selectedHost, fixAreaName }) {
  const renderHostsInArea = hosts => {
    const hostsInArea = hosts.filter(host => host.area === area.name && host.active);
    return hostsInArea.map(host => <Host key={host.id} host={host} handleHostSelection={handleHostSelection} selectedHost={selectedHost}></Host>)
  }

  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {fixAreaName(area.name)}
      </h3>
      {renderHostsInArea(hosts)}
    </div>
  );
}

export default Area;
