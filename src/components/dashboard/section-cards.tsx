import { IoIosTrendingDown,IoIosTrendingUp } from "react-icons/io";

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardData {
  title:string;
  description:string;
  count:number;
  trend:"up"| "down";
  footer:string;
}

const cardsData:CardData[] = [
  {
    title: "Stock Bajo",
    description:"Cantidad de items",
    count:21,
    trend:"down",
    footer:"Por favor revise el inventario"
  },
  {
    title: "Proximos a expirar",
    description:"Cantidad de items",
    count:5,
    trend:"up",
    footer:"Por revise sus fechas de vencimiento"
  },
  {
    title: "Sin actualizar",
    description:"Cantidad de items",
    count:8,
    trend:"up",
    footer:"Productos que llevan tiempo sin modificarse"
  },
]

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsData.map((card, index) => (
        <Card className="@container/card" key={index}>
        <CardHeader>
          <CardDescription>{card.description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {card.title}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {card.trend === 'up' ? <IoIosTrendingUp /> : <IoIosTrendingDown/>}
              {card.count}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ver lista
          </div>
          <div className="text-muted-foreground">
            {card.footer}
          </div>
        </CardFooter>
      </Card>
      ))}
    </div>
  )
}
