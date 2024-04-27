import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type Props = {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
};

const CampaignTab = ({ value, onChange }: Props) => {
  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={onChange} aria-label="tabs">
        <Tab label="THÔNG TIN" value="1" />
        <Tab label="CHIẾN DỊCH CON" value="2" />
      </Tabs>
    </Box>
  );
};

export default CampaignTab;
