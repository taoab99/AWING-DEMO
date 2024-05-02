import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { adsType } from "../features";

type Props = {
  isSubmit: boolean;
  listData: adsType[];
  onDeleteAdsItem: (data: number[]) => void;
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
  const [listIndexChecked, setListIdChecked] = useState<number[]>([]);
  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    onChangeSub(index, {
      name,
      value: type === "text" ? value : +value,
    });
  };
  const handleSelectIndex = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (listIndexChecked.includes(index)) {
      return setListIdChecked((prevState) => {
        const newState = prevState.filter((item) => item != index);
        return newState;
      });
    }
    setListIdChecked([...listIndexChecked, index]);
  };
  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (listIndexChecked.length === listData.length) {
      return setListIdChecked([]);
    }
    const listIndex = listData.map((item, index) => index.valueOf());
    setListIdChecked(listIndex);
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
              checked={
                listIndexChecked.length > 0 &&
                listIndexChecked.length === listData.length
              }
              onChange={handleCheckAll}
            />
          </div>
          <div className="flex-box-item-big">
            {listIndexChecked.length <= 0 ? (
              "Tên quảng cáo *"
            ) : (
              <IconButton
                aria-label="delete"
                style={{ padding: "0" }}
                onClick={() => {
                  onDeleteAdsItem(listIndexChecked);
                  setListIdChecked([]);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
          <div className="flex-box-item-big">
            {listIndexChecked.length <= 0 && "Số lượng *"}
          </div>
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
                    checked={listIndexChecked.includes(index)}
                    onChange={(e) => handleSelectIndex(e, index)}
                  />
                </div>
                <div className="flex-box-item-big">
                  <TextField
                    fullWidth
                    error={isSubmit ? (item.name.trim() ? false : true) : false}
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
                    onClick={() => onDeleteAdsItem([index])}
                    disabled={listIndexChecked.length > 0}
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
