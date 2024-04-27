import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent, useState } from "react";
type Props = {
  isSubmit: boolean;
  campaignData: {
    name: string;
    describe: string;
  };
  onChangeData: (data: { name: string; value: string }) => void;
};
const CampaignInfomation = ({
  isSubmit,
  campaignData,
  onChangeData,
}: Props) => {
  const [inforCampaign, setInforCampaign] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "ad",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    onChangeData({ name, value });
  };
  return (
    <Box className="pd-2">
      <TextField
        fullWidth
        style={{ margin: "1rem 0" }}
        error={isSubmit ? (campaignData.name ? false : true) : false}
        name="name"
        value={campaignData.name}
        helperText={
          isSubmit
            ? campaignData.name
              ? undefined
              : "Dữ liệu không hợp lệ"
            : undefined
        }
        label="Tên chiến dịch *"
        variant="standard"
        onChange={handleChangeInput}
      />
      <TextField
        style={{ margin: "1rem 0" }}
        fullWidth
        error={inforCampaign.description ? false : true}
        name="describe"
        value={campaignData.describe}
        label="Mô tả"
        variant="standard"
        onChange={handleChangeInput}
      />
    </Box>
  );
};

export default CampaignInfomation;
