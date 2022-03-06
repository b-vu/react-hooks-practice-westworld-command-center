import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({ hosts, handleHostSelection, selectedHost }) {
  const renderColdStorageHosts = hosts => {
    const coldStorage = hosts.filter(host => !host.active);
    return coldStorage.map(host => <Host key={host.id} host={host} handleHostSelection={handleHostSelection} selectedHost={selectedHost}></Host>);
  }

  return (
    <Card.Group itemsPerRow={6}>{renderColdStorageHosts(hosts)}</Card.Group>
  );
}

export default HostList;
