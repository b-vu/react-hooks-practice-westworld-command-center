import React, { useState, useEffect } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";
import { Log } from "../services/Log";

function HostInfo({ selectedHost, areas, handleActiveStatus, handleAreaChange, hosts, handleLogs, fixAreaName, dbNameFix }) {
  const [selectedHostActivityChange, setSelectedHostActivityChange] = useState(false);

  useEffect(() => {
    const updatedSelectedHost = hosts.find(host => host.firstName === selectedHost.firstName);

    setSelectedHostActivityChange(updatedSelectedHost.active)
  },[hosts, selectedHost.firstName]);

  const dropdownAreas = areas.map(area => {
    return {
      key: area.id,
      text: fixAreaName(area.name),
      value: area.name
    }
  });

  const checkAreaLimit = areaName => {
    let numHosts = 0;
    const areaToCheck = areas.find(area => fixAreaName(area.name) === areaName);

    hosts.forEach(host => {
      if(fixAreaName(host.area) === areaName){
        ++numHosts;
      }
    });

    if(areaToCheck.limit > numHosts){
      return true;
    }
    else{
      return false;
    }
  }

  function handleOptionChange(e) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    if (checkAreaLimit(e.target.textContent)) {
      fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          area: dbNameFix(e.target.textContent)
        })
      })
        .then(res => res.json())
        .then(data => {
          handleAreaChange(data.area, data.id);
          handleLogs(Log.notify(`${data.firstName} set in area ${fixAreaName(data.area)}`));
        });
    }
    else{
      handleLogs(Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${e.target.textContent}`));
    }
  }

  function handleRadioChange() {
    fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: !selectedHost.active
      })
    })
    .then(res => res.json())
    .then(data => {
      handleActiveStatus(data.active, data.id);
      if(data.active) handleLogs(Log.warn(`Activated ${data.firstName}`));
      else handleLogs(Log.notify(`Decommissioned ${data.firstName}`));
    });
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.lastName === "n/a" ? selectedHost.firstName : selectedHost.firstName + " " + selectedHost.lastName} | {selectedHost.gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={selectedHostActivityChange ? "Active" : "Decommissioned"}
                checked={selectedHostActivityChange}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={selectedHost.area}
              options={dropdownAreas}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
