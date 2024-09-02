import cn from "@/utils/cn";
import Button from "./ui/button";

const Header = ({
  title,
  btn,
  className,
  btnType,
  onBtnClick,
  ...props
}: {
  title: string;
  btn: string;
  className?: string;
  btnType?: "outline";
  onBtnClick?: () => void;
}) => {
  return (
    <header
      {...props}
      className={cn(
        "flex w-full items-center justify-between bg-[#212121] px-2 py-2 text-white shadow",
        className,
      )}
    >
      <h1 className="text-[18px] font-medium">{title}</h1>
      <Button onBtnClick={onBtnClick} type={btnType}>
        {btn}
      </Button>
    </header>
  );
};

export default Header;
