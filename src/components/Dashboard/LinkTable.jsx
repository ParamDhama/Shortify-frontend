/* eslint-disable react/prop-types */
import LinkItem from "./LinkItem";

function LinkTable({links,handleDelete}) {
  return (
    <div className="grid grid-cols-1 gap-5 p-3">
      {links.map((link)=> (
        <LinkItem key={link._id} link={link} handleDelete={handleDelete}/>
      ))}
    </div>
  );
}

export default LinkTable;
