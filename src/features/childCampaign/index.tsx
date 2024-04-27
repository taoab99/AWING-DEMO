import AddIcon from "@mui/icons-material/Add";
import { Button, FormControlLabel, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useState } from "react";
import ChildCampaignItem from "../../components/ChildCampaignItem";
import ListAdvertisement from "../../components/ListAdvertisement";
import { subCampaignsType } from "..";

type Props = {
  isSubmit: boolean;
  subCampaignsData: subCampaignsType[];
  onAddSubCampaign: () => void;
  onChangeSubItem: (
    index: number,
    name?: string,
    subData?: subCampaignsType
  ) => void;
};
const ChildrenCampaign = ({
  isSubmit,
  subCampaignsData,
  onAddSubCampaign,
  onChangeSubItem,
}: Props) => {
  const [indexActive, setIndexActive] = useState<number>(0);
  const [subCampaign, setSubCampaign] = useState<subCampaignsType>(
    subCampaignsData[0]
  );

  const handleChangeSubItem = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const typeInput = e.target.type;
    onChangeSubItem(index, typeInput === "text" ? e.target.value : undefined);
  };
  const handleChangeAds = (
    index?: number,
    data?: { name: string; value: string | number }
  ) => {
    const newSub = { ...subCampaign };
    if (data) {
      newSub.ads[index!] = {
        ...newSub.ads[index!],
        [data.name]: data.value,
      };
    } else {
      newSub.ads = [
        ...subCampaign.ads,
        {
          name: `Quảng cáo ${subCampaign.ads.length + 1}`,
          quantity: 0,
        },
      ];
    }
    setSubCampaign(newSub);
    onChangeSubItem(indexActive, undefined, newSub);
  };
  const handleDeleteAds = (index: number) => {
    const newSub = { ...subCampaign };
    newSub.ads.splice(index, 1);
    setSubCampaign(newSub);
    onChangeSubItem(indexActive, undefined, newSub);
  };
  return (
    <Box className="pd-2">
      <div className="childCam-box">
        <Button
          variant="outlined"
          className="btn-add"
          onClick={onAddSubCampaign}
        >
          <AddIcon />
        </Button>
        <div className="list-card">
          {subCampaignsData.map((item, index) => {
            return (
              <ChildCampaignItem
                data={item}
                isSubmit={isSubmit}
                onClick={() => {
                  setSubCampaign(item);
                  setIndexActive(index);
                }}
                selected={indexActive === index}
                isActive={item.status}
                key={index}
              />
            );
          })}
        </div>
      </div>
      {subCampaign && (
        <>
          <Box className="py-1">
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <TextField
                  style={{ margin: "1rem 0" }}
                  fullWidth
                  error={isSubmit ? (subCampaign.name ? false : true) : false}
                  value={subCampaign.name}
                  helperText={
                    isSubmit
                      ? subCampaign.name
                        ? undefined
                        : "Dữ liệu không hợp lệ"
                      : undefined
                  }
                  name="name"
                  label="Tên chiến dịch con *"
                  variant="standard"
                  onChange={(e: any) => {
                    handleChangeSubItem(e, indexActive);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="end"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      aria-label="Checkbox demo"
                      checked={subCampaign.status}
                      color="success"
                      onChange={(e: any) => {
                        handleChangeSubItem(e, indexActive);
                      }}
                    />
                  }
                  label="Đang hoạt động"
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <p className="py-1">DANH SÁCH QUẢNG CÁO</p>
            <ListAdvertisement
              isSubmit={isSubmit}
              listData={subCampaign.ads ?? []}
              onChangeSub={handleChangeAds}
              onDeleteAdsItem={handleDeleteAds}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChildrenCampaign;
