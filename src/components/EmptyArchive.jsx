import React from 'react'
import { Link } from 'react-router-dom';

function EmptyArchive() {
  return (
    <div className="flex flex-col flex-center py-small">
      <img
        className="empty_image"
        src="/assets/empty-rafiki-min.png"
        alt="EMPTY ARCHIVE"
      />
      <div className="h5 color_grey_200 text_center">
        There is nothing in your Archive.Let's add some notes from Home
      </div>
      <Link to="/home">
        <button className="btn btn_primary_outline">
          GO TO HOME
        </button>
      </Link>
    </div>
  );
}

export default EmptyArchive