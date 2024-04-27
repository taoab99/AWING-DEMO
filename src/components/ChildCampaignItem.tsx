import { subCampaignsType } from "../features";

type Props = {
  isSubmit: boolean;
  isActive?: boolean;
  selected?: boolean;
  data: subCampaignsType;
  onClick: () => void;
};
const ChildCampaignItem = ({ isActive, selected, data, onClick }: Props) => {
  const total = data.ads.reduce((item, item2) => {
    return item + item2.quantity;
  }, 0);
  return (
    <div className="card" onClick={onClick}>
      <p>{data.name}</p>
      <p>{total ?? 0}</p>
      {selected ? "selected" : "unSelected"}
      {isActive ? "active" : "unActive"}
    </div>
  );
};

export default ChildCampaignItem;
