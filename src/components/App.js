import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {
  const [areas, setAreas] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [isHostSelected, setIsHostSelected] = useState(false);
  const [selectedHost, setSelectedHost] = useState({
      "id": null,
      "firstName": "",
      "lastName": "",
      "active": false,
      "imageUrl": "",
      "gender": "",
      "area": "",
      "authorized": false
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
    .then(res => res.json())
    .then(data => {
      setAreas(data);
      fetch("http://localhost:3001/hosts")
      .then(res => res.json())
      .then(data =>setHosts(data));
      });
  }, []);

  const handleHostSelection = host => {
    setIsHostSelected(true);
    setSelectedHost(host);
  }

  const handleAreaChange = (area, id) => {
    const newHosts = hosts.map(host => {
      if (host.id === id) {
        return {
          ...host,
          area: area
        }
      }
      return host;
    });
    const updatedSelectedHost = {
      ...selectedHost,
      area: area
    }

    setHosts(newHosts);
    setSelectedHost(updatedSelectedHost);
  }

  const handleActiveStatus = (status, id) => {
    const newHosts = hosts.map(host => {
      if (host.id === id) {
        return {
          ...host,
          active: status
        }
      }
      return host;
    });

    const updatedSelectedHost = {
      ...selectedHost,
      active: status
    }

    setHosts(newHosts);
    setSelectedHost(updatedSelectedHost);
  }

  const handleAllHosts = action => {
    console.log(action)
    if(action === "activate all"){
      const activatedHosts = hosts.map(host => {
        return {
          ...host,
          active: true
        }
      });
      setHosts(activatedHosts);
    }
    else{
      const decommissionedHosts = hosts.map(host => {
        return {
          ...host,
          active: false
        }
      });
      setHosts(decommissionedHosts);
    }
  }

  const handleLogs = log => {
    setLogs([log, ...logs]);
  }

  const fixAreaName = areaName => {
    return areaName
    .split("_")
    .map(name => name.charAt(0).toUpperCase() + name.substring(1))
    .join(" ");
  }

  const dbNameFix = areaName => {
    return areaName
    .split(" ")
    .map(name => name.charAt(0).toLowerCase() + name.substring(1))
    .join("_");
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} handleHostSelection={handleHostSelection} selectedHost={selectedHost} fixAreaName={fixAreaName}></WestworldMap>
      <Headquarters 
        areas={areas} 
        handleHostSelection={handleHostSelection} 
        hosts={hosts} 
        isHostSelected={isHostSelected} 
        selectedHost={selectedHost} 
        handleActiveStatus={handleActiveStatus}
        handleAreaChange={handleAreaChange}
        handleAllHosts={handleAllHosts}
        logs={logs}
        handleLogs={handleLogs}
        fixAreaName={fixAreaName}
        dbNameFix={dbNameFix}>
        </Headquarters>
    </Segment>
  );
}

export default App;
