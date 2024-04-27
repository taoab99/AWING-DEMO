import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { adsType } from "../features";

type Props = {
  isSubmit: boolean;
  listData: adsType[];
  onDeleteAdsItem: (index: number) => void;
  onChangeSub: (
    index?: number,
    data?: { name: string; value: string | number }
  ) => void;
};

const ListAdvertisement = ({
  isSubmit,
  listData,
  onChangeSub,
  onDeleteAdsItem,
}: Props) => {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    onChangeSub(index, { name, value: type === "text" ? value : +value });
  };
  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAll(!checkAll);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div className="flex-box py-1">
          <div className="flex-box-item-small">
            <Checkbox
              aria-label="CheckAll"
              color="success"
              style={{ padding: "0" }}
              checked={checkAll}
              onChange={handleCheckAll}
            />
          </div>
          <div className="flex-box-item-big">
            {!checkAll && "Tên quảng cáo *"}
          </div>
          <div className="flex-box-item-big"> {!checkAll && "Số lượng *"}</div>
          <div className="flex-box-item-small">
            <Button variant="outlined" onClick={() => onChangeSub()}>
              <AddIcon /> THÊM
            </Button>
          </div>
        </div>
      </Box>
      {listData &&
        listData.map((item, index) => {
          return (
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} key={index}>
              <div className="flex-box py-1">
                <div className="flex-box-item-small">
                  <Checkbox
                    aria-label="CheckAll"
                    color="success"
                    style={{ padding: "0" }}
                  />
                </div>
                <div className="flex-box-item-big">
                  <TextField
                    fullWidth
                    error={isSubmit ? (item.name ? false : true) : false}
                    value={item.name}
                    name="name"
                    label={`Tên quảng cáo ${index + 1}`}
                    variant="standard"
                    onChange={(e: any) => handleChangeInput(e, index)}
                  />
                </div>
                <div className="flex-box-item-big">
                  <TextField
                    type="number"
                    fullWidth
                    value={item.quantity}
                    error={isSubmit ? (item.quantity ? false : true) : false}
                    name="quantity"
                    label="Số lượng"
                    variant="standard"
                    onChange={(e: any) => handleChangeInput(e, index)}
                  />
                </div>
                <div className="flex-box-item-small">
                  <IconButton
                    aria-label="delete"
                    style={{ padding: "0" }}
                    onClick={() => onDeleteAdsItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </Box>
          );
        })}
    </Box>
  );
};

export default ListAdvertisement;
