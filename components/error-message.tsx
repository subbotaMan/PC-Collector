type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return <p className="text-red-500 text-xs mt-1.5 font-medium">{message}</p>;
};
