import React from "react";
import { Table } from "@mantine/core";
import { Data } from "../dummy-data/Data";

function TableOne() {
  const calculateAverages = (data) => {
    let cropData = {};

    data.forEach((entry) => {
      const cropName = entry["Crop Name"];
      const yieldValue = parseFloat(
        entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
      );
      const areaValue = parseFloat(
        entry["Area Under Cultivation (UOM:Ha(Hectares))"]
      );

      if (!cropData[cropName]) {
        cropData[cropName] = {
          totalYield: 0,
          totalArea: 0,
          yieldCount: 0,
          areaCount: 0,
        };
      }

      if (!isNaN(yieldValue)) {
        cropData[cropName].totalYield += yieldValue;
        cropData[cropName].yieldCount += 1;
      }

      if (!isNaN(areaValue)) {
        cropData[cropName].totalArea += areaValue;
        cropData[cropName].areaCount += 1;
      }
    });

    let averagesData = [];
    for (let crop in cropData) {
      averagesData.push({
        cropName: crop,
        averageYield: (
          cropData[crop].totalYield / cropData[crop].yieldCount
        ).toFixed(3),
        averageArea: (
          cropData[crop].totalArea / cropData[crop].areaCount
        ).toFixed(3),
      });
    }

    return averagesData;
  };

  const averagesData = calculateAverages(Data);

  const rows = averagesData.map((data, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{data.cropName}</Table.Td>
      <Table.Td>{data.averageYield}</Table.Td>
      <Table.Td>{data.averageArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1>Table Two</h1>

      <Table style={{ width: "50%", margin: "auto", textAlign: "center" }}>
        <Table.Thead>
          <Table.Tr style={{ textAlign: "center" }}>
            <Table.Th>S.No.</Table.Th>
            <Table.Th>Crop Name</Table.Th>
            <Table.Th>Average Yield (Kg/Ha)</Table.Th>
            <Table.Th>Average Cultivation Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default TableOne;
