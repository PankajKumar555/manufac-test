import { Table } from "@mantine/core";
import { Data } from "../dummy-data/Data";

function TableOne() {
  const createYearsRange = () => {
    let years = [];
    for (let year = 1950; year <= 2020; year++) {
      years.push(`Financial Year (Apr - Mar), ${year}`);
    }
    return years;
  };

  const processData = (data, yearsRange) => {
    let processedData = [];

    yearsRange.forEach((year) => {
      const dataForYear = data.filter((entry) => entry.Year === year);

      if (dataForYear.length > 0) {
        let maxProductionEntry = dataForYear[0];
        let minProductionEntry = dataForYear[0];

        dataForYear.forEach((entry) => {
          const production = parseFloat(
            entry["Crop Production (UOM:t(Tonnes))"]
          );
          if (
            production >
            parseFloat(maxProductionEntry["Crop Production (UOM:t(Tonnes))"])
          ) {
            maxProductionEntry = entry;
          }
          if (
            production <
            parseFloat(minProductionEntry["Crop Production (UOM:t(Tonnes))"])
          ) {
            minProductionEntry = entry;
          }
        });

        processedData.push({
          Year: year,
          maxCrop: maxProductionEntry["Crop Name"],
          maxProduction: maxProductionEntry["Crop Production (UOM:t(Tonnes))"],
          minCrop: minProductionEntry["Crop Name"],
          minProduction: minProductionEntry["Crop Production (UOM:t(Tonnes))"],
        });
      } else {
        processedData.push({
          Year: year,
          maxCrop: "",
          maxProduction: "",
          minCrop: "",
          minProduction: "",
        });
      }
    });

    return processedData;
  };

  const yearsRange = createYearsRange();
  const processedData = processData(Data, yearsRange);

  const rows = processedData.map((data, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{data.Year}</Table.Td>
      <Table.Td>{data.maxProduction}</Table.Td>
      <Table.Td>{data.minProduction}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1>Table One</h1>
      <Table style={{ width: "50%", margin: "auto", textAlign: "center" }}>
        <Table.Thead>
          <Table.Tr style={{ textAlign: "center" }}>
            <Table.Th>S.No.</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with maximum production in that year</Table.Th>
            <Table.Th>Crop with minimum production in that year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default TableOne;
