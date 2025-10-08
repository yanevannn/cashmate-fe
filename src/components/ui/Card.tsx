const Card: React.FC<{
  title: string;
  value: string;
  footer?: string;
}> = ({ title, value, footer }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-blue-600">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        {footer && <p className="text-xs text-gray-500 mt-2">{footer}</p>}
      </div>
    </>
  );
};

export default Card;