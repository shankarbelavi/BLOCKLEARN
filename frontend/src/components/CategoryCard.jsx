import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ icon: Icon, title, count }) => {
  return (
    <Card className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,221,255,0.2)]">
      <CardContent className="p-6 text-center">
        <div className="mb-4 inline-flex p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
          <Icon className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-lg font-semibold mb-1 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{count}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
