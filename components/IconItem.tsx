import { ReactNode } from "react";

type IconItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function IconItem(props: IconItemProps) {
  return (
    <div className="flex gap-4 items-center">
      <span className="text-5xl">{props.icon}</span>
      <div>
        <p>{props.title}</p>
        <p className="font-light text-sm">{props.description}</p>
      </div>
    </div>
  );
}
