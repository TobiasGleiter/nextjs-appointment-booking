interface MainHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export async function DashboardHeader({
  heading,
  text,
  children,
}: MainHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading font-bold text-xl md:text-2xl">
          {heading}
        </h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
