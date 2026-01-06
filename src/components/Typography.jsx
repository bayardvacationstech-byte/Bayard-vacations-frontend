import { cn } from "@/lib/utils";

export const H1 = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "text-4xl c-lg:text-5xl font-bold font-sans c-lg:leading-[52px]",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ className, children }) => {
  return (
    <h2
      className={cn(
        "text-3xl c-lg:text-4xl font-bold font-sans c-lg:leading-[52px]",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ className, children }) => {
  return (
    <h3
      className={cn(
        "text-xl c-lg:text-3xl font-bold font-sans c-lg:leading-8",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-xl c-lg:text-2xl font-bold font-sans c-lg:leading-8",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const H5 = ({ className, children }) => {
  return (
    <h5
      className={cn(
        "text-lg c-lg:text-xl font-bold font-sans c-lg:leading-8",
        className
      )}
    >
      {children}
    </h5>
  );
};

export const H6 = ({ className, children }) => {
  return (
    <h6
      className={cn(
        "text-base c-lg:text-lg font-bold font-sans c-lg:leading-8",
        className
      )}
    >
      {children}
    </h6>
  );
};
