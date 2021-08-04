import numbro from "numbro";
import { LoadingDot } from "./LoadingDot";

export interface WidgetProps {
  title: string;
  content?: number | string;
}

export function Widget(props: WidgetProps) {
  let { title, content } = props;

  if (typeof content === "number") {
    content = numbro(content).format({ thousandSeparated: true });
  }

  return (
    <div className="widget flex flex-col items-center w-full border-2 p-5 shadow-lg transform rounded-lg duration-150 bg-gray-800 border-gray-400 hover:scale-105 transition">
      <h3 className="text-xl text-gray-300 border-b border-gray-600 py-2 px-10">
        {title}
      </h3>
      <div className="p-5 text-2xl text-gray-300">
        {content ? content : <LoadingDot />}
      </div>
    </div>
  );
}
