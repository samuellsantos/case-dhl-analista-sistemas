import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardComponent() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Caminhões no Patio</CardTitle>
        <CardDescription>Atualmente</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">450</p>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}
