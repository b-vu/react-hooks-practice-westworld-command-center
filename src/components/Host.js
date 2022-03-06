import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, handleHostSelection, selectedHost }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={selectedHost.id === host.id ? "host selected" : "host"}
      onClick={() => {handleHostSelection(host)}}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
