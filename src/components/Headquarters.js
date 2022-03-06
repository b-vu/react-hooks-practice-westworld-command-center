import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ areas, handleHostSelection, hosts, isHostSelected, selectedHost, handleActiveStatus, handleAreaChange, handleAllHosts, logs, handleLogs, fixAreaName, dbNameFix }) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>{<ColdStorage hosts={hosts} handleHostSelection={handleHostSelection} selectedHost={selectedHost}></ColdStorage>}</Grid.Column>
      <Grid.Column width={5}>
        <Details isHostSelected={isHostSelected} selectedHost={selectedHost} areas={areas} handleActiveStatus={handleActiveStatus} handleAreaChange={handleAreaChange} hosts={hosts} handleLogs={handleLogs} fixAreaName={fixAreaName} dbNameFix={dbNameFix}/>
      </Grid.Column>
      <Grid.Column width={3}>
        {<LogPanel hosts={hosts} handleAllHosts={handleAllHosts} logs={logs} handleLogs={handleLogs}></LogPanel>}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
