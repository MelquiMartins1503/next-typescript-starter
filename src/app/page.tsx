import type { NextPage } from "next";
import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";

const Page: NextPage = () => {
  return (
    <Box>
      <Typography as="h1" weight="medium">
        Olá, Mundo!
      </Typography>
    </Box>
  );
};

export default Page;
