import { subCampaignsType } from "../features";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
type Props = {
  isSubmit: boolean;
  isActive?: boolean;
  selected?: boolean;
  data: subCampaignsType;
  onClick: () => void;
};
const ChildCampaignItem = ({
  isActive,
  selected,
  isSubmit,
  data,
  onClick,
}: Props) => {
  const total = data.ads.reduce((item, item2) => {
    return item + item2.quantity;
  }, 0);
  const validate =
    data.ads.length > 0 &&
    data.ads.every((item) => item.name != "") &&
    data.ads.every((item) => item.quantity > 0);
  const className = isSubmit ? (validate ? "" : "warning") : "";
  return (
    <div
      className={"card " + (selected ? "card-active" : "card-normal ")}
      onClick={onClick}
    >
      <p className={className}>
        {data.name.length >= 30 ? data.name.slice(0, 29) + "..." : data.name}
        <CheckCircleRoundedIcon
          fontSize="small"
          color={isActive ? "success" : "disabled"}
        />
      </p>
      <p>{total ?? 0}</p>
    </div>
  );
};

export default ChildCampaignItem;
