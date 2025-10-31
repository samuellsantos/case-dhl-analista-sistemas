import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardComponentProps = {
  titulo: string;
  valor: number;
}

export default function CardComponent({titulo, valor}: CardComponentProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{valor}</p>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}
