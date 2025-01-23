import PriorityIndicator from '../PriorityIndicator/PriorityIndicator';
import { analyzePriority } from '../../utils/sentimentAnalyzer';

import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  const priority = analyzePriority(content, tags); // Updated to include tags

  return (
    <div className="border rounded p-4 bg-opacity-7 bg-[#121212] hover:shadow-xl transition-all ease-in-out text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h6 className="text-sm font-medium">{title}</h6>
            <PriorityIndicator priority={priority} /> {/* Display Priority */}
          </div>
          <span className="text-xs text-slate-400">
            {date ? moment(date).format('Do MMM YYYY') : '-'}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-500'}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-400 mt-2">
        {content?.slice(0, 60)} {/* Display trimmed content */}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item, index) => (
            <span key={index}>#{item} </span> /* Render each tag */
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-green-500" onClick={onEdit} />
          <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
