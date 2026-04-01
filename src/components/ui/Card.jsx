export default function Card({ title, value }) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-xl font-bold">${value}</h2>
    </div>
  );
}