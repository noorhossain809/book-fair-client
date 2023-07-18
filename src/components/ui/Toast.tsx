interface IProps {
  message: string;
}

const ToastContent = ({ message }: IProps) => {
  return (
    <div className="d-flex gap-2">
      <div className="me-1 mt-3">
        {/* <Avatar size='sm' color='success' icon={<Coffee size={12} />} /> */}
        {/* <FaCheckCircle size={24} className="text-success" /> */}
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          {/* <FiX size={12} className="cursor-pointer" onClick={() => toast.dismiss()} /> */}
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastContent;
