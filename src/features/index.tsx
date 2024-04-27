import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useState } from "react";
import CampaignTab from "../components/CampaignTab";
import CampaignInfomation from "./CampaignInfomation";
import ChildrenCampaign from "./childCampaign";

export type informationType = {
  name: string;
  describe: string;
};
export type adsType = {
  name: string;
  quantity: number;
};
export type subCampaignsType = {
  name: string;
  status: boolean;
  ads: adsType[];
};
export type campaignType = {
  campaign: {
    information: informationType;
    subCampaigns: subCampaignsType[];
  };
};

export default function RootFeature() {
  const [value, setValue] = useState<string>("1");
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [data, setData] = useState<campaignType>({
    campaign: {
      information: {
        name: "",
        describe: "",
      },
      subCampaigns: [
        {
          name: "Chiến dịch con 1",
          status: true,
          ads: [
            {
              name: "Quảng cáo 1",
              quantity: 0,
            },
          ],
        },
      ],
    },
  });
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleChangeInfomation = (inputData: {
    name: string;
    value: string;
  }) => {
    setData({
      campaign: {
        information: {
          ...data.campaign.information,
          [inputData.name]: inputData.value,
        },
        subCampaigns: [...data.campaign.subCampaigns],
      },
    });
  };
  const handleAddSub = () => {
    setData({
      campaign: {
        ...data.campaign,
        subCampaigns: [
          ...data.campaign.subCampaigns,
          {
            name: `Chiến dịch con ${data.campaign.subCampaigns.length + 1}`,
            status: true,
            ads: [
              {
                name: "Quảng cáo 1",
                quantity: 0,
              },
            ],
          },
        ],
      },
    });
  };
  const handleChangeNameSubItem = (
    index: number,
    name?: string,
    subData?: subCampaignsType
  ) => {
    const newListSub = [...data.campaign.subCampaigns];
    if (name || name === "") {
      newListSub[index].name = name;
    } else if (subData) {
      newListSub[index] = subData;
    } else {
      newListSub[index].status = !newListSub[index].status;
    }
    setData({
      campaign: {
        ...data.campaign,
        subCampaigns: newListSub,
      },
    });
  };

  const handleSubmit = () => {
    setSubmit(true);
  };
  return (
    <div>
      <Container
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          textAlign: "right",
          borderBottom: "1px solid",
        }}
        maxWidth={false}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Container>
      <Container
        style={{
          width: "100vw",
          height: "auto",
          padding: "2rem",
        }}
        maxWidth={false}
      >
        <Box
          style={{
            padding: "0",
            boxShadow: "0px 1px 3px gray",
            borderRadius: "3px",
          }}
        >
          <CampaignTab value={value} onChange={handleChange} />
          {value === "1" ? (
            <CampaignInfomation
              isSubmit={isSubmit}
              campaignData={data.campaign.information}
              onChangeData={handleChangeInfomation}
            />
          ) : (
            <ChildrenCampaign
              isSubmit={isSubmit}
              subCampaignsData={data.campaign.subCampaigns}
              onAddSubCampaign={handleAddSub}
              onChangeSubItem={handleChangeNameSubItem}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}
