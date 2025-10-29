export type ErrorPropsType = {
  className?: string;
  text?: string;
  title?: string;
};

export type ErrorType = {
  error?: Error & { digest?: string };
  reset: () => void;
};
