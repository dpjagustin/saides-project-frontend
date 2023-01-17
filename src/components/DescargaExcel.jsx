import { Link, Button } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function DescargaExcel({ ubicacion }) {
  console.log(ubicacion);
  return (
    <Link href={ubicacion} download w="100%" my="1%">
      {" "}
      <Button colorScheme="blue" 
      size="lg"
      w="100%" >
        Descargar Excel
      </Button>{" "}
    </Link>
  );
}
