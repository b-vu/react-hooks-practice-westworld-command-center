import React, { useState, useEffect } from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ hosts, handleAllHosts, logs, handleLogs }) {
  const [areHostsActive, setAreHostsActive] = useState(false);

  useEffect(() => {
    const checkHosts = hosts.find(host => !host.active);

    if(checkHosts){
      setAreHostsActive(false);
    }
    else{
      setAreHostsActive(true);
    }
  }, [hosts]);

  const onButtonClick = () => {
    const status = hosts.find(host => !host.active)
    
    if(status){
      hosts.forEach(host => {
        fetch(`http://localhost:3001/hosts/${host.id}`, {
          method: "PATCH",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            active: true
          })
        })
        .then(res => res.json())
        .then(data => console.log(data));
      })
      handleAllHosts("activate all");
      handleLogs(Log.warn("Activating all hosts!"));
    }
    else{
      hosts.forEach(host => {
        fetch(`http://localhost:3001/hosts/${host.id}`, {
          method: "PATCH",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            active: false
          })
        })
        .then(res => res.json())
        .then(data => console.log(data));
      })
      handleAllHosts("decommission all");
      handleLogs(Log.notify("Decommissioning all hosts"));
    }
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button fluid color={areHostsActive ? "green" : "red"} content={areHostsActive ? "DECOMMISSION ALL" : "ACTIVATE ALL"} onClick={() => onButtonClick()}/>
    </Segment>
  );
}

export default LogPanel;
