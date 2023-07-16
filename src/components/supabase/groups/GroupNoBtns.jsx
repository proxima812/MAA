import "../../../css/content.css";

function GroupNoBtns(props) {
 const group = props.group;

 const originalDateTime = group.created_at;
 const dateObj = new Date(originalDateTime);
 const russianFormat = dateObj.toLocaleString("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 });

 return (
  <>
   <div className="rounded-lg mb-5 flex p-5 flex-col gap-3 bg-[#f9f9f9]">
    <div className="bg-purple-100 rounded-t-lg -m-5 py-3 px-5 flex justify-between text-sm text-purple-600">
     <span>Дата открытия</span>
     <span className="font-medium">{russianFormat}</span>
    </div>
    <h2 className="font-bold text-2xl md:text-3xl py-4">{group.name}</h2>
    <div className="content">
     <p
      className="text-slate-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: group.description }}
     ></p>
    </div>
   </div>
  </>
 );
}

export default GroupNoBtns;
