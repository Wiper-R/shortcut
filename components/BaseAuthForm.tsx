type FormProps = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};


const BaseAuthForm = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      className="flex flex-col p-4 box-border gap-y-5 my-8 md:my-14 md:max-w-xl mx-auto md:p-8 md:bg-white md:rounded-xl md:shadow-md w-full"
      onSubmit={onSubmit}
      children={children}
    />
  );
};

export default BaseAuthForm;
