import { Widget, WidgetProps } from "./Widget";

export interface WidgetsContainerProps {
  title: string;
  widgets: WidgetProps[];
  cols?: number;
  gap?: number;
}

export function WidgetsContainer(props: WidgetsContainerProps) {
  const { title, widgets, cols, gap } = props;

  return (
    <div
      className={`
      widgets-container 
      grid 
      grid-cols-${cols || 3} 
      gap-${gap || 4}
      my-10
    `}
    >
      <h1 className={`col-span-${cols || 3} text-3xl text-white px-3`}> {title} </h1>

      {widgets.map((widget, i) => (
        <Widget title={widget.title} content={widget.content} key={`widget-${i}`}/>
      ))}
    </div>
  );
}
